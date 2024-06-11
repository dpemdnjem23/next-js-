import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import PaymentSystem from "./component/paymentSystem";

export default function Checkout() {
  const queryClient = useQueryClient();
  const point = useSelector((state) => state.order.point);

  const isIntersecting = useSelector((state) => state?.home.isIntersection);
  const cartItems = queryClient.getQueryData(["order"]);

  return (
    <div
      className={` w-[260px] float-right
    
      ${isIntersecting ? "fixed" : ""}
    left-[990px] top-[151px]
     bg-[#fff]`}
    >
      <div className="p-[19px] border-[1px] border-[#e9e9e9]">
        <ul>
          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className=" w-[calc(100%-114px)] text-[14px] text-left inline-block font-normal">
              총 상품 금액
            </strong>
            <p className="w-[114px] text-right font-normal text-[14px] inline-block">
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                {cartItems?.data[0]?.total_cost?.toLocaleString()}
              </em>
              원
            </p>
          </li>
          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className=" w-[calc(100%-114px)] text-[14px] text-left inline-block font-normal">
              배송비
            </strong>
            <p className="w-[114px] text-right font-normal text-[14px] inline-block">
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                + {0}
              </em>
              원
            </p>
          </li>

          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className=" w-[calc(100%-114px)] text-[14px] text-left inline-block font-normal">
              할인 쿠폰
            </strong>
            <p className="w-[114px] text-right font-normal text-[14px] inline-block">
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                - {0}
              </em>
              원
            </p>
          </li>
          <li className="mb-[9px] text-[#333] overflow-hidden flex justify-between items-center flex-wrap">
            <strong className=" w-[calc(100%-114px)] text-[14px] text-left inline-block font-normal">
              W POINT
            </strong>
            <p className="w-[114px] text-right font-normal text-[14px] inline-block">
              <em className=" not-italic mr-[2px] text-[18px] font-sans">
                - {point}
              </em>
              원
            </p>
          </li>

          <li
            className=" mt-[20px] pt-[20px] border-[#d9d9d9]  border-t-[1px]
          mb-[9px] text-[#333] 
          overflow-hidden flex justify-between items-center flex-wrap
          "
          >
            <strong className=" font-normal text-[#fa5500] text-[14px] w-[calc(100%-114px)]  text-left inline-block">
              총 상품금액
            </strong>
            <p
              className=" 
            w-[114px] text-[#fa5500] 
            text-[14px] font-normal text-right inline-block"
            >
              <em className="  text-right not-italic font-medium text-[20px]">
                {(cartItems?.data[0]?.total_cost - point).toLocaleString()}
              </em>
              원
            </p>
          </li>
          <li
            className="after:clear-both after:block mt-[10px] text-[#666] overflow-visible flex
           justify-between items-center flex-wrap "
          >
            <strong className=" font-normal text-[12px] w-[calc(100%-114px)] text-left inline-block text-[#666]">
              적립예정 포인트
            </strong>
            <p
              className=" 
            w-[114px]
            text-[14px] font-normal text-right inline-block"
            >
              <em className="text-[14px] mr-[2px] font-normal text-right not-italic text-[#666]">
                {cartItems?.data[0]?.points.toLocaleString()}
              </em>
              p
            </p>
          </li>
        </ul>
      </div>

      <PaymentSystem></PaymentSystem>
    </div>
  );
}
