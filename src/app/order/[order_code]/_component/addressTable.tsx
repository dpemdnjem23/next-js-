// "use server";
"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setIsLoading } from "@/reducers/slices/UserSlice";
import {
  setAddress,
  setIsClicked,
  setPostModal,
} from "@/reducers/slices/OrderSlice";

import commonImage from "../../../../../public/spr-common.png";
import Image from "next/image";
import Pagination from "./pagination";
const auth = process.env.NEXT_PUBLIC_AUTH_POST;

export default function AddressTable({ addressData, pageData, number }) {
  //page이동

  const city = useSelector((state) => state?.order);
  const district = useSelector((state) => state?.order);
  const dispatch = useDispatch();

  const address = useSelector((state) => state.order.address);

  //클릭했을때 modal창닫기, jibun, zipcode전달
  const handleClickData = (zip: string, road: string) => {
    const newState = { zip, road };

    dispatch(setAddress(newState));

    dispatch(setPostModal(false));
  };
  // const [page, setPage] = useState<number>(1);

  //서버를 api를 연결해야됨.

  //아래는 도로명 주소

  // console.log(data.map((el) => el));

  return (
    <>
      <p className=" mt-[17px] mb-[6px]  text-[14px] font-medium ">
        총
        <em className=" font-normal text-[#ff6160] not-italic">
          {Number(addressData[0])}
        </em>
        건
      </p>
      <table className=" font-normal mb-[22px] border-t-[2px] border-b-[1px] table-fixed w-[100%] border-collapse border-[#171717]">
        <colgroup>
          <col></col>
          <col className="w-[148px]"></col>
        </colgroup>
        <thead>
          <tr className="font-normal">
            <th className="h-[68px] text-[14px] px-[14px] text-[#000] text-center align-middle border-b-[1px] border-[#b5b5b5] ">
              주소
            </th>
            <th className="h-[68px] text-[14px] px-[14px] text-[#000] text-center align-middle border-b-[1px] border-[#b5b5b5] ">
              우편번호
            </th>
          </tr>
        </thead>
        <tbody className=" ">
          <tr className=" ">
            <td
              colSpan={2}
              className="  p-0 h-[68px] font-sans font-normal align-middle text-[#000] text-[14px]"
            >
              <div
                className="overflow-y-auto
              
              relative text-[14px] text-[#000] max-h-[276px] overflow-hidden "
              >
                <table className="   w-[100%] border-spacing-0 border-separate table-fixed border-[0px] mb-0">
                  <colgroup>
                    <col></col>
                    <col className="w-[148px]"></col>
                  </colgroup>
                  <tbody>
                    {addressData[1]?.map((el, index) => {
                      return (
                        <tr
                          onClick={() => handleClickData(el.zipNo, el.roadAddr)}
                          key={index}
                          className="cursor-pointer"
                        >
                          <td className="pl-[20px] text-left h-[69px] border-b-[1px] font-sans font-normal align-middle  border-[#d5d5d5]">
                            <p className="inline-block font-sans">
                              <span
                                className=" inline-block w-[40px] h-[18px] mr-[13px] align-middle indent-[-99px]"
                                style={{
                                  background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -240px -150px no-repeat`,
                                }}
                              >
                                도로명
                              </span>
                              {el?.roadAddr}
                            </p>
                            <p>
                              <span
                                className=" inline-block w-[40px] h-[18px] mr-[13px] align-middle indent-[-99px]"
                                style={{
                                  background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -280px -150px no-repeat`,
                                }}
                              >
                                지번
                              </span>
                              {el.jibunAddr}
                            </p>
                          </td>
                          <td className=" font-sans font-medium h-[69px] border-[#d5d5d5] border-b-[1px] text-center align-middle py-[14px] text-[#000] text-[14px]">
                            {el.zipNo}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* 페이지네이션 */}
                <Pagination number={number} data={pageData}></Pagination>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
