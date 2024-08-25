"use client";
import { setIsModal } from "@/reducers/slices/HomeSlice";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import btnClose from "../../../../public/btn_filter_close_32.svg";
import btnDel from "../../../../public/ico_del_gray.svg";
import { getHistory } from "@/lib";


interface Product {
  id: string;
  date: string;
  product_code: string;
  thumbnail: string;
  brand: string;
  front: string;
  today: string;
}

interface GroupedProducts {
  [date: string]: Product[];
}

export default function ShoppingHistoryModal() {
  const dispatch = useDispatch();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isHovered, setIsHovered] = useState(false);
  const isModal = useSelector((state) => state?.home.isModal);

  const history = getHistory();

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 useEffect가 실행되도록 합니다.

  const closeModal = () => {
    document.body.style.overflow = "auto";

    dispatch(setIsModal(false));
  };

  const groupByDate = (products: Product[]): GroupedProducts => {
    return products.reduce((acc, product) => {
      const date = product.today;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(product);
      return acc;
    }, {} as GroupedProducts);
  };

  const result = groupByDate(history);

  return (
    <div
      onClick={closeModal}
      //   // ref={ref}
      id="scroll_menu"
      className={`   ${isModal ? "active2" : ""}  
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 pt-[70px] pb-[120px] 
          right-0 w-[340px] h-[100%] overflow-hidden"
      >
        <form className="m-0 block"></form>
        <div className="absolute top-0 left-0 w-[100%] bg-[#fff]">
          <h2 className="   font-bold text-[20px] pl-[24px] text-[#000] leading-[70px]">
            SHOPPING HISTORY
          </h2>
          <button
            onClick={closeModal}
            className="block w-[32px] h-[32px] absolute right-[15px] top-[19px] overflow-hidden indent-[-9999px] "
          >
            <Image alt="" src={btnClose}></Image>
          </button>
        </div>
        <div
          style={{ height: windowHeight }}
          className="relative overflow-auto

          bg-[white] pt-[12px] px-[24px] pb-[40px]"
        >
          {Object.keys(result)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => {
              return (
                <dl className="mt-[52px]" key={date}>
                  <dt className="leading-[12px] font-semibold text-[12px] text-[#c4c4c4] border-b-[1px] border-[#c4c4c4] pb-[10px] mb-[16px]">
                    {date}
                  </dt>

                  {result[date].map((el: any, index: number) => {
                    return (
                      <dd
                        key={index}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative w-[100%] hover:opacity-[1] pr-[22px] m-0"
                      >
                        <button
                          className="block w-[8px] h-[8px] overflow-hidden relative 
              "
                        >
                          <Image
                            width={8}
                            height={8}
                            className={` ${
                              isHovered ? "opacity-1" : "opacity-0"
                            }       transition-opacity duration-300 ease-in 
                 `}
                            alt=""
                            src={btnDel}
                          ></Image>
                        </button>
                        <Link
                          className="flex"
                          href={`/product/${el.product_code}`}
                        >
                          <div className="h-[78px] relative w-[58px]">
                            <Image
                              width={58}
                              height={78}
                              // layout="fill"
                              // objectFit="cover"
                              className="w-[100%] h-[100%] object-cover absolute top-0 left-0"
                              src={el.thumbnail}
                              alt=""
                            ></Image>
                          </div>
                          <div className="pt-[5px] w-[calc(100% - 58px)] pl-[12px]">
                            <div className="min-h-auto text-[12px] font-semibold leading-[14px] mb-[6px] m-0">
                              {el.brand}
                            </div>
                            <div className="text-[#7b7b7b] text-[12px] leading-[16px] break-all line-clamp-2 overflow-hidden ">
                              {el.front_multiline}
                            </div>
                          </div>
                        </Link>
                      </dd>
                    );
                  })}
                </dl>
              );
            })}
        </div>
        <div className="text-right w-[100%] absolute bottom-0 left-0 border-t-[1px] border-[#e9e9e9] bg-[#fff] pr-[24px]">
          <button className="h-[40px] text-[11px] text-[#9d9d9d]">
            전체삭제
          </button>
        </div>
      </div>
    </div>
  );
}
