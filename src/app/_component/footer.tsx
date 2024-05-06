"use client";

export default function Footer() {
  return (
    <footer className="pt-[90px] pb-[36px]">
      <div>
        <nav className="relative w-full  mt-[70px]">
          <ul className=" w-[1280px] bg-[#848484] px-[28px] relative mx-auto overflow-hidden">
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
    </footer>
  );
}
