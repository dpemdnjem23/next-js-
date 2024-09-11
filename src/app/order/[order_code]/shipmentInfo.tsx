"use client";

import radioN from "../../../../public/ico_radio_n_20.svg";
import radioY from "../../../../public/ico_radio_c_20.svg";
import Image from "next/image";
import NumberList from "./_component/numberList";
import Message from "./_component/message";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setName,
  setPhoneNumber,
  setPostModal,
} from "@/reducers/slices/OrderSlice";
import { InputHTMLAttributes, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ShipmentInfo() {
  const phoneNumber = useSelector((state) => state.order.phoneNumber);
  const address = useSelector((state) => state.order.address);
  const name = useSelector((state) => state.order.name);
  const message = useSelector((state) => state.order.message);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(
      setPhoneNumber({
        ...phoneNumber,
        [name]: value,
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddress({ ...address, addressLine: e.target.value }));
  };

  const handleClick = () => {
    // router.back();
    // dispatch(setPostModal(true))
  };

  return (
    <div>
      <h3 className="relative mb-[15px] text-[24px] leading-[34px]">
        배송지 정보
      </h3>
      <table
        className=" border-[#171717] table-fixed 
        w-[100%] border-separate
          border-b border-t-2 mb-[60px]"
      >
        <colgroup>
          <col className="w-[230px]"></col>
          <col></col>
        </colgroup>
        <tbody>
          <tr>
            <th
              className="h-[68px] pl-[43px]  font-light text-left break-all bg-clip-padding
            border-none border-[transparent]   border-t-[1px] border-[#e9e9e9] text-[14px]
            "
            >
              배송지 선택
            </th>
            <td className=" border-[#e9e9e9]  font-thin px-[19px] text-[#000]  border-none border-[transparent]   text-[14px] border-t-[1px]">
              <span className="inline-block relative">
                <input
                  className="w-[20px] h-[20px] absolute top-0 left-0 z-1 opacity-0"
                  type="radio"
                ></input>
                <label className="pl-[29px] leading-[20px] text-[#000] font-normal relative text-[14px]">
                  <Image
                    className="absolute top-0 left-0"
                    width={20}
                    height={20}
                    alt=""
                    src={radioN}
                  ></Image>
                  기본주소
                </label>
              </span>
              <span className=" ml-[30px] relative inline-block">
                <input
                  className="w-[20px] h-[20px] absolute top-0 left-0 z-1 opacity-0"
                  type="radio"
                ></input>

                <label className="pl-[29px] leading-[20px] text-[#000] font-normal relative text-[14px]">
                  <Image
                    className="absolute top-0 left-0"
                    width={20}
                    height={20}
                    alt=""
                    src={radioY}
                  ></Image>
                  새로입력
                </label>
              </span>

              <button
                className="min-w-[115px] font-medium h-[40px] text-[14px] leading-[38px] ml-[30px]
              border-[#7d7d7d] bg-[#7d7d7d] text-[#fff] text-center inline-block px-[20px]
              "
                type="button"
              >
                주소록
              </button>
            </td>
          </tr>
          <tr>
            <th
              className="h-[68px] pl-[43px]  font-light text-left break-all bg-clip-padding
            text-[14px] border-t-[1px] border-[#e9e9e9]
            "
            >
              받으시는 분
            </th>
            <td
              className="border-[#e9e9e9] font-thin px-[19px]
            
            text-[#000] text-[14px] border-t-[1px]"
            >
              <input
                onChange={(e) => handleNameChange(e)}
                value={name || ""}
                type="text"
                maxLength={15}
                className="
                          focus:bg-[#fff] focus:border-[#000] focus:border-[1px]
                          w-[400px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] text-[14px] outline-none"
              ></input>
            </td>
          </tr>
          <tr>
            <th
              className="h-[68px] pl-[43px] font-light text-left break-all bg-clip-padding
              border-t-[1px] border-[#e9e9e9]text-[14px]
            "
            >
              휴대폰 번호
            </th>
            <td className="border-[#e9e9e9] font-thin px-[19px] text-[#000] text-[14px] border-t-[1px]">
              <div className=" inline-block h-[40px]">
                <NumberList></NumberList>

                <input
                  onChange={(e) => handlePhoneChange(e)}
                  value={phoneNumber.part2 || ""}
                  name="part2"
                  type="text"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  className="
                          focus:bg-[#fff] focus:border-[#000] focus:border-[1px] font-normal
                          w-[124px] h-[40px] leading-[38px] mr-[14px] pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] text-[14px] outline-none"
                ></input>
                <input
                  onChange={(e) => handlePhoneChange(e)}
                  value={phoneNumber.part3 || ""}
                  name="part3"
                  type="text"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  className="
                          focus:bg-[#fff] focus:border-[#000] focus:border-[1px] font-normal
                          w-[124px] h-[40px] leading-[38px] pl-[20px] bg-[#f2f2f2] border-[#f2f2f2] text-[14px] outline-none"
                ></input>
              </div>
            </td>
          </tr>
          <tr>
            <th
              className="h-[68px] pl-[43px]  font-light text-left break-all bg-clip-padding
              border-t-[1px] border-[#e9e9e9]text-[14px]
            "
            >
              배송주소
            </th>
            <td className="border-[#e9e9e9] font-thin py-[14px] px-[19px] text-[#000] text-[14px] border-t-[1px]">
              <input
                value={address["zip"] || ""}
                disabled={true}
                className="w-[250px] mr-[7px] text-[#aaa] cursor-default font-normal font-sans pl-[20px]
              h-[40px] leading-[38px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px] text-[14px] outline-none align-middle
              "
              ></input>
              <Link
                href={`/order/${params.order_code}/post`}
                onClick={handleClick}
                className=" inline-block text-center px-[20px] align-middle
              border-[1px] border-[#7d7d7d] bg-[#7d7d7d] text-[#fff]
              min-w-[140px] h-[40px] text-[14px] font-medium leading-[40px]"
                type="button"
              >
                <span>우편번호 찾기</span>
              </Link>

              <p className=" block mt-[10px] text-[14px] text-[#000] font-normal font-sans ">
                <input
                  value={address["road"] || ""}
                  type="text"
                  disabled={true}
                  className="w-[400px] pl-[20px]
                  mr-[7px] text-[#aaa] cursor-default font-normal font-sans
                  h-[40px] leading-[38px] bg-[#f2f2f2] border-[#f2f2f2] border-[1px] text-[14px] outline-none align-middle
                  
                
                "
                ></input>

                <input
                  value={address["addressLine"] || ""}
                  onChange={(e) => handleAddressChange(e)}
                  type="text"
                  className="
                  focus:bg-[#fff] focus:border-[#000]
                  w-[260px] outline-none
                  h-[40px] pl-[20px] bg-[#f2f2f2] border-[1px] border-[#f2f2f2] text-[14px] font-sans font-normal
                                  
                "
                ></input>
              </p>
            </td>
          </tr>
          <tr>
            <th
              className="h-[68px] pl-[43px]  font-light text-left break-all bg-clip-padding
              border-t-[1px] border-[#e9e9e9]text-[14px]
            "
            >
              배송 메세지
            </th>
            <td className="border-[#e9e9e9]  font-thin px-[19px] text-[#000] text-[14px] border-t-[1px]">
              <Message></Message>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
