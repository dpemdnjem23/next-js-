"use client";
import useIntersectionObserver from "@/lib/useIntersectionObserver";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { setPageRouterLoading } from "@/reducers/slices/CartSlice";
import { supabase } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/router";

export default function CartPayment({
  absoluteIntersecting,
  isIntersecting,
  targetRef2,
}) {
  const Router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  //cartItema
  //boxObj를 이용하여 가격
  let totalCost: number = 0;
  let shippingCost: number = 0;
  const [newLeft, setNewLeft] = useState<string>("940px");
  const [newTop, setNewTop] = useState<string>("151px");
  // const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const boxObj = useSelector((state) => state?.cart?.boxObj); // const groupedItems: {} = {};

  boxObj?.forEach((item) => {
    if (item.option !== "end" && item.isChecked) {
      // 이 부분에서 상품의 가격을 추가로 가져와서 총 비용을 계산할 수 있습니다.
      // 아래는 간단한 예시로 quantity만을 사용하여 총 비용을 계산합니다.
      totalCost +=
        item?.price * (1 - item?.discount / 100) * parseInt(item?.quantity);
    }
  });

  const cartItems = boxObj?.filter((item) => {
    return item.option !== "end" && item.isChecked === true;
  });

  console.log(cartItems);

  // const targetRef2 = useRef();

  // const s = useIntersectionObserver(targetRef, options2);

  useEffect(() => {
    const adjustElementPosition = () => {
      // console.log(targetRef.current.innerWidth);
      const pageWidth = window.innerWidth;
      const fixedPosition = 940;

      if (pageWidth > 1255) {
        const newLeft = fixedPosition + (pageWidth - 1255) * 0.5;
        setNewLeft(`${newLeft}px`);
        setNewTop("192px");
      } else {
        setNewLeft(`940px`);
        setNewTop("192px");
      }
      //만약 페이지가 더작은경우 left를 고정
    };

    adjustElementPosition();

    if (absoluteIntersecting) {
      setNewLeft("auto");
      setNewTop("auto");
    }

    window.addEventListener("resize", adjustElementPosition);
    dispatch(setPageRouterLoading(false));

    return () => {
      window.removeEventListener("resize", adjustElementPosition);
    };
  }, [absoluteIntersecting]);

  // useEffect(() => {

  // }, [);

  //style에 넣고
  // const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];

  const fetchData = async (random: number) => {
    const response = await supabase.from("order").insert({
      id: random,
      name: "아무개",
      total_cost: Math.round(totalCost),
      item: cartItems,
      points: Math.round(totalCost * 0.1),
    });

    return response;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: fetchData,

    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  function generateRandomInteger() {
    const min = Math.pow(10, 13); // 10의 9제곱(10억)
    const max = Math.pow(10, 14) - 1; // 10의 10제곱 - 1 (9999999999)

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //boxObj에서 isChecked된 부분만 cartItems

  const RouteOrderPage = async () => {
    const randomInteger = generateRandomInteger();

    // const randomInteger = 1;
    // Router.push({
    //   pathname: `/Order/${randomInteger}`,
    //   query: { boxObj: JSON.stringify(boxObj) },
    // });

    mutation.mutate(randomInteger);

    Router.push(`/order/${randomInteger}`);
    dispatch(setPageRouterLoading(true));
  };

  //isIntersecting - 정해져있음
  //absolute true- auto

  // ,

  return (
    <div
      id="fixedElement"
      style={{ left: `${newLeft}`, top: `${newTop}` }}
      className={`float-right w-[300px] mt-[50px]
      ${
        absoluteIntersecting
          ? "top-auto left-auto bottom-0 right-0 mt-0 absolute"
          : ""
      }
      ${isIntersecting ? `fixed !mt-[0px] bg-[#fff]` : ""}      
        `}
    >
      <div className="p-[19px] border-[1px] border-[#e9e9e9]">
        <ul>
          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className="w-[calc(100%-114px)] font-normal text-[14px] text-left inline-block">
              총 상품 금액
            </strong>
            <p className="w-[114px] text-right text-[14px]">
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                {totalCost?.toLocaleString()}
              </em>
              원
            </p>
          </li>
          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className="w-[calc(100%-114px)] font-normal text-[14px] text-left inline-block">
              배송비
            </strong>
            <p className="w-[114px] text-right text-[14px]">
              <span className="text-[#000] text-[12px] align-[2px]">+</span>
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                {shippingCost?.toLocaleString()}
              </em>
              원
            </p>
          </li>
          <li className=" mt-[20px] font-light pt-[20px] border-[#d9d9d9] border-t-[1px] w-[100%] text-[#333] overflow-hidden flex justify-between items-center flex-wrap ">
            <strong className="text-[#fa5500] w-[calc(100%-114px)] text-[14px] text-left inline-block ">
              총 결제 금액
            </strong>
            <p className="w-[114px] text-right text-[14px] text-[#fa5500]">
              <em className="not-italic mr-[2px] text-[20px] font-sans font-medium">
                {(shippingCost + totalCost)?.toLocaleString()}
              </em>
              원
            </p>
          </li>
          <li className=" mt-[10px] font-light w-[100%] text-[#666] overflow-visible flex justify-between items-center flex-wrap ">
            <strong className="text-[12px] w-[calc(100%-114px)] text-left inline-block">
              적립예정 포인트
            </strong>
            <p className="text-[14px] w-[114px] font-light text-right">
              <em className=" not-italic  text-[12px]">
                {(totalCost * 0.1).toLocaleString()}
              </em>
              p
            </p>
          </li>
        </ul>
        {/* <Link href={"/Order/1"}> */}
        <button
          type="button"
          onClick={RouteOrderPage}
          className="h-[60px] bg-[#000] text-[16px] 
 text-[#fff] mt-[20px] w-[100%]
        font-sans leading-[60px] font-normal"
        >
          선택상품 주문하기
        </button>
        {/* </Link> */}

        <button
          type="button"
          className="w-[100%] h-[44px] leading-[42px] text-[#000] bg-[#fff] border-[1px] border-[#000] mt-[10px]"
        >
          선물하기
        </button>
      </div>
    </div>
  );
}
