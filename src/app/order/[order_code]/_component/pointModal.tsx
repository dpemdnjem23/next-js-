'use client'
import { useState } from "react";

export default function PointModal() {
  


  return (
    <div
      style={{
        boxShadow: `3px 3px 0 rgba(0,0,0,.1)`,
      }}
      className="
      bg-[#fff] border-[#9d9d9d] rounded-[5px] border-[1px]
      pt-[18px] pr-[18px] pb-[15px] pl-[20px] shadow
      block absolute top-[-18px] left-[83px] z-[1] w-[585px] "
    >
      <div
        className="
              absolute
              top-[19px]
              left-[-9px]
              w-[9px]
              h-[12px]
              "
        style={{
          background: `url(https://i.ibb.co/f1RTfkh/spr-bag.png) -150px -50px no-repeat`,
        }}
      ></div>

      <p className=" text-[16px] font-normal">포인트 안내</p>
      <ul className="mt-[12px]">
        <li
          className=" before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          보유한 포인트는 1원 이상 결제 시 1P부터 사용 가능합니다.
        </li>
        <li
          className="
        before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          포인트 적립은 최종결제금액(쿠폰, 포인트 금액 제외) 기준으로 적립되며,
          상품에 따라 적립률이 상이할 수 있습니다.
        </li>
        <li
          className=" 
        before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          반품/취소로 인해 결제금액이 환불될 경우 지급된 포인트는 환수됩니다.
        </li>
        <li
          className=" 
        before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          부분취소/환불을 진행할 경우, 사용하신 포인트는 해당 상품에 적용된
          비율만큼 환불됩니다.
        </li>
        <li
          className=" 
        before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          포인트 유효기간은 1년이며, 기간이 경과된 포인트는 매월 말일 자정에
          자동 소멸됩니다.
        </li>

        <li
          className=" 
        before:absolute before:top-[5px] before:left-[0] before:w-[2px] before:h-[2px] before:bg-[#666]
        text-[12px] leading-[1.5] relative mt-[5px] pl-[11px] font-normal font-sans"
        >
          (미사용 포인트 기한연장 및 현금성 환불 불가)
        </li>
      </ul>
    </div>
  );
}
