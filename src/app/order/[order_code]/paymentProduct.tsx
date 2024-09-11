"use client";
import PaymentSystem from "./_component/paymentSystem";
import checkBox from "../../../../public/ico_checkbox_square_20.svg";
import checkBoxY from "../../../../public/ico_checkbox_square_s_20.svg";
import radioY from "../../../../public/ico_radio_c_20.svg";
import radio from "../../../../public/ico_radio_n_20.svg";
import kakaopay from "../../../../public/ico_kakaopay.svg";

import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "@/reducers/slices/OrderSlice";
export default function PaymentProduct() {
  const dispatch = useDispatch();
  const radioButton = useSelector((state) => state.order.paymentMethod);

  return (
    <>
      <h3 className="relative mb-[15px] text-[24px] leading-[34px] font-normal font-sans">
        결제 수단
        <div className=" inline-block ml-[15px] align-middle font-normal">
          <Image
            width={20}
            className="absolute block top-[12px]"
            height={20}
            alt=""
            src={checkBox}
          ></Image>
          <label className=" pl-[28px] text-[14px] relative  mb-[-2px] leading-[22px]">
            지금 선택한 결제수단을 다음에도 사용
          </label>
        </div>
      </h3>
      <div className=" border-t-[#171717] border-t-[2px] border-b-[#585858] border-b-[1px] payment wrap">
        <div className=" pl-[40px] pr-[30px] flex justify-start items-center relative h-[67px]">
          <span className=" inline-block relative">
            {radioButton ? (
              <Image
                onClick={() => dispatch(setPaymentMethod(false))}
                className="absolute top-[50%] mt-[-10px] left-0"
                width={20}
                height={20}
                src={radioY}
                alt=""
              ></Image>
            ) : (
              <Image
                onClick={() => dispatch(setPaymentMethod(true))}
                className="absolute top-[50%] mt-[-10px] left-0"
                width={20}
                height={20}
                src={radio}
                alt=""
              ></Image>
            )}
            <label
              className="text-[16px] align-middle flex items-center justify-start
            pl-[29px] leading-[20px]
            "
            >
              간편결제
            </label>
          </span>
        </div>

        {radioButton ? (
          <div className="pl-[68px] bg-[#fbfbfb]">
            <div>
              <div className="py-[30px] ">
                <ul className="mb-[2px]">
                  <li className="w-[25%] h-[16px] mb-[16px] float-left">
                    <label className=" pl-[29px] block text-[14px] text-[#000] font-normal relative leading-[20px]">
                      <Image
                        className="absolute block top-0 left-0"
                        width={20}
                        height={20}
                        alt=""
                        src={radioY}
                      ></Image>
                      <Image alt="" src={kakaopay}></Image>
                    </label>
                  </li>
                </ul>
                <ul></ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
