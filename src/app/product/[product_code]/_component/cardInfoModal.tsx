"use client";

import { useState } from "react";
import btnDel from "../../../../../public/btn_del_12.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setCardInfoModal } from "@/reducers/slices/ProductSlice";

//
const cardInfo = [
  { name: "우리카드", data: "2~4개월(5만원↑)" },
  { name: "롯데카드", data: "2~3개월(5만원↑)" },
  { name: "현대카드", data: "2~3개월(5만원↑)" },
  { name: "국민카드", data: "2~3개월(5만원↑)" },
  { name: "비씨카드", data: "2~4개월(5만원↑)" },
  { name: "삼성카드", data: "2~3개월(5만원↑)" },
  { name: "W컨셉 삼성카드", data: "2~3개월(5만원↑)" },
  { name: "신한카드", data: "2~3개월(5만원↑)" },
  { name: "하나카드", data: "2~3개월(5만원↑)" },
  { name: "농협카드", data: "2~4개월(5만원↑)" },
];

const partialCardInfo = [
  {
    name: "우리카드",
    data: "10개월 (1~3회차 고객부담) \n 12개월(1~4회차 고객부담)",
  },
  {
    name: "국민카드",
    data: "6개월 (1~3회차 고객부담) \n 10개월 (1~5회차 고객부담)",
  },
  {
    name: "비씨카드",
    data: "10개월 (1~3회차 고객부담) \n 12개월 (1~4회차 고객부담)",
  },
  ,
  {
    name: "삼성카드",
    data: "7개월 (1~3회차 고객부담) \n 11개월 (1~5회차 고객부담)",
  },
  ,
  {
    name: "W컨셉 삼성카드",
    data: "7개월 (1~3회차 고객부담) \n 10개월 (1~5회차 고객부담)",
  },
  {
    name: "신한카드",
    data: "10개월 (1~4회차 고객부담) \n 12개월 (1~5회차 고객부담)",
  },
  {
    name: "하나카드",
    data: "6개월 (1~3회차 고객부담) \n 10개월 (1~4회차 고객부담) \n 12개월 (1~5회차 고객부담)",
  },
  {
    name: "농협카드",
    data: "5개월 (1~2회차 고객부담) \n 6개월 (1~2회차 고객부담)\n 7개월 (1~3회차 고객부담)\n 8개월 (1~3회차 고객부담)\n 9개월 (1~3회차 고객부담)\n 10개월 (1~3회차 고객부담)",
  },
];

export default function CardInfoModal() {
  //옵션 이 있을때 구매가 가능하도록한다.
  const [tab, setTab] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleTab = () => {
    setTab(true);
  };
  const handleTabFalse = () => {
    setTab(false);
  };

  const handleCardModalOut = () => {
    dispatch(setCardInfoModal(false));
  };

  console.log(tab);

  return (
    <div
      onClick={handleCardModalOut}
      className="w-[100%] h-[100%] top-0 left-0  fixed flex z-[101] justify-center items-center bg-[rgba(0,0,0,0.4)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed z-[110] min-w-[480px] overflow-hidden
      border-[1px] border-[#000] bg-[#fff] w-[520px] h-[478px] px-[40px] pt-[40px] pb-[50px]      "
      >
        <div className=" flex justify-between">
          <h2 className="text-[#333] font-sans text-[24px]">무이자 할부</h2>
          <button
            onClick={handleCardModalOut}
            className=" w-[54px]  h-[54px] mb-[30px] mt-[-10px] p-[15px] overflow-hidden "
            type="button"
          >
            <Image
              alt=""
              className="block text-center"
              width={24}
              height={24}
              src={btnDel}
            ></Image>
          </button>
        </div>
        {/* 이자탭 */}
        <ul className=" overflow-hidden mb-[20px]">
          <li
            className={`${
              tab ? "border-[#b5b5b5]" : "border-[#000]"
            } float-left w-[50%] border-[1px] overflow-hidden `}
          >
            <button
              onClick={handleTabFalse}
              className={`${tab ? "" : "bg-[#000] text-[#fff]"}
                      w-[100%] h-[38px] leading-[40px] font-medium text-[14px]

                      `}
              type="button"
            >
              무이자 할부
            </button>
          </li>
          <li
            className={`${
              tab ? "border-[#000]" : " border-[#b5b5b5]"
            } float-left w-[50%] border-[1px] `}
          >
            <button
              onClick={handleTab}
              className={`${tab ? "bg-[#000] text-[#fff]" : ""}
                           w-[100%] h-[38px] leading-[40px] font-medium text-[14px]
     
                           `}
              type="button"
            >
              부분 무이자
            </button>
          </li>
        </ul>
        {/* 무이자 할부 */}
        {!tab ? (
          <div className="border-[#000] border-t-[2px] ">
            <div className=" relative max-h-[245px] overflow-y-scroll border-[#000] border-b-[1px]">
              <table>
                <colgroup>
                  <col className="w-[135px]"></col>
                </colgroup>
                <tbody className=" ">
                  {cardInfo.map(
                    (el: { name: string; data: string }, index: number) => {
                      return (
                        <tr key={index}>
                          <th className="pl-0 font-normal text-[#333] text-center h-[68px] text-[14px]">
                            {el.name}
                          </th>
                          <td className="py-[12px] px-0 leading-[1.6] min-h-[69px] text-[14px] text-[#333]">
                            {el.data}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <ul className=" mt-[20px]">
              <li className=" relative pl-[11px] text-[#333] text-[12px]">
                무이자 할부는 결제 금액 기준으로 적용됩니다.
              </li>
            </ul>
          </div>
        ) : (
          // {/* 부분 무이자 할부 */}

          <div className="border-[#000] border-t-[2px] ">
            <div className=" relative max-h-[245px] overflow-y-scroll border-[#000] border-b-[1px]">
              <table>
                <colgroup>
                  <col className="w-[135px]"></col>
                </colgroup>
                <tbody>
                  {partialCardInfo.map(
                    (el: { name: string; data: string }, index: number) => {
                      return (
                        <tr key={index}>
                          <th className="pl-0 font-normal text-[#333] text-center h-[68px] text-[14px]">
                            {el.name}
                          </th>
                          <td className="py-[12px] whitespace-pre-line  px-0 leading-[1.6] min-h-[69px] text-[14px] text-[#333]">
                            {el.data}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <ul className=" mt-[20px]">
              <li className=" relative pl-[11px] text-[#333] text-[12px]"></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
