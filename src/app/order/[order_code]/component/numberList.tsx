"use client";
import Image from "next/image";
import downArrow from "../../../../../public/down-arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneNumber } from "@/reducers/slices/OrderSlice";
import { useEffect, useRef, useState } from "react";
const number: string[] = [
  "선택",
  "010",
  "011",
  "016",
  "017",
  "018",
  "019",
  "070",
];

export default function NumberList() {
  const optionRef = useRef<HTMLDivElement>(null);
  const [selectState, setSelectState] = useState<boolean>(false);

  const phoneNumber = useSelector((state) => state.order.phoneNumber);

  const dispatch = useDispatch();

  const handleNumberClick = (el: string) => {
    dispatch(
      setPhoneNumber({
        ...phoneNumber,
        part1: el,
      })
    );
  };

  const handlesShowOption = () => {
    if (selectState === true) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
  };
  useEffect(() => {
    const clickOutside = (e) => {
      if (selectState && !optionRef?.current.contains(e.target)) {
        setSelectState(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectState]);
  return (
    <div
      ref={optionRef}
      onClick={handlesShowOption}
      className="  outline-none float-left mr-[14px] relative"
    >
      <div
        className={`w-[124px] ${
          selectState ? "border-[#000]  " : "border-[#f2f2f2] "
        }border-[1px]
    h-[40px] bg-[#f2f2f2]  leading-[38px]
    text-[#010101] text-[14px] font-normal indent-[20px]
  `}
      >
        <span
          className="block h-[38px] overflow-hidden whitespace-nowrap text-ellipsis
        pr-[25.5px]
        "
        >
          {phoneNumber.part1}
        </span>
        <Image
          width={20}
          height={20}
          className="absolute top-[10px] right-[20px]"
          src={downArrow}
          alt=""
        ></Image>
      </div>
      {selectState ? (
        <ul className=" overflow-hidden overflow-y-auto w-[124px] top-[39px] h-[320px] left-0 absolute border-[#000] border-[1px] z-10 bg-[#ffffff]">
          {number.map((el, index) => {
            return (
              <li onClick={() => handleNumberClick(el)} key={index}>
                <a
                  className=" hover:bg-[#e6e6e6] cursor-pointer
                     outline-none block leading-10 h-[40px] text-[14px] 
                   px-[19px] text-ellipsis whitespace-nowrap overflow-hidden font-normal
                    "
                >
                  {el}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
