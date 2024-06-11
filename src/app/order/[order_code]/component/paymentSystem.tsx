"use client";

import { supabase } from "@/lib";
import * as PortOne from "@portone/browser-sdk/v2";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { zip } from "lodash";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter, useParams } from "next/navigation";
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
  const queryClient = useQueryClient();

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
      console.log(phoneNumber.part1, phoneNumber.part2, phoneNumber.part3);
      alert("핸드폰번호를 잘못 입력했습니다.");
      return;
    } else if (address.zipcode === "" && address.road === "") {
      alert("주소를 입력해주세요");
      return;
    } else if (message === "") {
      alert("전달할 메세지를 입력해주세요");
      return;
    } else if (!paymentMethod) {
      console.log(paymentMethod);
      alert("결제수단을 선택해주세요");
      return;
    } else {
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: storeId,
        // 채널 키 설정
        channelKey: process.env.NEXT_PUBLIC_CHANNEL,
        paymentId,
        orderName: `${JSON.parse(product).front_multiline} 외 ${
          cartItems?.data[0].item.length > 1
            ? cartItems?.data[0].item.length - 1
            : ""
        }`,
        totalAmount: Number(cartItems?.data[0]?.total_cost - point),
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      //코드가 존재하지않으면 에러

      if (response?.code) {
        return alert(response?.message);
      }

      //결제에 성공하는경우

      try {
        const getPaymentData = await axios.get(
          `https://api.portone.io/payments/${paymentId}`,
          {
            headers: {
              Authorization: `PortOne ${process.env.NEXT_PUBLIC_SECRET}`,
            },
          }
        );

        const paymentData = getPaymentData.data;

        if (!paymentData) {
          throw new Error("결제정보를 불러오지 못했습니다.");
        }

        //저장된 데이터와,  클라이언트에서 넘어온 데이터랑 비교한다. 우벼

        //결제검증하기

        // DB에서 결제되어야 하는 금액 조회

        // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.

        //client에서 온 amount
        const { amount, status, customer } = paymentData;

        const { data: orderData, error: orderError } = await supabase
          .from("order")
          .select()
          .eq("id", params.order_code);

        if (orderError) {
          throw new Error("일치하는 order가 없다.");
        }

        const total = orderData[0].total_cost - point;

        console.log(orderData, amount);
        //저장해둔 order db의 가격정보와 일치하는지 확인
        //가격의 변동 (할인, 포인트 등으로 인한 변화 고려 할인은 일단제외, 포인트변화만 고려)
        if (total === amount.total) {
          switch (status) {
            case "VIRTUAL_ACCOUNT_ISSUED": {
              // 가상 계좌가 발급된 상태입니다.
              // 계좌 정보를 이용해 원하는 로직을 구성하세요.
              break;
            }
            case "PAID": {
              const insertPayment = await supabase.from("payment").insert({
                paymentId: customer.id,
                amount: amount.total,
                name: name,
                orderId:params.order_code,
                message: message,
                phone: `${phoneNumber.part1}-${phoneNumber.part2}-${phoneNumber.part3}`,
                zipcode: address.zip,
                address: `${address.road}, ${address.addressLine}`,
              });

              if (!insertPayment) {
                throw new Error("결제정보가 생성되지 않았습니다.");
              }
              console.log(insertPayment);

              alert("결제가 완료되었습니다.");

              // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
              //결제 정보를 db에 저장한다.
              break;
            }
          }
        } else {
          const cancel = await axios.post(
            `https://api.portone.io/payments/${paymentId}/cancel`,
            {
              storeId,
              amount: Number(cartItems?.data[0]?.total_cost - point),
              reason: "결제금액 불일치",
            },
            {
              headers: {
                Authorization: `PortOne ${process.env.NEXT_PUBLIC_SECRET}`,
              },
            }
          );

          console.log(cancel);

          throw new Error("결제금액 불일치 정상적이지 않은 결제시도");

          // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
        }
      } catch (e: any) {
        // 결제 검증에 실패했습니다.

        console.log(paymentId, storeId);
        const cancel = await axios.post(
          `https://api.portone.io/payments/${paymentId}/cancel`,
          {
            storeId,
            amount: Number(cartItems?.data[0]?.total_cost - point),
            reason: "결제시도중에 에러발생",
          },
          {
            headers: {
              Authorization: `PortOne ${process.env.NEXT_PUBLIC_SECRET}`,
            },
          }
        );

        console.log(cancel);

        throw new Error(e);
      }
    }
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
