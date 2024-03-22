"use client";

import { useState, useEffect, useRef, useDebugValue } from "react";
import timeImage from "../../../../public/icons8-time-32.png";
import downArrow from "../../../../public/arrow-up.png";
import upArrow from "../../../../public/down-arrow.png";
import { useInView } from "react-intersection-observer";
import "./ScrollButtonStyle.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "@/reducers/slices/HomeSlice";

const ScrollButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isModal = useSelector((state) => state?.home.isModal);

  const dispatch = useDispatch();
  const isHeader = useSelector((state) => state?.home.isHeader);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const openModal = () => {
    dispatch(setIsModal(true));
  };

  return (
    <div
      className={`fixed block z-[999]
        ${isHeader ? "top" : "middle"}
        ${isModal ? "hidden" : "block"}
        side_bar
   right-[22px] bottom-[47px]`}
    >
      <button
        onClick={openModal}
        className="bg-[black] w-[42px] h-[42px] rounded-[50%] flex justify-center items-center"
      >
        <Image alt="" src={timeImage}></Image>
      </button>
      <div className="direction flex justify-center flex-col">
        <button
          onClick={scrollToTop}
          className={`to_top max-h-[42px] mt-[6px]`}
        >
          <Image
            className={`            
w-[42px] h-[42px] bg-[white]  border-[1px] rounded-[50%]`}
            alt=""
            src={downArrow}
          ></Image>
        </button>

        <button
          onClick={scrollToBottom}
          className=" to_bottom max-h-[42px] mt-[6px]"
        >
          <Image
            className={`w-[42px] h-[42px] bg-[white]  border-[1px] rounded-[50%]`}
            alt=""
            src={upArrow}
          ></Image>
        </button>
      </div>

      {/* <button onClick={scrollToTop}>위로</button>
      <button onClick={scrollToBottom}>아래로</button> */}
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
};

export default ScrollButton;
