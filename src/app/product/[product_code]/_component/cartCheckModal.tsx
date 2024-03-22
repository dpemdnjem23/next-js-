"use client";
import { setIsModal } from "@/reducers/slices/HomeSlice";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import btnClose from "../../../../../public/layer_close_23.png";
import btnDel from "../../../../../public/btn_del_12.svg";
import { getHistory } from "@/lib/historyLocalstorage";
import { setCartCheckModal } from "@/reducers/slices/ProductSlice";

import { useRouter } from "next/navigation";
export default function CartCheckModal() {
  const dispatch = useDispatch();
  const route = useRouter();

  // const closeModal = () => {
  //   dispatch(setIsModal(false));
  // };
  const closeModal = () => {
    dispatch(setCartCheckModal(false));
  };
  //쇼핑 계속하기

  //쇼핑백확인
  const cartRouter = () => {
    route.push("/cart");
    dispatch(setCartCheckModal(false));
  };

  return (
    <div
      onClick={closeModal}
      className="w-[100%] h-[100%] top-0 left-0  fixed flex z-[101] justify-center items-center bg-[rgba(0,0,0,0.4)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        mt-[-120px] ml-[-50px]

        fixed z-[110] min-w-[450px] overflow-hidden
      border-[1px] border-[#000] bg-[#fff] h-[280px] px-[40px] pt-[40px] pb-[50px]      "
      >
        <p className="pt-[48px] pb-[20px] font-sans text-[18px] leading-[1.4] text-center">
          선택하신 상품이
          <br></br>
          쇼핑백에 추가 되었습니다.
        </p>
        <div className="mt-[30px] text-center font-sans font">
          <button
            onClick={closeModal}
            className="min-w-[140px] h-[40px] text-[14px] leading-[38px] mx-[4px] border-[1px] font-medium border-[#7d7d7d] bg-[#7d7d7d] text-[#fff]"
          >
            쇼핑 계속하기
          </button>
          <button
            onClick={cartRouter}
            className="min-w-[140px] h-[40px] font-medium text-[14px] leading-[38px] mx-[4px] border-[#000] bg-[#000] text-[#fff]"
          >
            쇼핑백 확인
          </button>
        </div>

        <button
          onClick={closeModal}
          className=" w-[53px] absolute top-[25px] right-[25px]
           leading-[99em]  align-top h-[53px] mb-[30px] overflow-hidden "
          type="button"
        >
          <Image
            alt=""
            className="block text-center"
            width={23}
            height={23}
            src={btnClose}
          ></Image>
        </button>
      </div>
    </div>
  );
}
