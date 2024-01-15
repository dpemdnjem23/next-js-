"use client";

import { useState, useEffect, useRef } from "react";
import timeImage from "../../public/icons8-time-32.png";
import downArrow from "../../public/arrow-up.png";
import upArrow from "../../public/down-arrow.png";

import Image from "next/image";

const ScrollButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(true);

  useEffect(() => {
    //현재 스크롤 위치감지
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      setShowTopButton(position > 100); // 예: 스크롤 위치가 100 이상이면 나타남
      setShowBottomButton(
        position <
          document.documentElement.scrollHeight - window.innerHeight - 100
      ); // 예:
    };
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className=" fixed right-[40px] bottom-[40px] ">
      <div>
        <button className="bg-[black] w-[42px] h-[42px] rounded-[50%] flex justify-center items-center">
          <Image alt="" src={timeImage}></Image>
        </button>
      </div>
      <div className="flex justify-center flex-col">
        <button
          onClick={scrollToTop}
          className="mt-[10px]  flex justify-center items-center w-[42px] h-[42px] border-[1px] rounded-[50%]"
        >
          <Image className="w-[30px] h-[30px]" alt="" src={downArrow}></Image>
        </button>
        <button
          onClick={scrollToBottom}
          className=" mt-[10px] w-[42px] h-[42px] border-[1px] flex justify-center items-center rounded-[50%] "
        >
          <Image className="w-[30px]" alt="" src={upArrow}></Image>
        </button>
      </div>

      {/* <button onClick={scrollToTop}>위로</button>
      <button onClick={scrollToBottom}>아래로</button> */}
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
};

export default ScrollButton;

function MySVGComponent() {
  return (
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="41"
        height="41"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#E9E9E9"
        rx="20.5"
      ></rect>
      <path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="1.3"
        d="m15 19 6 6 6-6"
      ></path>
    </svg>
  );
}
