"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import sliderImage1 from "../../public/pc_template_1902x880.jpg";
import arrow from "../../public/icons8-앞으로-100.png";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
// import { useClient } from "useClient"; // useClient 라이브러리 사용 예시
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  dotsClass?: string;
  prevArrow: React.ReactElement;
  nextArrow: React.ReactElement;
}
interface CustomArrowProps {
  onClick: () => void;
}

export default function SlickSlider({ children }: any) {
  const sliderRef = useRef<Slick>(null);

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    dotsClass: "slick-dots", // Dot에 적용할 클래스

    prevArrow: (
      <CustomPrevArrow
        onClick={() => sliderRef.current?.slickPrev()}
      ></CustomPrevArrow>
    ),
    nextArrow: (
      <CustomNextArrow
        onClick={() => sliderRef.current?.slickNext()}
      ></CustomNextArrow>
    ),
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slick ref={sliderRef} {...settings}>
        {children}
      </Slick>
    </div>

    // <div className={`relative block top-0 left-0 `}>
    //   <div>
    //     <Image
    //       className="bg-center float-left	block h-[100%] bg-no-repeat"
    //       alt=""
    //       src={sliderImage1}
    //     ></Image>
    //   </div>
    //   <div className="flex justify-between ">
    //     <button
    //       className="mt-[5px] z-[10]"
    //       onClick={handlePrevPage}
    //       disabled={currentPage === 1}
    //     >
    //       Prev
    //     </button>
    //     <button onClick={handleNextPage}>Next</button>
    //   </div>

    //   <div className="left-[50%] top-[45%] absolute">
    //     <DotIndicator totalSlides={currentPage}></DotIndicator>
    //   </div>
    // </div>
  );
}
const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <button onClick={onClick} className="">
    <Image
      alt=""
      className="absolute top-[40%] w-[40px] z-10 left-0 rotate-180 h-[70px] "
      src={arrow}
    ></Image>
  </button>
);

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <button onClick={onClick}>
    <Image
      alt=""
      className=" absolute right-0 top-[40%]  z-10 w-[40px] h-[70px] "
      src={arrow}
    ></Image>
  </button>
);
