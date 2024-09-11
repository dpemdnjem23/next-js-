"use client";
import { setIsClicked, setPageNum } from "@/reducers/slices/OrderSlice";
import { setIsLoading } from "@/reducers/slices/UserSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const auth = process.env.NEXT_PUBLIC_AUTH_POST;

type props = {
  data: string;
  number: string;
};
export default function Pagination({ data, number }: props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const pageNumberToShow = 5;

  const pageNum = useSelector((state) => state?.order?.pageNum);
  const addressData = queryClient.getQueryData([data, pageNum]);

  const totalPage: number = Math.ceil(addressData[0] / 10);
  // const totalPage: number = 18;

  //리로딩 시키고싶다면 querykey자체를 변경하는것도 방법이다.
  const handleToPageFirst = async () => {
    dispatch(setPageNum(1));
    await queryClient.invalidateQueries({
      queryKey: [data, pageNum[number]],
    });
  };
  const handleToPageLast = async () => {
    const newState = { ...pageNum, [number]: totalPage };
    dispatch(setPageNum(newState));

    await queryClient.invalidateQueries({
      queryKey: [data, pageNum[number]],
    });
  };

  const handlePageUp = async () => {
    const newState = { ...pageNum, [number]: pageNum + 1 };

    dispatch(setPageNum(newState));
    await queryClient.invalidateQueries({
      queryKey: [data, pageNum[number]],
    });
  };

  const handlePageDown = async () => {
    const newState = { ...pageNum, [number]: pageNum - 1 };

    if (pageNum > 1) {
      dispatch(setPageNum(newState));

      await queryClient.invalidateQueries({
        queryKey: [data, pageNum[number]],
      });
    }
  };

  const handlePageNum = async (el: number) => {
    //데이터를 넘겨줘야한다.
    const newState = { ...pageNum, [number]: el };

    dispatch(setPageNum(newState));
    // dispatch(setIsClicked(true));
    // dispatch(setIsLoading(true)); // 로딩 상태 설정

    await queryClient.invalidateQueries({
      queryKey: [data, pageNum[number]],
    });
    // await queryClient.refetchQueries({
    //   queryKey: ["addressData",],
    //   type: "active",
    // });
    //   // await refetch();
    // );
  };

  // const arr = Array.from({ length: num }, (_, index) => index + 1);

  //1 2 3 4 5 가 있는데 startIndex 가 6이되면
  const generatePageNumber = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      Math.floor((pageNum[number] - 1) / pageNumberToShow) * pageNumberToShow +
        1
    );
    const endPage = Math.min(startPage + pageNumberToShow - 1, totalPage);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  //page 가 총갯수

  // console.log(pageNum);
  console.log(pageNum[number]);

  return (
    <ul className=" table my-[20px] text-[0px] mx-auto text-center font-sans">
      <li className="ml-[23px] m-0 relative table-cell w-[33px] leading-[22px] align-text-top">
        <a
          onClick={handleToPageFirst}
          style={{
            background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) 0px -30px no-repeat`,
          }}
          className="w-[12px] left-auto right-[7px]
          cursor-pointer block font-light text-[14px] text-center
          overflow-hidden indent-[-9999px] h-[11px] absolute top-0 mt-[3px]"
        ></a>
      </li>

      <li className="first ml-[23px] m-0 relative table-cell w-[33px] leading-[22px] align-text-top">
        <a
          onClick={handlePageDown}
          className="w-[6px] left-auto right-[7px]
                    cursor-pointer block font-light text-[14px] text-center
                    overflow-hidden indent-[-9999px] h-[11px] absolute top-0 mt-[3px]"
          style={{
            background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -30px -30px no-repeat`,
          }}
        ></a>
      </li>

      {generatePageNumber().map((pageNumber, index) => {
        return (
          <li
            className={`table-cell w-[33px] leading-[22px] h-[22px] align-text-top`}
            key={pageNumber}
            onClick={() => handlePageNum(pageNumber)}
          >
            <a
              className={`tracking-[-0.01em] cursor-pointer mx-[5px] 
            ${pageNumber === pageNum[number] ? "font-bold" : " font-light"} 
             text-[#000] block text-[14px] text-center leading-[16px]`}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}

      <li className="ml-[23px] m-0 relative table-cell w-[33px] leading-[22px] align-text-top">
        <a
          onClick={handlePageUp}
          style={{
            background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -60px -30px no-repeat`,
          }}
          className="w-[6px] left-auto right-[7px]
          cursor-pointer block font-light text-[14px] text-center
          overflow-hidden indent-[-9999px] h-[11px] absolute top-0 mt-[3px]"
        ></a>
      </li>

      <li className="ml-[23px] m-0 relative table-cell w-[33px] leading-[22px] align-text-top">
        <a
          onClick={handleToPageLast}
          style={{
            background: `url(https://i.ibb.co/JQ1djD8/spr-common.png) -90px -30px no-repeat`,
          }}
          className="w-[12px] left-auto right-[7px]
          cursor-pointer block font-light text-[14px] text-center
          overflow-hidden indent-[-9999px] h-[11px] absolute top-0 mt-[3px]"
        ></a>
      </li>
    </ul>
  );
}
