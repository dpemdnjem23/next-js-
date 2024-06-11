"use client";
import Link from "next/link";

export default function Mypage() {
  //회원정보 수정
  //주소록 관리
  //회원탈퇴+

  return (
    <div
      className=" mb-[60px] bg-[#fff] w-[100%] min-w-[1240px] 
    border-[#e6e6e6] border-b-[1px]
    "
    >
      <div
        className="
      after:clear-both after:block
      w-[100%] min-w-[1240px] bg-[#f3f3f3] border-[#e6e6e6] border-t-[1px]"
      >
        <ul className=" text-[14px] w-[1240px] my-auto mx-0 after:clear-both after:block">
          <li
            className="
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              MY
            </Link>
          </li>
          <li
            className="
                before:w-[1px] before:h-[14px] before:bg-[#e5e5e5] before:block before:absolute before:top-[12px] before:left-0
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              주문관리
            </Link>
          </li>
          <li
            className="
                before:w-[1px] before:h-[14px] before:bg-[#e5e5e5] before:block before:absolute before:top-[12px] before:left-0
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              나의활동
            </Link>
          </li>
          <li
            className="
                before:w-[1px] before:h-[14px] before:bg-[#e5e5e5] before:block before:absolute before:top-[12px] before:left-0
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              쇼핑혜택
            </Link>
          </li>
          <li
            className="
                before:w-[1px] before:h-[14px] before:bg-[#e5e5e5] before:block before:absolute before:top-[12px]  before:left-0
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              정보관리
            </Link>
          </li>
          <li
            className="
                before:w-[1px] before:h-[14px] before:bg-[#e5e5e5] before:block before:absolute before:top-[12px] before:left-0
                    w-[206px] text-center float-left relative leading-[41px]"
          >
            <Link className="text-[14px] text-[#333]" href={"#"}>
              문의내역
            </Link>
          </li>
        </ul>
      </div>
      {/* 메인 부분 */}
      <div className="w-[100%] ">
        <div
          className=" w-[1240px] mx-0 my-auto py-[9px] table
        
        after:block after:clear-both"
        >
          <ul
            className="
          
          w-[210px] table-cell relative"
          >
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                MY ITEM
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                MY BRAND
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                MY STYLE
              </Link>
            </li>
          </ul>
          <ul
            className="
          before:w-[1px] before:h-[100%] before:bg-[#e5e5e5] before:block before:absolute before:top-0 before:left-0
          w-[210px] table-cell relative"
          >
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                주문/배송조히
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link
                className=" text-[12px] text-[#4c4c4c] "
                href={"/Member/mypage/orderCancelList"}
              >
                취소/교환/반품 조회
              </Link>
            </li>

            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                받은선물함
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                증빙서류 발급
              </Link>
            </li>
          </ul>
          <ul
            className="
                    before:w-[1px] before:h-[100%] before:bg-[#e5e5e5] before:block before:absolute before:top-0 before:left-0

          w-[210px] table-cell relative"
          >
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                재입고 알림
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                이벤트 참여내역
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                WDNA 참여내역
              </Link>
            </li>
          </ul>
          <ul
            className="
                    before:w-[1px] before:h-[100%] before:bg-[#e5e5e5] before:block before:absolute before:top-0 before:left-0

          w-[210px] table-cell relative"
          >
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                회원혜택
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                쿠폰
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                W POINT
              </Link>
            </li>

            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                예치금
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                상품권
              </Link>
            </li>
          </ul>
          <ul
            className="       before:w-[1px] before:h-[100%] before:bg-[#e5e5e5] before:block before:absolute before:top-0 before:left-0
          w-[210px] table-cell relative
          
          "
          >
            <li className=" text-center leading-[25px] align-top">
              <Link
                className=" text-[12px] text-[#4c4c4c] "
                href={"/Member/mypage/userModify"}
              >
                회원정보 수정
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                사이즈/뷰티 정보
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link
                className=" text-[12px] text-[#4c4c4c] "
                href={"/Member/mypage/userAddress"}
              >
                주소록 관리
              </Link>
            </li>

            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                W.페이 관리
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                환불게좌 관리
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link
                className=" text-[12px] text-[#4c4c4c] "
                href={"/Member/mypage/userWithdrawal"}
              >
                회원탈퇴
              </Link>
            </li>
          </ul>
          <ul
            className="       before:w-[1px] before:h-[100%] before:bg-[#e5e5e5] before:block before:absolute before:top-0 before:left-0
          w-[210px] table-cell relative"
          >
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                상품 Q&A
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                리뷰
              </Link>
            </li>
            <li className=" text-center leading-[25px] align-top">
              <Link className=" text-[12px] text-[#4c4c4c] " href={"#"}>
                1:1문의
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
