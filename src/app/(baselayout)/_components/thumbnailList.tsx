"use client";

import Image from "next/image";
import Slider from "./slider";
import Link from "next/link";
import Router from "next/router";

import { useEffect, useState } from "react";

import { onClickProduct } from "@/lib/historyLocalstorage";

import { useDispatch, useSelector } from "react-redux";

import { setFavorites } from "@/reducers/slices/UserSlice";

import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getProductsData } from "../_lib/getProductsData";
import { supabase } from "@/lib";
import { getHeartData } from "../_lib/getHeartData";
import { query } from "express";
// import { supabase, supabaseKey } from "@/lib";

export default function ThumbnailList({ title, link, categoryName }) {
  const { data: products } = useQuery({ queryKey: ["products"] });

  const queryClient = useQueryClient();

  const product = products?.filter(
    (product) => product.category.category_name === categoryName
  );

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || `{}`);

  const {
    data: heart,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", userInfo?.id],
    // queryFn: getHeartData,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
    
  });

  const isHeart = useSelector((state) => state?.user.isHeart);
  const favorites = useSelector((state) => state?.user.favorites);

  // const selectOption = useSelector((state) => state?.product.selectOption);
  // const personalHeart = useSelector((state) => state?.user.personalHeart);

  const [clicked, setIsClicked] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);

  


  const fetch = async (index: number) => {
    const response = await supabase
      .from("favorite")
      .insert([{ user_id: userInfo?.id, product_id: product[index]?.id }]);

    return response;
  };

  const del = async (productId: number) => {
    const response = await supabase
      .from("favorite")
      .delete()
      .eq("user_id", userInfo?.id)
      .eq("product_id", productId);

    return response;
  };
  const heartOn = useMutation({
    mutationFn: fetch,
    onMutate: (index: number) => {
      //즉시 하트를 추가한다.

      console.log(userInfo?.id);

      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      console.log(!value, value, "value");
      const shallow = [...value];
      console.log(shallow);

      shallow.push({
        user_id: userInfo?.id,
        product_id: product[index]?.id,
      });
      queryClient.setQueryData(["favorites", userInfo?.id], shallow);

      return { value };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["favorites", userInfo?.id], context?.value);
    },
  });

  const heartOff = useMutation({
    mutationFn: del,
    onMutate(productId: number) {
      //삭제하면 즉시 배열에있는 data 삭제
      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      const arr = value?.filter((el: { product_id: number }) => {
        return el?.product_id !== productId;
      });

      queryClient.setQueryData(["favorites", userInfo?.id], arr);

      return { arr };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["favorites", userInfo?.id], context?.arr);
    },
  });

  const handleClickHeart = async (index: number, productId: number) => {
    console.log(productId);
    try {
      //db에 추가 db에 추가된경우 db에서 삭제
      if (userLogin.login) {
        //로그인한경우 db에 존재하는지 확인.
        //heart데이터가 존재하는중인지 확인해야한다.
        //heart 데이터중 product 랑 일치하는지확인

        const check = heart?.find((el) => {
          return el.product_id === productId;
        });

        // dispatch(setFavorites(response.data));

        //data가 존재한다. 확인이 된경우 삭제한다.
        if (check) {
          heartOff.mutate(productId);
          // setPrevHeart(!prevHeart);
        } else if (!check) {
          //data가 없는경우

          heartOn.mutate(index);

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

  //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
  //추가가됏다는건 가장 마지막 배열이라는것

  // setPrevHeart(response.data[0]);
  // setButtonStates()
  // console.log(favorites);

  //하트를 클릭할때 로그인되어있지 않으면 alert창
  console.log(heart);
  return (
    <div className="w-[100%] mt-[30px] relative overflow-hidden">
      <h3 className="w-[150px]  mr-[30px] text-right float-left leading-[50px]">
        <Link className="h-[430px] block" href={link}>
          <strong className="text-[40px] mt-[-4px]">{title}</strong>

          <div>
            <span className="text-[16px] text-[#666]">
              more
              <span className="#858585 text[12px] leading-[13px] ml-[3px]">
                ▶
              </span>
            </span>
          </div>
        </Link>
      </h3>
      <ul className="float-left mr-[-22px] ">
        {product?.map((el, index: number) => {
          // const s = favorites.some((fav) => {
          //   console.log(fav.product_id, el.id);

          //   return fav?.product_id === el.id;
          // });

          // console.log(s);

          return (
            <li
              className="
              list
              w-[216px] float-left mb-[50px] mr-[22px] relative"
              key={el.id}
            >
              <button
                onClick={() => handleClickHeart(index, el.id)}
                id="heart"
                value={el.id}
                style={{
                  background: ` url(https://static.wconcept.co.kr/web/images/common/spr-common.png) -330px 0`,
                }}
                className={`w-[18px] top-[10px] right-[10px] z-[2] h-[17px] absolute
                ${
                  heart?.some((fav) => fav?.product_id === el.id)
                    ? "active"
                    : ""
                }
              
              `}
              ></button>
              <Link
                onClick={() => onClickProduct(product, el.id, index)}
                href={`/product/${el?.product_code}`}
              >
                <div className="relative mb-[16px] h-[260px] overflow-hidden">
                  <Image
                    // width={200}
                    // height={50}
                    fill
                    // style={{ width: "auto", height: "auto" }}
                    className="object-cover"
                    alt=""
                    src={el?.thumbnail}
                  ></Image>
                </div>
                <div className="h-[190px] pl-[4px] pr-[6px] ">
                  <div className="h-[100px]">
                    <div className="text-[14px] leading-[16px] mb-[7px] font-semibold w-[auto] min-h-auto max-h-initial whitespace-nowrap text-ellipsis overflow-hidden">
                      {el?.brand}
                    </div>
                    <div className="text-[#777] overflow-hidden whitespace-nowrap over text-ellipsis mb-[8px]">
                      {el?.front}
                    </div>
                    <div className="h-[32px] break-all  text-[12px] leading-[16px] mb-[16px] overflow-hidden text-[#777]">
                      {el?.front_multiline}
                    </div>
                  </div>
                  <div className="relative leading-normal flex justify-start items-baseline">
                    <span className="text-[16px] font-bold mr-[6px]">
                      {((1 - el?.discount / 100) * el.price).toLocaleString()}
                    </span>
                    <span className="text-[12px] line-through text-[#aaa] ">
                      {el?.price.toLocaleString()}
                    </span>
                    <span className="block absolute font-[600] top-0 right-0 text-[16px] text-[#ff4000]">
                      {el?.discount}%
                    </span>
                  </div>

                  <div className="mt-[10px] mb-[5px] max-h-[45px] overflow-hidden">
                    <p className="block overflow-hidden m-0">
                      {el?.general_info?.label.map(
                        (el: string[], index: number) => {
                          return (
                            <span
                              key={index}
                              className="
                        after:top-0  after:left-0 after:bottom-0 after:right-0 after:absolute after:border-[#95959] border-[1px]
                      float-left block h-[20px] overflow-hidden indent-0 mr-[5px] mb-[5px] ml-0 px-[5px] py-[2px]
                      bg-[#fff] text-[#888] w-auto text-[11px] leading-[14px] min-w-[30px] relative"
                            >
                              {el}
                            </span>
                          );
                        }
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
