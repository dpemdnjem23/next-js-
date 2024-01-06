"use client";
import DotIndicator from "@/components/DotIndicator";
import { useState } from "react";

// import { useClient } from "useClient"; // useClient 라이브러리 사용 예시

export default function Slider({ height }: any) {
  //slider는 heighht를 정한다.

  const [currentPage, setCurrentPage] = useState<number>(8);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={`${height} w-[100%] h-[300px] bg-[blue]`}>
      <div className="flex justify-between items-center">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <div className="right-[50%] top-[40%] absolute">
        <DotIndicator totalSlides={currentPage}></DotIndicator>
      </div>
    </div>
  );
}
