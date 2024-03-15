"use client";

import { useState } from "react";
import btnDel from "../../../../../public/btn_del_12.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setCardInfoModal,
  setPointsInfoModal,
} from "@/reducers/slices/ProductSlice";

export default function PointsInfoModal() {
  //옵션 이 있을때 구매가 가능하도록한다.

  const dispatch = useDispatch();

  const handlePointsModalOUt = () => {
    dispatch(setPointsInfoModal(false));
  };

  return (
    <div
      onClick={handlePointsModalOUt}
      className="w-[100%] h-[100%] top-0 left-0  fixed flex z-[110] justify-center items-center bg-[rgba(0,0,0,0.4)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
      mt-[-110px] ml-[-200px]
      w-[520px] top-[50%] left-[50%] z-[110] min-w-[480px] bg-[#fff] overflow-hidden px-[40px] pt-[40px] pb-[50px] border-[1px] border-[#000] fixed"
      >
        <div className=" flex justify-between">
          <h2 className="text-[#333] font-sans text-[24px]">W 포인트 안내</h2>
          <button
            onClick={handlePointsModalOUt}
            className=" w-[54px]  h-[54px] mb-[30px] mt-[-10px] p-[15px] overflow-hidden "
            type="button"
          >
            <Image
              alt=""
              className="block text-center"
              width={24}
              height={24}
              src={btnDel}
            ></Image>
          </button>
        </div>
        <ul className="pt-[15px] border-t-[2px] border-[#000] ">
          <div
            style={{
              background: `url(	https://static.wconcept.co.kr/web/images/common/spr-common.png) -270px 0px no-repeat`,
            }}
            className="w-[15px] h-[3px] top-[138px] left-[40px] absolute"
          ></div>
          <li className="mt-0 pr-[25px] pl-[13px] text-[13px] leading-[1.5] bg-[transparent]">
            W point는 실 결제금액 ( 쿠폰, 포인트 할인 제외 )기준으로 1% 기본
            적립되며, 상품과 프로모션에 따라 적립율은 달라질 수 있습니다.
          </li>
          <div
            style={{
              background: `url(	https://static.wconcept.co.kr/web/images/common/spr-common.png) -270px 0px no-repeat`,
            }}
            className="w-[15px] h-[3px] top-[192px] left-[40px] absolute"
          ></div>

          <li className="pr-[25px] pl-[13px] text-[13px] mt-[14px] leading-[1.5]">
            배송완료일로부터 7일 경과 후 자동 적립됩니다.
            <br></br>( 전자상거래법 단순변심 반품가능일 7일 적용 )
          </li>
        </ul>
        <div className="mt-[30px] text-center">
          <button
            type="button"
            onClick={handlePointsModalOUt}
            className=" 
          bg-[#000] border-[#000] text-[#fff]
          my-[0] mx-[8px] h-[40px] text-[14px] leading-[38px]  min-w-[140px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
