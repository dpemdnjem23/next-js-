"use client";

import Image from "next/image";
import Slider from "./slider";
import Link from "next/link";

import { useEffect, useState } from "react";

import { useClickProduct } from "@/lib/useClickProduct";

import { useDispatch, useSelector } from "react-redux";

import { setFavorites } from "@/reducers/slices/UserSlice";

import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import HeartButton from "./heartButton";
import { getProductsData } from "../_lib/getProductsData";
// import { supabase, supabaseKey } from "@/lib";

export default function ThumbnailList({ title, link, categoryName }) {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });

  const queryClient = useQueryClient();

  const product = products?.filter(
    (product) => product.category.category_name === categoryName
  );

  console.log(product);

  const { handleProductClick } = useClickProduct();

  //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
  //추가가됏다는건 가장 마지막 배열이라는것

  // setPrevHeart(response.data[0]);
  // setButtonStates()
  // console.log(favorites);

  //하트를 클릭할때 로그인되어있지 않으면 alert창
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
          return (
            <li
              className="
              list
              w-[216px] float-left mb-[50px] mr-[22px] relative"
              key={el.id}
            >
              <HeartButton id={el.id}></HeartButton>
              <Link
                onClick={() => handleProductClick(product, el.id, index)}
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
