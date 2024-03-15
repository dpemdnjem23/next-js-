"use client";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
import { useInterval } from "@/app/_lib/useInterval";

interface SliderSettings {
  //   dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  //   dotsClass?: string;
  //   prevArrow: React.ReactElement;
  //   nextArrow: React.ReactElement;
}
export default function Slide() {
  const ref: any = useRef(null);

  // console.log(ref.current.style);

  let INTERVAL = 3000;
  const [slidePx, setSlidePx] = useState<number>(-850);
  const [count, setCount] = useState<number>(2);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 0 ->1700
  //2975 ->1275
  useInterval(() => {
    if (!isPaused) {
      setSlidePx((slidePx) => slidePx - 425);
      setCount((count) => count + 1);
    }
  }, INTERVAL);

  //왼쪽끝으로가면 끝에서 시작
  const toPrev = () => {
    if (slidePx < 0) {
      setCount(count - 1);
      setSlidePx(slidePx + 425);
    }
  };

  //오른쪽끝으로가면 처음부터 시작
  const toNext = () => {
    if (slidePx > -2975) {
      setSlidePx(slidePx - 425);

      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (count === 6) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = "";
        }
        setCount(2);
        setSlidePx(-1275);
      }, 400);

      // console.log(ref.current.style.transition);
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = "transform ease 400ms";
        }
      }, 500);
    } else if (count === 0) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = "";
        }
        setCount(4);
        setSlidePx(-1700);
      }, 400);

      // console.log(ref.current.style.transition);
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transition = "transform ease 400ms";
        }
      }, 500);
    }
  }, [slidePx]);

  const handleMouseOver = () => {
    INTERVAL = 10000;
    setIsPaused(true);
  };

  const handleMouseOut = () => {
    INTERVAL = 3000;
    setIsPaused(false);
  };

  return (
    <div className="w-[100%]">
      <div className=" overflow-hidden mb-[12px]">
        <ul
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          ref={ref}
          style={{
            transform: `translateX(${slidePx}px)`,
            transition: "transform ease 400ms",
            width: "3500px",
            marginLeft: "0px",
            position: "relative",
          }}
        >
          <li
            data-origin-idx="2"
            data-idx="0"
            aria-hidden="true"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">삼성카드</span>
            <strong>할인</strong>
            <span className=" font-sans text-[#fa5500] text-[14px]">5,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              삼성카드 LINK하고 12만원 결제시 5천원 결제일 할인
            </em>
          </li>
          <li
            // aria-hidden="false"
            data-origin-idx="3"
            data-idx="1"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">Toss Pay</span>
            <span className=" font-sans text-[#fa5500] text-[14px]">5,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>적립</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              토스페이 생애 첫 결제 시 1만원 이상 결제 시 2천원 토스포인트 적립{" "}
            </em>
          </li>
          <li
            // aria-hidden="true"
            data-origin-idx="0"
            data-idx="2"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">
              W컨셉 삼성카드
            </span>
            <strong>할인</strong>

            <span className=" font-sans text-[#fa5500] text-[14px]">4,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              5만원 이상 첫결제 시 4만원 즉시할인({"일반결제"} {">"}
              {"W컨셉 삼성카드"} 결제수단 선택시에만 적용)
            </em>
          </li>
          <li
            data-origin-idx="1"
            data-idx="3"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">
              KaKao Pay
            </span>
            <strong>할인</strong>

            <span className=" font-sans text-[#fa5500] text-[14px]">
              10,000
            </span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              매일 자정부터 선착순 350명, 카카오페이머니 10/12만원 이상 결제 시
              5천원/1만원 즉시할인(초과 시 미적립)
            </em>
          </li>

          <li
            data-origin-idx="2"
            data-idx="4"
            aria-hidden="true"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">삼성카드</span>
            <strong>할인</strong>
            <span className=" font-sans text-[#fa5500] text-[14px]">5,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              삼성카드 LINK하고 12만원 결제시 5천원 결제일 할인
            </em>
          </li>
          <li
            // aria-hidden="false"
            data-origin-idx="3"
            data-idx="5"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">Toss Pay</span>
            <span className=" font-sans text-[#fa5500] text-[14px]">5,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>적립</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              토스페이 생애 첫 결제 시 1만원 이상 결제 시 2천원 토스포인트 적립{" "}
            </em>
          </li>
          <li
            // aria-hidden="true"
            data-origin-idx="0"
            data-idx="6"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">
              W컨셉 삼성카드
            </span>
            <strong>할인</strong>

            <span className=" font-sans text-[#fa5500] text-[14px]">4,000</span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              5만원 이상 첫결제 시 4만원 즉시할인({"일반결제"} {">"}
              {"W컨셉 삼성카드"} 결제수단 선택시에만 적용)
            </em>
          </li>
          <li
            data-origin-idx="1"
            data-idx="7"
            className="w-[425px] mx-0 float-left text-[14px]"
          >
            <span className=" font-sans text-[12px] text-[#333]">
              KaKao Pay
            </span>
            <strong>할인</strong>

            <span className=" font-sans text-[#fa5500] text-[14px]">
              10,000
            </span>
            <strong className="text-[#fa5500]">원</strong>
            <strong>할인</strong>
            <em className="block text-[#333] text-[12px] mt-[7px] overflow-hidden whitespace-nowrap text-ellipsis">
              매일 자정부터 선착순 350명, 카카오페이머니 10/12만원 이상 결제 시
              5천원/1만원 즉시할인(초과 시 미적립)
            </em>
          </li>
        </ul>
      </div>
      <div className="ix-controller flex justify-start overflow-hidden font-sans text-[13px]">
        <button
          onClick={toPrev}
          type="button"
          className="block w-[20px] h-[20px] indent-[-9999px] "
          style={{
            background: `url(https://static.wconcept.co.kr/web/images/product/spr_product_price.png) 0 0 no-repeat`,
          }}
        ></button>
        <button
          onClick={toNext}
          type="button"
          className="block ml-[-1px] w-[20px] h-[20px] indent-[-9999px] "
          style={{
            background: `url(https://static.wconcept.co.kr/web/images/product/spr_product_price.png) -25px 0 no-repeat`,
          }}
        ></button>
      </div>
    </div>
  );
}
