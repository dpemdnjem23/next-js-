"use client";

import Image from "next/image";
import Slider from "./slider";
import Link from "next/link";
import Router from "next/router";

import ReactModal from "react-modal";

import { getSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { onClickProduct } from "@/lib/historyLocalstorage";
import { supabase } from "@/lib";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/reducers/slices/UserSlice";

export default function ThumbnailList({ title, link, child }) {
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || `{}`);

  const isHeart = useSelector((state) => state?.user.isHeart);
  const favorites = useSelector((state) => state?.user.favorites);

  const selectOption = useSelector((state) => state?.product.selectOption);
  const personalHeart = useSelector((state) => state?.user.personalHeart);

  const [clicked, setIsClicked] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickHeart = async (index: number, productId: number) => {
    //로그인 되어있는 경우

    try {
      //db에 추가 db에 추가된경우 db에서 삭제
      if (userLogin.login) {
        //db에 추가하려면, 없어야한다. 있는경우 삭제한다.

        console.log(child[index]?.id);
        const { data, error } = await supabase
          .from("favorite")
          .select()
          .eq("user_id", userInfo?.user?.id)
          .eq("product_id", child[index]?.id);

        if (error) {
          throw error;
        }

        // dispatch(setFavorites(response.data));

        console.log(data, !data[0], child[index], userInfo);
        //data가 존재한다. 확인이 된경우 삭제한다.
        if (data.length >= 1) {
          const del = await supabase
            .from("favorite")
            .delete()
            .eq("user_id", userInfo?.user?.id)
            .eq("product_id", child[index]?.id);

          if (error) {
            throw error;
          }

          // setPrevHeart(!prevHeart);
        } else if (!data[0]) {
          //data가 없는경우

          const add = await supabase
            .from("favorite")
            .insert([
              { user_id: userInfo?.user.id, product_id: child[index]?.id },
            ]);

          if (add.error) {
            throw add.error;
          }

          const response: any = await supabase
            .from("favorite")
            .select()
            .eq("user_id", userInfo.user.id);
          // .eq("product_id", child[index]?.id);

          if (response.error) {
            throw response.error;
          }
          //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
          //추가가됏다는건 가장 마지막 배열이라는것

          // setPrevHeart(response.data[0]);
          // setButtonStates();

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

  const data = async () => {
    const response: any = await supabase
      .from("favorite")
      .select()
      .eq("user_id", userInfo.user.id);

    if (response.error) {
      throw response.error;
    }

    dispatch(setFavorites(response.data));
  };

  useEffect(() => {
    data();
    //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
    //추가가됏다는건 가장 마지막 배열이라는것

    // setPrevHeart(response.data[0]);
    // setButtonStates();
  }, []);

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
        {child.map((el, index: number) => {
          // const s = favorites.some((fav) => {
          //   console.log(fav.product_id, el.id);

          //   return fav?.product_id === el.id;
          // });

          // console.log(s);

          return (
            <li
              onClick={() => onClickProduct(child, el.id, index)}
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
                  favorites.some((fav) => fav?.product_id === el.id)
                    ? "active"
                    : ""
                }
              
              `}
              ></button>
              <Link href={`/product/${el?.product_code}`}>
                <div className="relative mb-[16px] h-[260px] overflow-hidden">
                  <Image
                    width={200}
                    height={50}
                    style={{ width: "100%", height: "100%" }}
                    // className="relative"
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
