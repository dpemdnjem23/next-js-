"use client";

import Image from "next/image";
import Slider from "../components/slider";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function ThumbnailList({ title, child, link }: any) {
  const [clicked, setIsClicked] = useState<boolean>(false);
  const [buttonStates, setButtonStates] = useState<boolean[]>(
    new Array(child.length).fill(false)
  );

  const handleClickHeart = (index) => {
    console.log(index);
    setButtonStates((prevStates) => {
      console.log(prevStates);
      const newStates = [...prevStates];
      newStates[index + 1] = !newStates[index + 1];
      return newStates;
    });
  };

  return (
    <div>
      <h3 className="w-[190px] mr-[20px] text-right float-left leading-[50px]">
        <Link href={link}>
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
      <ul className="float-left flex flex-row">
        {child.map((el: any, index: number) => {
          return (
            <li key={el.id}>
              <button
                onClick={() => handleClickHeart(index)}
                id="heart"
                value={el.id}
                style={{
                  background: ` url(https://static.wconcept.co.kr/web/images/common/spr-common.png) -330px 0`,
                }}
                className={`w-[18px] top-[10px] right-[10px] z-1 h-[17px] 
                ${buttonStates[index+1] ? "active" : ""}
              
              `}
              ></button>
              <Link href={`/product/${el.id}`}>{/* <div>야임마</div> */}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
