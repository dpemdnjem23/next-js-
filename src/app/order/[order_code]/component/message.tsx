"use client";
import { setMessage } from "@/reducers/slices/OrderSlice";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const messageList = [
  "메시지 직접 입력하기",
  "빠른 배송 바랍니다",
  "부재 시 경비(관리)실에 맡겨주세요",
  "부재 시 문 앞에 놓아주세요",
  "파손의 위험이 있는 상품이 있습니다. 배송 시 주의해주세요",
  "배송 전에 연락주세요",
];

export default function Message() {
  const [selectState, setSelectState] = useState<boolean>(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPlaceholderDisabled, setPlaceholderDisabled] =
    useState<boolean>(true);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.order.message);
  const handlesShowOption = () => {
    if (selectState === true) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
  };
  useEffect(() => {
    const moveOutside = (e) => {
      if (selectState && !optionRef?.current?.contains(e.target)) {
        setSelectState(false);
      }
    };
    const clickOutside = () => {
      setPlaceholderDisabled(true);
    };

    document.addEventListener("mouseover", moveOutside);
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.addEventListener("mouseover", clickOutside);

      document.removeEventListener("mouseover", moveOutside);
    };
  }, [selectState]);

  const handleSelectMessage = (item: string) => {
    //메시지 직접 입력하는경우는 focus 상태를 만들어야한다.
    if (item === "메시지 직접 입력하기") {
      dispatch(setMessage(""));
      inputRef.current?.focus();
      setPlaceholderDisabled(false);
    } else {
      dispatch(setMessage(item));
    }
  };


  return (
    <div
      ref={optionRef}
      onClick={handlesShowOption}
      className="relative text-[14px] font-normal inline-block"
    >
      <input
        ref={inputRef}
        id="mySelect"
        value={message}
        onChange={(el) => dispatch(setMessage(el.target.current))}
        className={`focus:border-[#000] focus:bg-[#fff]   border-[#f2f2f2] "
         font-normal outline-none bg-[#f2f2f2]
              w-[400px] h-[40px] leading-[38px] pl-[20px]
              border-[1px]`}
        placeholder={`${isPlaceholderDisabled ? "메세지를 입력하세요" : ""}`}
      ></input>
      {selectState ? (
        <ul className=" absolute top-[39px] left-0 right-0 z-10 border-[1px] border-[#000] bg-[#fff]">
          {messageList.map((el, index) => {
            return (
              <li
                className="
                    hover:bg-[#e6e6e6]
                    block h-[40px] pl-[20px] text-[#000] text-[14px] font-normal leading-[40px] cursor-pointer"
                key={index}
                onClick={() => handleSelectMessage(el)}
              >
                {el}
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
