"use client";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import giftImage from "../../../../../public/ico_prod_gift.svg";

import { useEffect, useState } from "react";
import { supabase } from "@/lib";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import {
  setFavorites,
  setIsHeart,
  setPersonalHeart,
} from "@/reducers/slices/UserSlice";
import { setCartCheckModal } from "@/reducers/slices/ProductSlice";
import {
  InfiniteData,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { cookieCreate, cookieGet } from "@/utils/cookieUtils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setPageRouterLoading } from "@/reducers/slices/CartSlice";
import HeartButton from "./HeartButton";
import CartButton from "./cartButton";
import PaymentButton from "./paymentButton";

interface props {
  id: number;
  product_id: number;
  user_id: number;
}
export default function ButtonBox() {
  //옵션 이 있을때 구매가 가능하도록한다.

  //버튼을 클릭하면 옵션창이 활성화돼있는지 확인

  //옵션이 활성화

  // console.log(isHeart, heart, "heat");

  return (
    <ul className="flex w-[660px] justify-between items-center py-[30px]">
      <li className="min-w-[250px] flex ml-[10px] relative flex-1">
        <PaymentButton></PaymentButton>
      </li>
      <li className="flex-1 min-w-[250px] ml-[10px] relative ">
        <CartButton></CartButton>
      </li>
      <li className=" min-w-[70px] w-[70px] ml-[10px] relative">
        <button
          className="bg-[#fa5500] text-center flex-col w-[70px] h-[70px] relative  flex items-center  justify-center"
          type="button"
        >
          <Image
            className="px-auto"
            width={34}
            height={34}
            alt=""
            src={giftImage}
          ></Image>
          <span className="text-[13px] text-[#fff] font-medium block ">
            선물하기
          </span>
        </button>
      </li>
      <li>
        <HeartButton></HeartButton>
      </li>
    </ul>
  );
}
