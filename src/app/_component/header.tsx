"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import loginImage from "../../../public/ico_login.svg";
import mypageImage from "../../../public/ico_mypage.svg";
import cartImage from "../../../public/ico_bag.svg";
import joinImage from "../../../public/ico_join.svg";
import logoImage from "../../../public/ico_gnb_logo_176.svg";
import Image from "next/image";
import Category from "../(baselayout)/_components/category";
import ReduxProvider from "@/reducers";
import LogoutButton from "@/app/_component/signoutButton";
import { useInView } from "react-intersection-observer";
import { setIsHeader, setIsIntersection } from "@/reducers/slices/HomeSlice";
import {
  InfiniteData,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";

import ResponsiveHeader from "./responsiveHeader";
import { cookieGet } from "@/utils/cookieUtils";
import { supabase } from "@/lib";
import { userInfo } from "os";
import { query } from "express";
import { getCartData } from "../_lib/getCartData";

export default function Header() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState<number>(0);
  const [work, setWork] = useState<boolean>(false);

  const isIntersection = useSelector((state) => state.home.isIntersection);
  const [observer, setObserver] = useState(null);

  const queryClient = useQueryClient();
  const userLogin = JSON.parse(
    localStorage.getItem("userLogin") || "{}"
  )?.login;
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // const cartItems = queryClient.getQueryData(["cart", user?.id || "guest"]);

  const {
    data: cartItems,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.id || "guest"],
    queryFn: getCartData,
  });

  console.log(cartItems);

  // if (isSuccess) {
  //   setWork(!work);
  //   return;
  // }
  const dispatch = useDispatch();

  useEffect(() => {
    const observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        // IntersectionObserverEntry 객체를 통해 감시중인 요소가 화면 안에 들어오는지 여부를 확인합니다.
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setIsHeader(true));
            // 여기에 스크롤 끝에 도달했을 때 실행할 작업을 추가합니다.
          } else {
            dispatch(setIsHeader(false));
          }
        });
      },
      {
        // rootMargin을 사용하여 요소가 뷰포트에 얼마나 가까이 있을 때 감지할 것인지를 설정할 수 있습니다.
        rootMargin: "0px",
        // threshold는 요소가 뷰포트에 얼마나 많이 보여야 감지할 것인지를 설정합니다.
        threshold: 0.1,
      }
    );
    setObserver(observer);

    // 감시할 요소를 설정합니다.
    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    // 컴포넌트가 언마운트될 때 Intersection Observer를 정리합니다.
    return () => {
      if (endOfPageRef.current && observer) {
        observer.unobserve(endOfPageRef?.current);
      }
    };
  }, []);

  useEffect(() => {
    const countCart = () => {
      let count = 0;

      cartItems?.map((el) => {
        count = count + el.options.length - 1;
      });

      setCount(count);
    };

    countCart();
  }, [cartItems]);

  const options: { root: null; rootMargin: string; threshold: number[] } =
    useMemo(
      () => ({
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.5,
      }),
      []
    );
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // setIsIntersecting(true);
        // setAbsoluteIntersecting(false);
        dispatch(setIsIntersection(false));
      } else {
        dispatch(setIsIntersection(true));

        // setIsIntersecting(false);
        // setAbsoluteIntersecting(false);
      }
    }, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, options]);

  // 스크롤 이벤트를 추가합니다.
  return (
    <header
      ref={targetRef}
      className={`
      ${
        isIntersection
          ? ""
          : `z - 100 h-[161px]min - w - [1280px] top - 0 left - 0 right - 0 relative w - [100 %]`
      } `}
    >
      <div className="h-[5px]" ref={endOfPageRef}></div>

      <div className="relative pr-[20px] w-[100%] max-w-[1920px] h-[98px] my-0 mx-auto">
        <div className="absolute top-[32px] left-[20px]">
          <Link href="/">
            <Image alt="" src={logoImage}></Image>
          </Link>
        </div>
        <div className="absolute z-[1] left-[40%] top-[9px] w-[392px] h-[70px] px-[11px]">
          <input
            className="w-[340px] h-[40px] block bg-[none] text-[14px] border-b-[1px] float-left focus:outline-none p-[0] border-[black] leading-[44px]"
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
            type="text"
          ></input>
          <button
            className="block flat-left relative w-[25px] h-[45px] right-[25px] overflow-hidden indent-[-9999px] vertical-middle"
            style={{
              background: ` url(https://static.wconcept.co.kr/web/images/common/svg/ico_search_25.svg) no-repeat center 9px/100%`,
            }}
          >
            검색
          </button>
        </div>
        <ul className=" float-right pt-[10px] mr-[-17px]  ">
          <li className=" uppercase float-left text-center">
            <Link className="  block relative p-[20px]" href={"/Member/signup"}>
              <Image alt="" src={joinImage}></Image>
              <strong className="  absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
                join
              </strong>
            </Link>
          </li>
          {userLogin === true ? (
            <li className=" uppercase float-left text-center">
              <LogoutButton></LogoutButton>
            </li>
          ) : (
            <li className=" uppercase float-left text-center">
              <Link className=" block relative p-[20px]" href={"/Member/login"}>
                <Image
                  alt=""
                  className="inline-block w-[30px] h-[30px] vertical-top"
                  src={loginImage}
                ></Image>
                <strong className=" absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
                  login
                </strong>
              </Link>
            </li>
          )}
          <li className=" uppercase float-left text-center">
            <Link className=" block relative p-[20px]" href={"/Member/mypage"}>
              <Image
                alt=""
                className="inline-block w-[30px] h-[30px] vertical-top"
                src={mypageImage}
              ></Image>
              <strong className=" absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
                my
              </strong>
            </Link>
          </li>
          <li className=" uppercase float-left text-center">
            <Link className=" block relative p-[20px]" href={"/cart"}>
              <Image alt="" src={cartImage}></Image>
              <strong className=" absolute bottom-0 left-0 right-0 text-[12px] line-[12px]">
                {count}
              </strong>
            </Link>
          </li>
        </ul>
      </div>

      {isIntersection ? (
        <ResponsiveHeader count={count}></ResponsiveHeader>
      ) : (
        <nav className="relative block w-[100%] top-0 left-0 right-0 z-[10] min-w-[1280px] border-b-[1px] border-[#e9e9e9]">
          <div className="max-w-[1920px] h-[57px] my-[0] mx-auto px-[20px] py-0 flex flex-start justify-center">
            <div className="flex justify-center"></div>
            <ul className=" m-0 p-0 flex flex-row  items-center justify-center">
              <li className="px-10 font-bold text-[14px]">NEW</li>
              <li className="px-10 font-bold text-[14px]">WOMEN</li>
              <li className="px-10 font-bold text-[14px]">BEAUTY</li>
              <li className="px-10 font-bold text-[14px]">LIFE</li>
              <li className="px-10 font-bold text-[14px]">SALE</li>
              <li className="px-10 font-bold text-[14px]">DESIGNER</li>
            </ul>
          </div>
          <Category></Category>
        </nav>
      )}
    </header>
  );
}
