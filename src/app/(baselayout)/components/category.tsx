"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import arrowImage from "../../../../public/ico_cat_arrow_open_12.svg";

type props = {
  category1: boolean;
  category2: boolean;
  category3: boolean;
  category4: boolean;
};

export default function Category() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //카테고리에 갖다대는경우
  const [categoryFocus, setCategoryFocus] = useState<props>({
    category1: true,
    category2: false,
    category3: false,
    category4: false,
  });

  const menuRef: any = useRef(null);

  //메뉴에 갖다대면 메뉴창을 연다

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCategoryEnter: props = (menuName: string) => {
    const updatedStates = Object.fromEntries(
      Object.keys(categoryFocus).map((name) => [name, false])
    );

    // const handleCategoryLeave = (menuName: string) => {
    //   setCategoryFocus((prevStates) => ({
    //     ...prevStates,
    //     [menuName]: false,
    //   }));
    // };
    updatedStates[menuName] = true;

    setCategoryFocus(updatedStates);
  }; //메뉴를 떠날때 메뉴창이 닫히도록하고,
  return (
    <div>
      <a
        onMouseLeave={closeMenu}
        onMouseEnter={openMenu}
        className={`${isMenuOpen ? "border-b-0" : ""}
       cursor-pointer  w-[180px] py-0 pl-[14px] font-bold text-[14px] block absolute top-0 leading-[46px] border-[1px]  border-[#e9e9e9] text-left overflow-hidden
        `}
      >
        CATEGORY
        {!isMenuOpen ? (
          <Image
            alt=""
            className={`w-[12px] h-[12px] top-[50%] absolute block mt-[-7px] right-[17px]`}
            src={arrowImage}
          ></Image>
        ) : (
          <Image
            alt=""
            className={`w-[12px] h-[12px] top-[50%] rotate-180 absolute block mt-[-7px] right-[17px]`}
            src={arrowImage}
          ></Image>
        )}
      </a>
      {isMenuOpen ? (
        <div
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          className={`${isMenuOpen ? `block z-[100px]` : `hidden z-[99px]`} 
        top-[46px] left-[-10px]   border-t-[1px] border-t-[#e9e9e9] border-b-[1px] border-b-[#e9e9e9] absolute  cursor-default bg-[white]`}
        >
          <div
            ref={menuRef}
            className={`
          ${
            isMenuOpen
              ? "before:block before:w-[180px] before:h-[5px] before:bg-[white] before:absolute before:top-[-2px] before:left-[10px]"
              : ""
          }
          relative w-[100%] max-w-[1920px] min-h-[324px] my-auto mx-0
        p-[20px] text-left `}
          >
            <div className="relative float-left pl-14px">
              <div className="flex flex-wrap content-start pl-[200px] ">
                <Link
                  onMouseEnter={() => handleCategoryEnter("category1")}
                  className={`

                  ${
                    categoryFocus.category1
                      ? ':after:block after:w-[9px] after:h-[10px] after:absolute after:top-[50%] after:right-[15px] after:mt-[-6px] after:bg-[url("https://static.wconcept.co.kr/web/images/common/svg/ico_arrow_right_11.svg")]'
                      : ""
                  }
                absolute top-0 left-0 w-[170px] h-[47px] leading-[47px] text-[17px] font-bold `}
                  href="/men"
                >
                  MEN
                </Link>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
              </div>

              <div className="flex flex-wrap content-start  w-[1300px] ">
                <Link
                  onMouseEnter={() => handleCategoryEnter("category2")}
                  className={` 
                  ${
                    categoryFocus.category2
                      ? ':after:block after:w-[9px] after:h-[10px] after:absolute after:top-[50%] after:right-[15px] after:mt-[-6px] after:bg-[url("https://static.wconcept.co.kr/web/images/common/svg/ico_arrow_right_11.svg")]'
                      : ""
                  }
                  

                  absolute top-[47px] left-0 w-[170px] leading-[47px] h-[47px] text-[17px] font-bold `}
                  href="/women"
                >
                  WOMEN
                </Link>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
              </div>
              <div className="flex flex-wrap content-start  w-[1300px] ">
                <Link
                  onMouseEnter={() => handleCategoryEnter("category3")}
                  className={`
                  ${
                    categoryFocus.category3
                      ? ':after:block after:w-[9px] after:h-[10px] after:absolute after:top-[50%] after:right-[15px] after:mt-[-6px] after:bg-[url("https://static.wconcept.co.kr/web/images/common/svg/ico_arrow_right_11.svg")]'
                      : ""
                  }
                font-bold
                  
                  absolute top-[94px] leading-[47px]  left-0 w-[170px] h-[47px] text-[17px] `}
                  href="/beauty"
                >
                  BEAUTY
                </Link>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
              </div>
              <div className="flex flex-wrap content-start  w-[1300px] ">
                <Link
                  onMouseEnter={() => handleCategoryEnter("category4")}
                  className={`
                  ${
                    categoryFocus.category4
                      ? ':after:block after:w-[9px] after:h-[10px] after:absolute after:top-[50%] after:right-[15px] after:mt-[-6px] after:bg-[url("https://static.wconcept.co.kr/web/images/common/svg/ico_arrow_right_11.svg")]'
                      : ""
                  }
                font-bold
                  
                  absolute leading-[47px] top-[141px] left-0 w-[170px] h-[47px] text-[17px] `}
                  href="/life"
                >
                  LIFE
                </Link>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
                <ul></ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
