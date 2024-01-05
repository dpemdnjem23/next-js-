"use client";
import DotIndicator from "@/components/DotIndicator";
import { useState } from "react";

// import { useClient } from "useClient"; // useClient 라이브러리 사용 예시

export default function Slider() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = ({sliderWidth}:any) => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={`${sliderWidth}`}>
      <h1>Slider Page {currentPage}</h1>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
          <button onClick={handleNextPage}>Next</button>
          <DotIndicator></DotIndicator>
    </div>
  );
}
