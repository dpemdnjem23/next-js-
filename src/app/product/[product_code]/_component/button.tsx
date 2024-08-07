"use client";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import giftImage from "../../../../../public/ico_prod_gift.svg";
import heartOffImage from "../../../../../public/ico_prod_heart_off.svg";
import heartOnImage from "../../../../../public/ico_prod_heart_on.svg";
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

interface props {
  id: number;
  product_id: number;
  user_id: number;
}
export default function ButtonBox() {
  const name = "cartId";
  //옵션 이 있을때 구매가 가능하도록한다.
  const product = useSelector((state) => state?.product.product);
  const isHeart = useSelector((state) => state?.user.isHeart);
  const selectOption = useSelector((state) => state?.product.selectOption);
  //만약 personalHeart에 변화가 생겼다면

  const favorites = useSelector((state) => state?.user.favorites);

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const queryClient = useQueryClient();

  //

  const fetchData = async () => {
    let cartId = await cookieGet("cartId");

    const optionsArr = selectOption?.map((el) => {
      return el.name;
    });
    const quantityArr = selectOption?.map((el) => {
      return Number(el.quantity);
    });
    //해당하는 cart_id를 찾아서 넣기

    // const select = {
    //   user_id: userInfo?.user?.id || null,

    // };
    optionsArr.push("end");
    //option이 여러개
    // const response = await supabase.from("cart").update(select);

    const select = {
      user_id: userInfo?.user?.id || null,
      options: optionsArr,
      quantity: quantityArr,
      cart_id: cartId,

      product_id: product.id,
    };

    // //option이 여러개
    const response = await supabase.from("cart").insert(select);

    return response;
  };

  const mutation = useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const addToCart = async () => {
    //cart에 추가할때 cookie를 추가한다.

    let cartId = await cookieGet("cartId");
    // let cart;

    //cartId가 없는경우
    if (!cartId) {
      await cookieCreate("cartId");
      // mutation.mutate();
    }

    mutation.mutate();
  };

  const dispatch = useDispatch();
  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

  //heart를 클릭할시 하트색깔을 바꾼다.
  //hear user_id에 값을 넣고 다시클릭하면 줄어들도록
  //heart클릭시 로그인이 되지 않았다면

  const handleClickHeart = async () => {
    //로그인 되어있는 경우
    try {
      //db에 추가 db에 추가된경우 db에서 삭제
      if (userLogin.login) {
        //db에 추가하려면, 없어야한다. 있는경우 삭제한다.

        const { data, error } = await supabase
          .from("favorite")
          .select()
          .eq("user_id", userInfo.user.id)
          .eq("product_id", product?.id);

        if (error) {
          throw error;
        }
        //data가 존재한다. 확인이 된경우 삭제한다.
        if (data[0]) {
          const del = await supabase
            .from("favorite")
            .delete()
            .eq("user_id", userInfo.user.id)
            .eq("product_id", product?.id);

          if (error) {
            throw error;
          }

          // setPrevHeart(!prevHeart);
        } else if (!data[0]) {
          //data가 없는경우

          const add = await supabase
            .from("favorite")
            .insert([{ user_id: userInfo.user.id, product_id: product?.id }]);
          if (add.error) {
            throw add.error;
          }

          const response: any = await supabase
            .from("favorite")
            .select()
            .eq("user_id", userInfo.user.id)
            .eq("product_id", product?.id);

          if (response.error) {
            throw response.error;
          }
          //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
          //추가가됏다는건 가장 마지막 배열이라는것

          // setPrevHeart(response.data[0]);
          dispatch(setFavorites(response.data));
          // setPrevHeart(!prevHeart);
        }

        //heart체크가

        //db에 추가되면 4개로 되고 해당되는 user_id가 존재할때
      }

      //
      else {
        const userConfirmed = window.confirm("로그인 후 이용해주세요");

        if (userConfirmed) {
          window.location.href = "/Member/login"; // 이동하고자 하는 URL로 변경
          return;
        }
      }
    } catch (err) {
      throw err;
    }
  };
  // const query = useQuery({queryKey:['cart']})

  const openCartCheckModal = () => {
    // console.log("dllddlltlfgod");

    //옵션이 1개 이상일때부터 시작
    //옵션에 해당하는 product를 넣는다.
    //
    if (selectOption.length >= 1) {
      addToCart();

      dispatch(setCartCheckModal(true));
    } else if (selectOption.length < 1) {
      //옵션이 0개인경우
      alert("옵션을 선택해주세요");
    }
  };

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

  const fetchData2 = async (random: number) => {
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
    mutationFn: fetchData2,

    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  //버튼을 클릭하면 옵션창이 활성화돼있는지 확인

  //옵션이 활성화

  // console.log(isHeart, heart, "heat");

  return (
    <ul className="flex w-[660px] justify-between items-center py-[30px]">
      <li className="min-w-[250px] flex ml-[10px] relative flex-1">
        <button
          onClick={paymentProduct}
          className="w-[100%] border-[1px] px-[20px]  h-[70px] font-sans font-medium leading-[68px] text-[20px] border-[#000]"
          type="button"
        >
          바로 구매
        </button>
      </li>
      <li className="flex-1 min-w-[250px] ml-[10px] relative ">
        <button
          onClick={openCartCheckModal}
          type="button"
          className="w-[100%] h-[70px] font-sans font-medium leading-[68px] text-[20px] bg-[#000] text-[#fff] border-[#000]"
        >
          쇼핑백 담기
        </button>
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
        <button
          onClick={handleClickHeart}
          className=" border-[1px] border-[#ccc] text-center flex-col w-[70px] h-[70px] ml-[2px] flex items-center   justify-center"
          type="button"
        >
          {favorites.length === 1 ? (
            <Image width={34} height={34} alt="" src={heartOnImage}></Image>
          ) : (
            <Image width={34} height={34} alt="" src={heartOffImage}></Image>
          )}
          <p className=" font-semibold text-[13px] leading-[20px] pt-[-5px] text-[#7d7d7d]">
            {isHeart?.length}
          </p>
        </button>
      </li>
    </ul>
  );
}
