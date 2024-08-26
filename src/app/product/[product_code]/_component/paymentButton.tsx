"use client";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import giftImage from "../../../../../public/ico_prod_gift.svg";

import { useEffect, useState } from "react";
import { supabase } from "@/lib";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { setFavorites, setIsHeart } from "@/reducers/slices/UserSlice";
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

export default function PaymentButton() {
  const product = useSelector((state) => state?.product.product);
  const isHeart = useSelector((state) => state?.user.isHeart);
  const selectOption = useSelector((state) => state?.product.selectOption);
  //만약 personalHeart에 변화가 생겼다면

  const favorites = useSelector((state) => state?.user.favorites);

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const Router = useRouter();
  let totalCost: number = 0;

  const paymentProduct = async () => {
    //1. order에 넣을
    // id ,  item, address,name total_cost,points

    //2개의 옵션을 고르면 [{옵션1},{옵션2}] 이런식으로

    function generateRandomInteger() {
      const min = Math.pow(10, 13); // 10의 9제곱(10억)
      const max = Math.pow(10, 14) - 1; // 10의 10제곱 - 1 (9999999999)

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //boxObj에서 isChecked된 부분만 cartItems

    const randomInteger = generateRandomInteger();

    // const randomInteger = 1;
    // Router.push({
    //   pathname: `/Order/${randomInteger}`,
    //   query: { boxObj: JSON.stringify(boxObj) },
    // });

    //로그인이 돼있지 않으면 login으로
    Router.push(`/order/${randomInteger}`);
    dispatch(setPageRouterLoading(true));

    mutation2.mutate(randomInteger);
  };

  const fetch = async (random: number) => {
    const optionsArr = selectOption?.map((el) => {
      return el.name;
    });
    const quantityArr = selectOption?.map((el) => {
      return Number(el.quantity);
    });

    const select = [
      {
        options: optionsArr,
        quantity: quantityArr,
        product,
      },
    ];

    //optionsArr을 이용해서 product

    const check = select?.reduce(
      (
        acc: unknown,

        curr
      ) => [
        ...acc,
        ...curr?.options.map((option: string, index: number) => ({
          id: index,
          option,
          product_code: curr?.product?.product_code,
          brand: curr?.product?.brand,
          front_multiline: curr?.product?.front_multiline,
          thumbnail: curr?.product?.thumbnail,
          price: curr?.product?.price,
          discount: curr?.product?.discount,
          quantity: curr.quantity[index],
          isChecked: true,
        })),
      ],
      []
    );

    check?.forEach((item) => {
      if (item.isChecked) {
        // 이 부분에서 상품의 가격을 추가로 가져와서 총 비용을 계산할 수 있습니다.
        // 아래는 간단한 예시로 quantity만을 사용하여 총 비용을 계산합니다.
        totalCost +=
          item?.price * (1 - item?.discount / 100) * parseInt(item?.quantity);
      }
    });

    const response = await supabase.from("order").insert({
      id: random,
      name: "아무개",
      total_cost: totalCost,
      item: check,
      points: totalCost * 0.1,
    });

    return response;
  };

  const mutation2 = useMutation({
    mutationFn: fetch,

    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  return (
    <>
      <button
        onClick={paymentProduct}
        className="w-[100%] border-[1px] px-[20px]  h-[70px] font-sans font-medium leading-[68px] text-[20px] border-[#000]"
        type="button"
      >
        바로 구매
      </button>
    </>
  );
}
