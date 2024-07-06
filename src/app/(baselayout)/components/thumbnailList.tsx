"use client";

import Image from "next/image";
import Slider from "./slider";
import Link from "next/link";
import Router from "next/router";

import ReactModal from "react-modal";

import { getSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { onClickProduct } from "@/lib/historyLocalstorage";

export default function ThumbnailList({ title, link, child }) {
  const [clicked, setIsClicked] = useState<boolean>(false);
  const [buttonStates, setButtonStates] = useState<boolean[]>(
    new Array(child.length).fill(false)
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickHeart = (index) => {
    const checkLoginStatus = async () => {
      const session = await getSession();

      if (session) {
        setButtonStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index + 1] = !newStates[index + 1];
          return newStates;
        });
      } else if (!session) {
        const userConfirmed = window.confirm("로그인 후 이용해주세요");
        if (userConfirmed) {
          window.location.href = "/Member/login"; // 이동하고자 하는 URL로 변경
        }
      }
    };

    checkLoginStatus();
  };


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
          console.log(el.id);

          return (
            <li
              onClick={() => onClickProduct(child, el.id,index)}
              className="
              list
              w-[216px] float-left mb-[50px] mr-[22px] relative"
              key={el.id}
            >
              <button
                onClick={() => handleClickHeart(index)}
                id="heart"
                value={el.id}
                style={{
                  background: ` url(https://static.wconcept.co.kr/web/images/common/spr-common.png) -330px 0`,
                }}
                className={`w-[18px] top-[10px] right-[10px] z-[2] h-[17px] absolute
                ${buttonStates[index + 1] ? "active" : ""}
              
              `}
              ></button>
              <Link href={`/product/${el?.product_code}`}>
                <div className="relative mb-[16px] h-[260px] overflow-hidden">
                  <Image
                    width={200}
                    height={50}
                    className="block w-[100%] h-[100%] object-cover"
                    alt="벽"
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
