"use client";

import { useSelector } from "react-redux";

export default function Description() {
  const product = useSelector((state) => state.product.product);
  return (
    <dl className="bg-[#f8f8f8] pt-[15px] text-[13px] px-[20px] pb-[21px] after:block after:clear-both">
      <dt className="w-[100%] float-none font-sans text-[#323232] text-[14px] p-0 mb-[10px]">
        상품 요약 정보
      </dt>
      <dd className="float-left p-0 m-0 ">
        <ul>
          <li className="relative leading-[18px] text-[#323232] pl-[110px] text-[12px]">
            <div className="block w-[3px] h-[3px] bg-[#171717] top-[6px] left-0 absolute"></div>
            <span className=" absolute top-0 left-[12px] font-sans font-medium">
              상품코드
            </span>
            {product?.product_code}
          </li>
          <li className="relative leading-[18px] text-[#323232] pl-[110px] text-[12px]">
            <div className="block w-[3px] h-[3px] bg-[#171717] top-[6px] left-0 absolute"></div>
            <span className=" absolute top-0 left-[12px] font-sans font-medium">
              소재
            </span>
            상세이미지 참조
          </li>
          <li className="relative leading-[18px] text-[#323232] pl-[110px] text-[12px]">
            <div className="block w-[3px] h-[3px] bg-[#171717] top-[6px] left-0 absolute"></div>
            <span className=" absolute top-0 left-[12px] font-sans font-medium">
              제조사/원산지
            </span>
            {product?.company}/{product?.country}
          </li>
          <li className="relative leading-[18px] text-[#323232] pl-[110px] text-[12px]">
            <div className="block w-[3px] h-[3px] bg-[#171717] top-[6px] left-0 absolute"></div>
            <span className=" absolute top-0 left-[12px] font-sans font-medium">
              배송비
            </span>
            50,000원 미만구매시 배송비 2,500원<br></br>
            (제주 : 3,000원 / 도서산간 : 3,000원) 추가
          </li>
          <li className="relative leading-[18px] text-[#323232] pl-[110px] text-[12px]">
            <div className="block w-[3px] h-[3px] bg-[#171717] top-[6px] left-0 absolute"></div>
            <span className=" absolute top-0 left-[12px] font-sans font-medium">
              배송정보
            </span>
            결제완료 후 평균 3일 이내 출고(공휴일 제외)
          </li>
        </ul>
      </dd>
    </dl>
  );
}
