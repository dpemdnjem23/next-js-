"use client";

import { setIsFooter, setIsHeader } from "@/reducers/slices/HomeSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function Footer() {
  const footerRef = useRef(null);
  const [observer, setObserver] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        // IntersectionObserverEntry 객체를 통해 감시중인 요소가 화면 안에 들어오는지 여부를 확인합니다.
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("is");
            dispatch(setIsFooter(true));

            // dispatch(setIsHeader(true));
            // 여기에 스크롤 끝에 도달했을 때 실행할 작업을 추가합니다.
          } else {
            dispatch(setIsFooter(false));

            // dispatch(setIsHeader(false));
          }
        });
      },
      {
        // rootMargin을 사용하여 요소가 뷰포트에 얼마나 가까이 있을 때 감지할 것인지를 설정할 수 있습니다.
        rootMargin: "0px",
        // threshold는 요소가 뷰포트에 얼마나 많이 보여야 감지할 것인지를 설정합니다.
        threshold: 0,
      }
    );
    // setObserver(observer)/;

    // 감시할 요소를 설정합니다.
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // 컴포넌트가 언마운트될 때 Intersection Observer를 정리합니다.
    return () => {
      if (footerRef.current && observer) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer className="pt-[90px] block">
      <div>
        <nav className="relative w-full  mt-[70px]">
          <ul className=" w-[1280px] bg-[rgb(132,132,132)] px-[28px] relative mx-auto overflow-hidden">
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              회사소개
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              입점상담
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              제휴문의
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              이용약관
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              개인정보처리방침
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              고객센터
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              채용정보
            </li>
            <li className="float-left block text-[#fff] text-[14px] leading-[57px] px-[44px]">
              GLOBAL
            </li>
          </ul>
        </nav>
        <div className="w-[1240px] relative mx-auto">
          <div className="text-[12px] pt-[40px] text-[#666] leading-[20px] font-sans mb-[17px]">
            상호명: 더블유 | 대표자:아무개 | 주소:서울특별시 강남구 테헤란로
            <br></br>
            사업자등록번호:211-88-99852 | 통신판매업신고<br></br>
            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
          </div>
          <div
            className=" after:bg-[#e5e5e5] after:absolute after:top-0 after:bottom-0 after:left-[-20px] after:margin-auto after:w-[1px] after:h-[87px]
          text-[12px] absolute top-[40px] right-0 tracking-[-.5px]"
          >
            <h3 className=" font-sans font-medium leading-[18px] text-[12px]">
              소비자피해보상보험
            </h3>
            <p className="font-sans text-[#666] leading-[18px] mb-[14px]">
              고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서 가입한
              <br></br>
              소비자피해보상보험 서비스를 이용하실 수 있습니다.
            </p>
            <span className=" inline-block text-[#666] font-sans leading-[18px]">
              보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
            </span>
          </div>
        </div>
      </div>
      <div ref={footerRef} className=" mt-[36px] h-[5px]"></div>
    </footer>
  );
}
