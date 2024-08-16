"use client";

import { supabase } from "@/lib";
import * as PortOne from "@portone/browser-sdk/v2";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { zip } from "lodash";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const url = process.env.NEXT_PUBLIC_URL;
type Response = {
  code: string;
  message: string;
  paymentId: string;
  transactionType: string;
  txId: string;
};

export default function PaymentSystem() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const order = queryClient.getQueryData(["order"]);

  const params: Params = useParams();
  const storeId: string | undefined = process.env.NEXT_PUBLIC_ID;
  const cartItems = queryClient.getQueryData(["order"]);
  const point = useSelector((state) => state.order.point);
  const paymentId: string = `payment-${crypto.randomUUID()}`;

  const name = useSelector((state) => state.order.name);
  const phoneNumber = useSelector((state) => state.order.phoneNumber);
  const message = useSelector((state) => state.order.message);
  const address = useSelector((state) => state.order.address);
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")).user;

  const product = cartItems?.data[0]?.item[0];
  // console.log(JSON.parse(product));
  const part1Regex = /^010$/;
  const part2Regex = /^\d{4}$/;
  const part3Regex = /^\d{4}$/;
  const validatePhoneNumberParts = (
    part1: string,
    part2: string,
    part3: string
  ): boolean => {
    return (
      part1Regex.test(part1) && part2Regex.test(part2) && part3Regex.test(part3)
    );
  };
  //버튼을 클릭할때 유효성 검사가 필요하다.
  //이름을 입력, 휴대폰 입력 주소 입력, 메시지 입력

  const requestPayment = async () => {
    //가장 상단의 아이템의 이름을 쓰고 외 x로 표시하기

    if (name === "") {
      alert("이름을 입력해주세요");
      return;
    } else if (
      !validatePhoneNumberParts(
        phoneNumber.part1,
        phoneNumber.part2,
        phoneNumber.part3
      )
    ) {
      alert("핸드폰번호를 잘못 입력했습니다.");
      return;
    } else if (address.zipcode === "" && address.road === "") {
      alert("주소를 입력해주세요");
      return;
    } else if (message === "") {
      alert("전달할 메세지를 입력해주세요");
      return;
    } else if (!paymentMethod) {
      alert("결제수단을 선택해주세요");
      return;
    } else {
      window.IMP.request_pay(
        {
          pg: "kakaopay",
          merchant_uid: `${paymentId}`,
          name: `${JSON.parse(product).front_multiline}  ${
            cartItems?.data[0].item.length > 1
              ? `외 ${cartItems?.data[0].item.length - 1}`
              : ""
          }`,
          amount: Number(cartItems?.data[0]?.total_cost - point),
          buyer_email: "",
          buyer_name: name,
          buyer_tel: `${phoneNumber.part1}-${phoneNumber.part2}-${phoneNumber.part3}`,
          buyer_addr: `${address.road}`,
          buyer_postcode: `${address.zip}`,
        },
        async (rsp) => {
          if (!rsp.success) {
            console.log(rsp);
            await requestCancel(rsp.imp_uid);
            throw Error("결제 실패");
          } // 결제 성공 시 로직

          const notified = await axios.post(
            `http://localhost:3000/api/payment/complete`,
            {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              params: params.order_code,
              point: point,
            },
            {
              headers: { "Content-Type": "application/json" },
              // imp_uid와 merchant_uid, 주문 정보를 서버에 전달합니다
            }
            // 주문 정보...
          );
          //결제가 잘못됐을시 취소

          if (notified.data.error) {
            await requestCancel(rsp.imp_uid);

            throw Error("결제 시도중 에러 발생");
          }
          //결제완료후 결제정보 저장,

          const { data, error } = await supabase.from("payment").insert({
            order_id: generateOrderNumber(),
            address: `${rsp.buyer_addr}`,
            payment_id: rsp.merchant_uid,
            name: rsp.name,
            message,
            amount: rsp.amount,
            phone: `${rsp.buyer_tel}`,
            user_id: userInfo.id,
            zipcode: `${rsp.buyer_postcode}`,
            items: order?.data[0]?.item,
            progress: "결제완료",
          });
          console.log(data);

          if (error) {
            await requestCancel(rsp.imp_uid);

            throw Error("결제생성이 완료되지 않았습니다.");
          }

          //결제가완료되면 메인으로 이동하고 order를 삭제한다.
          //item을 담아야된다.

          const { data: dleData, error: delError } = await supabase
            .from("payment")
            .delete()
            .eq("id", params.order_code);

          if (delError) {
            await requestCancel(rsp.imp_uid);
            throw Error("생성 에러");
          }

          router.push("/");
        }
      );

      //결제에 성공하는경우
    }
  };

  useEffect(() => {
    // 외부 스크립트 로드 함수
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };

    // 스크립트 로드 후 실행
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        // 가맹점 식별코드
        IMP.init(process.env.NEXT_PUBLIC_IMP);
      });
    });

    // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const requestCancel = async (imp_uid: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/cancel",
        {
          imp_uid: imp_uid,
        }
      );

      const result = response.data;

      if (result.success) {
        alert("Payment cancelled successfully");
      } else {
        alert("Failed to cancel payment: " + result.message);
      }
      window.IMP.close();
    } catch (error) {
      window.IMP.close();

      alert("An error occurred while cancelling payment");
    }
  };

  const generateOrderNumber = () => {
    // 영문자 (A-Z, a-z)와 숫자 (0-9)로 구성된 문자열 생성
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let orderNumber = "";

    // 첫 번째 문자는 영문자로 시작하도록 설정
    const firstCharIndex = Math.floor(Math.random() * 52); // A-Z (26) + a-z (26) = 52
    orderNumber += characters.charAt(firstCharIndex);

    // 숫자 7자리 추가
    for (let i = 0; i < 7; i++) {
      const numIndex = Math.floor(Math.random() * 10); // 0-9
      orderNumber += characters.charAt(26 + 26 + numIndex); // 숫자는 characters 배열의 52번째 이후부터 시작
    }

    return orderNumber;
  };
  return (
    <button
      onClick={requestPayment}
      className=" w-[300px] h-[70px] bg-[#000] font-normal text-[16px] leading-[70px] text-[#fff] mt-[20px]"
      type="button"
    >
      <div>결제버튼</div>
    </button>
  );
}
