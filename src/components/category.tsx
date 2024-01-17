"use client";

import { useState } from "react";
import Image from "next/image";

import arrowImage from "../../public/ico_cat_arrow_open_12.svg";

export default function Category() {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleOnFocus = () => {
    console.log("focus");
    setIsFocus(true);
  };
  const handleOnFocusOut = () => {
    setIsFocus(false);
    console.log("out");
  };

  return (
    <div
      className={`        ${isFocus ? "active" : ""}
    `}
    >
      <a
        onMouseOut={handleOnFocusOut}
        onMouseOver={handleOnFocus}
        className={`
        cursor-pointer  w-[180px] py-0 pl-[14px] font-bold text-[14px] block absolute top-0 leading-[46px] border-[1px] border-[#e9e9e9] text-left overflow-hidden
        `}
      >
        CATEGORY
        <Image
          alt=""
          className={`w-[12px] h-[12px] top-[50%] absolute block mt-[-7px] right-[17px]`}
          src={arrowImage}
        ></Image>
      </a>
      <div
        style={{ zIndex: "99" }}
        className="
       top-[48px]  border-t-[1px] border-t-[#e9e9e9] border-b-[1px] border-b-[#e9e9e9] z-[99]
        none absolute left-0 right-0 cursor-default bg-[white]"
      >
        <div
          className="relative w-[100%] max-w-[1920px] min-h-[320px] my-0 mx-auto
        p-[20px] text-left
        
        "
        ></div>
      </div>
    </div>
  );
}
