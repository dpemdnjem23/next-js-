"use client";

import DotIndicator from "@/components/DotIndicator";
import { useState, useEffect } from "react";
import Image from "next/image";
import sliderImage1 from "../../public/pc_template_1902x880.jpg";
import arrow from "../../public/icons8-앞으로-100.png";
import Slick from "react-slick";
import slickcss from "slick-carousel/slick/slick.css";
import slicktheme from "slick-carousel/slick/slick-theme.css";
// import { useClient } from "useClient"; // useClient 라이브러리 사용 예시

export default function SlickSlider({ height, children }: any) {
  //slider는 heighht를 정한다.

  useEffect(() => {
    // slickcss;
    // slicktheme;
    // Slick slider의 스타일이 클라이언트 사이드에서 로드되도록 설정
    import("slick-carousel/slick/slick.css");
    import("slick-carousel/slick/slick-theme.css");
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(8);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true, // 자동 재생 활성화
    // autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slick {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <Image
            className="bg-center float-left	block h-[100%] bg-no-repeat"
            alt=""
            src={sliderImage1}
          ></Image>
        </div>
      </Slick>
      <div>
        <button>
          <Image
            alt=""
            className="p-[20px] z-10 left-0 w-[70px] h-[100px] "
            src={arrow}
          ></Image>
        </button>
      </div>
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
