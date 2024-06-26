"use client";
import { supabase } from "@/lib";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { response } from "express";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ClaimButton from "./component/claimButton";

export default function Claim() {
  const { order_code } = useParams();

  const fetchData = async () => {
    const response = await supabase
      .from("payment")
      .select()
      .eq("order_id", order_code)
      .order("created_at", { ascending: false });

    return response;
  };
  // useQuery를 사용하지않고

  //데이터는 캐쉬 유지를 1시간 정도한다 -> 1시간 이후엔 데이터가 오래된것으로 간주
  //데이터가 오래됐으면 삭제
  const {
    data: cancelItems,
    isError,
    error,
  } = useQuery({
    queryKey: ["cancel"],
    queryFn: fetchData,
    staleTime: 3600 * 60,
    gcTime: 3600 * 60,
  });

  if (isError) {
    throw error;
  }

  return (
    <div className="w-[1240px] mx-auto">
      <div className=" h-[41px] relative">
        <h3
          className="text-[#000] font-normal text-[24px] leading-[36px] inline-block absolute
  top-0 left-0
"
        >
          취소신청
        </h3>
      </div>

      <div className="block">
        <table className="border-[#171717] border-t-[2px] border-b-[1px] mb-[60px]">
          <colgroup>
            <col className="w-[50px]"></col>
            <col className="w-[400px]"></col>
            <col className="w-[125px]"></col>

            <col className="w-[150px]"></col>
            <col className="w-[280px]"></col>
          </colgroup>
          <thead>
            <tr>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                선택
              </th>

              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                상품정보
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                상품금액
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                수량
              </th>
              <th className=" h-[68px] p-0 text-[14px] font-medium text-[#000] text-center align-middle border-[#b5b5b5] border-b-[1px]">
                취소 사유 선택
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {cancelItems?.data?.length >= 1 ?

            <td
                className=" text-[13px] text-[#333] h-[68px] font-normal text-center align-middle py-[14px]"
                colSpan={7}
              >
               최근 주문내역이 없습니다.
              </td>
              <td>




              </td>:
               */}

            {cancelItems?.data?.map((el, cancelIndex: number) => {
              const orders = el.items;

              console.log(orders, el.order?.item);

              return orders.map((el2, index: number) => {
                const order = JSON.parse(el2);

                return (
                  <tr key={index}>
                    {/* 1번째에만 row span이 달려야한다. */}
                    <td
                      className={`
                      ${
                        cancelIndex >= 1
                          ? "border-[#d9d9d9] border-t-[1px]"
                          : ""
                      }

                         ${index === 0 ? "" : "border-t-[1px] border-[#d9d9d9]"}

                      py-[14px]
                      text-[#666] h-[68px] text-center align-middle font-sans text-[14px]`}
                    >
                      <div
                        style={{
                          background:
                            "url(https://i.ibb.co/zPQyzrN/spr-input.png) -60px -60px no-repeat",
                        }}
                        className=" w-[20px] h-[20px] text-center mx-auto"
                      ></div>
                    </td>

                    <td
                      className={`
                      ${
                        cancelIndex >= 1
                          ? "border-[#d9d9d9] border-t-[1px]"
                          : ""
                      }

                         ${index === 0 ? "" : "border-t-[1px] border-[#d9d9d9]"}

                    py-[14px] align-top text-left text-[14px] pl-[20px] text-[#000] h-[68px]`}
                    >
                      <Link
                        className="block overflow-hidden text-[#000] align-middle"
                        href={"#"}
                      >
                        <Image
                          width={60}
                          height={80}
                          alt=""
                          className=" block float-left mr-[20px] "
                          src={order.thumbnail}
                        ></Image>
                        <div className=" relative mb-[2px] ml-[80px]">
                          <p
                            className="
                          block overflow-hidden whitespace-nowrap text-ellipsis align-top
                          mb-[6px] leading-normal text-[14px] text-[#000] w-auto min-h-auto "
                          >
                            {order.brand}
                          </p>
                          <p className="mb-[10px] leading-normal block overflow-hidden whitespace-nowrap text-ellipsis text-[#808080] text-[12px] align-top">
                            {order.front_multiline}
                          </p>
                          <p className="mb-[4px] leading-normal block overflow-hidden whitespace-nowrap text-ellipsis text-[#808080] text-[12px] align-top">
                            옵션: {order.option}
                          </p>
                        </div>
                      </Link>
                      {/* {el.product_name} */}
                    </td>
                    <td
                      className={`
                      ${
                        cancelIndex >= 1
                          ? "border-[#d9d9d9] border-t-[1px]"
                          : ""
                      }

                      ${index === 0 ? "" : "border-t-[1px] border-[#d9d9d9]"}

                    py-[14px] text-[16px] align-middle text-center text-[#333] h-[68px]`}
                    >
                      {(
                        order?.price *
                        (1 - order?.discount / 100) *
                        order?.quantity
                      ).toLocaleString()}
                    </td>

                    <td
                      className={`
                      ${
                        cancelIndex >= 1
                          ? "border-[#d9d9d9] border-t-[1px]"
                          : ""
                      }

              ${index === 0 ? "" : "border-t-[1px] border-[#d9d9d9]"}

                    px-[14px] align-middle text-center text-[#333] h-[68px]`}
                    >
                      {order?.quantity}
                    </td>
                    <td
                      className={`
                      ${
                        cancelIndex >= 1
                          ? "border-[#d9d9d9] border-t-[1px]"
                          : ""
                      }
                     ${index === 0 ? "" : "border-t-[1px] border-[#d9d9d9]"}

                    py-[14px] text-[16px] align-middle text-center text-[#333] h-[68px]`}
                    >
                      <div
                        className={`outline-none h-[35px]

                      border-[1px] bg-[#f2f2f2] border-[#f2f2f2]
                      leading-[35px] text-[#010101] text-[13px] font-sans indent-[20px] block relative `}
                      >
                        <span className=" block h-[38px] overflow-hidden whitespace-nowrap text-ellipsis text-left">
                          구매의사 없음
                        </span>
                        <div
                          className="absolute w-[11px] top-[13px] right-[20px] h-[7px] "
                          style={{
                            background: `url(https://static.wconcept.co.kr/web/images/common/spr-input.png) 0 -60px no-repeat  `,
                          }}
                        ></div>
                      </div>
                    </td>

                    {/* <td>{ el.}</td> */}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>

      <ClaimButton></ClaimButton>
    </div>
  );
}
