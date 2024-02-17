"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import sliderImage1 from "../../../../public/pc_template_1902x880.jpg";
import arrow from "../../../../public/icons8-앞으로-100.png";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import { useInView } from "react-intersection-observer";
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

export default function SlickSlider({ children, width }: any) {
  const sliderRef = useRef<Slick>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 useEffect가 실행되도록 합니다.

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    dotsClass: "slick-dots ", // Dot에 적용할 클래스

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
    <div style={{ width: windowWidth }} className={` relative block m-0 p-0`}>
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
