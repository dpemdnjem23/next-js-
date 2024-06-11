import { useSelector } from "react-redux";
import wImage from "../../../public/w-image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import search from "../../../public/ico_search.svg";
import heart from "../../../public/ico_heart_line.svg";
import cart from "../../../public/ico_bag.svg";
import mypage from "../../../public/ico_mypage.svg"; // import search from "../../../public/ico_search.svg";
import Category from "./category";

export default function ResponsiveHeader({ count }) {
  const router = useRouter();

  //cart 갯수
  //serach 하면 input창

  return (
    <>
      <nav
        className=" w-[100%]
      bg-[#fff] border-[#e9e9e9] border-b-[1px]
      fixed -[100%] top-0 left-0 right- z-[101] min-w-[1280px] "
      >
        <div className="h-[70px] text-left max-w-[1920px] px-[20px] mx-auto ">
          <div className=" flex justify-start pl-[37px] text-left ">
            <ul className="flex nav-left">
              <li className=" block static pt-[9px] pl-[7px] ">
                <Link
                  className=" inline-block leading-[70px] p-0 relative"
                  href={"/"}
                >
                  <Image width={52} height={52} alt="" src={wImage}></Image>
                </Link>
              </li>

              <li>
                <Link
                  className=" block text-[#000] leading-[70px] text-[14px] uppercase relative font-bold px-[13px]"
                  href={"/women"}
                >
                  WOMEN
                </Link>
              </li>
              <li>
                <Link
                  className=" block text-[#000] leading-[70px] text-[14px] uppercase relative font-bold px-[13px]"
                  href={"/men"}
                >
                  MEN
                </Link>
              </li>
              <li>
                <Link
                  className=" block text-[#000] leading-[70px] text-[14px] uppercase relative font-bold px-[13px]"
                  href={"/beauty"}
                >
                  BEAUTY
                </Link>
              </li>
              <li>
                <Link
                  className="pr-[30px] block text-[#000] leading-[70px] text-[14px] uppercase relative font-bold px-[13px]"
                  href={"/life"}
                >
                  LIFE
                  <div
                    className=" w-[1px] h-[14px]
                
                bg-[#d9d9d9] absolute top-[50%] right-0 mt-[-7px]"
                  ></div>
                </Link>
              </li>
            </ul>
            <ul className="nav-right flex">
              <li className="">
                <Link
                  href={"/"}
                  className="pl-[30px]  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  BEST
                </Link>
              </li>

              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  SALE
                </Link>
              </li>

              <li className="">
                <Link
                  href={"/"}
                  className="leading-[70px]
              
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  NEW
                </Link>
              </li>
              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  EXCLUSIVE
                </Link>
              </li>
              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  PRE-SHOW
                </Link>
              </li>

              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  ORIGINAL
                </Link>
              </li>
              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  브랜드
                </Link>
              </li>
              <li className="">
                <Link
                  href={"/"}
                  className="
                  leading-[70px]
              block relative uppercase text-[#000] font-bold font-sans text-[14px] px-[13px]"
                >
                  기획전
                </Link>
              </li>
            </ul>
            <ul
              className="
            before:table
            block mr-[-12px] pt-[12px] ml-auto float-right "
            >
              <li className=" uppercase font-semibold text-center float-left">
                <Link
                  className="block relative text-[#000] pr-[12px] pb-[16px] pl-[12px]"
                  href={"#"}
                  onClick={(e) => e.preventDefault()}
                >
                  <Image alt="" width={28} height={28} src={search}></Image>
                  <strong className="uppercase text-[10px] font-medium leading-[10px] absolute bottom-0 left-0 right-0">
                    search
                  </strong>
                </Link>
              </li>
              <li className=" uppercase font-semibold text-center float-left">
                <Link
                  className="block relative text-[#000] pr-[12px] pb-[16px] pl-[12px]"
                  href={"/"}
                >
                  <Image alt="" width={28} height={28} src={heart}></Image>
                  <strong className="uppercase font-medium text-[10px] leading-[10px] absolute bottom-0 left-0 right-0">
                    heart
                  </strong>
                </Link>
              </li>

              <li className=" uppercase font-semibold text-center float-left">
                <Link
                  className="block relative text-[#000] pr-[12px] pb-[16px] pl-[12px]"
                  href={"/"}
                >
                  <Image alt="" width={28} height={28} src={mypage}></Image>
                  <strong className=" font-medium uppercase text-[10px] leading-[10px] absolute bottom-0 left-0 right-0">
                    my
                  </strong>
                </Link>
              </li>

              <li className=" uppercase font-semibold text-center float-left">
                <Link
                  className="block relative text-[#000] pr-[12px] pb-[16px] pl-[12px]"
                  href={"/"}
                >
                  <Image alt="" width={28} height={28} src={cart}></Image>
                  <strong className=" font-medium uppercase text-[10px] leading-[10px] absolute bottom-0 left-0 right-0">
                    {count}
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
          <Category></Category>
        </div>
      </nav>
    </>
  );
}
