"use client";
import cartArrow from "../../../../../public/ico_cart_arrow_opt.svg";
import btnDel from "../../../../../public/ico_basket_delete_20.svg";
import checkBoxS from "../../../../../public/ico_checkbox_square_20.svg";
import checkBox from "../../../../../public/ico_checkbox_square_s_20.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Cart,
  setBoxObj,
  setControlQuantity,
} from "@/reducers/slices/CartSlice";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib";
import { useParams, useRouter } from "next/navigation";

import CartItem from "@/app/cart/cartItem";
import { getOrderData } from "../_lib/getOrderData";
import Loading from "@/app/_lib/loading";

export default function OrderTable() {
  const queryClient = useQueryClient();
  // let totalCost: number = 0;
  const params = useParams();

  const [controlQuantity, setControlQuantity] = useState<[]>([]);
  // const cartItems = [];

  // const controlQuantity = useSelector((state) => state?.cart?.controlQuantity);
  const dispatch = useDispatch();

  // const orderData = async () => {
  //   const response = await getOrderData(params);

  //   console.log(response, "response");

  //   // return JSON.stringify(response);
  //   return response;
  // };

  // orderData();

  // console.log(orderData()); ''
  // console.log(getOrderData(params));

  const {
    data: cartItems,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders", params.order_code],
    queryFn: getOrderData,
    staleTime: 1000 * 60 * 30, //30분간만 캐시를 유지하고 삭제
    gcTime: 1000 * 60 * 30,
  });

  if (isError) {
    throw Error(error);
  }

  // const cartItems = queryClient.getQueryData(["order"]);
  // cartItems?.forEach((item) => {
  //   if (item.option !== "end" && item.isChecked) {
  //     // 이 부분에서 상품의 가격을 추가로 가져와서 총 비용을 계산할 수 있습니다.
  //     // 아래는 간단한 예시로 quantity만을 사용하여 총 비용을 계산합니다.
  //     totalCost +=
  //       item?.price * (1 - item?.discount / 100) * parseInt(item?.quantity);
  //   }
  // });


  
  return (
    <table
      className="w-[100%]
      table-fixed mb-[60px] border-[#171717] border-t-[2px] border-b-[1px]"
    >
      <colgroup>
        <col></col>
        <col className="w-[115px]"></col>
        <col className="w-[150px]"></col>
        <col className="w-[135px]"></col>
        <col className="w-[150px]"></col>
      </colgroup>
      <thead>
        <tr>
          {/* 체크박스 */}

          <th
            className=" 
              border-separate border-spacing-[0] w-[100%]
              font-medium h-[68px] text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            상품정보
          </th>

          <th
            className="
              border-separate border-spacing-[0] w-[100%]

            h-[68px] font-medium text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            수량
          </th>
          <th
            className="
              border-separate border-spacing-[0] w-[100%]

              h-[68px] font-medium text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            가격
          </th>
          <th
            className="
                             border-separate border-spacing-[0] w-[100%]

            h-[68px] font-medium text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            총 상품 금액
          </th>
          <th className="w-[100%] h-[68px] font-medium text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]">
            배송비
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems?.[0]?.item?.map((items, index: number) => {
          //checke된 가격만 포함시킨다

          
          const item = JSON.parse(items);

          console.log(item);

          return (
            <tr key={item.id}>
              <td
                className="py-[20px] font-sans h-auto 
                   text-[14px] text-[#000]
                    border-t-[0] text-left flex justify-start items-start  px-[10px]"
              >
                <div className="w-[90px] mr-[20px] ">
                  <Link
                    href={{
                      pathname: `/product/${item?.product_code}`,
                    }}
                  >
                    <div className="w-[90px] h-[120px] block relative">
                      <Image
                        width={90}
                        height={120}
                        className="w-[100%] block mr-0 float-none relative"
                        alt=""
                        src={item?.thumbnail}
                      ></Image>
                    </div>
                  </Link>
                </div>

                <div className="w-[calc(100%-96px)]">
                  <Link
                    className="block"
                    href={`/product/${item?.product_code}`}
                  >
                    <p
                      className="font-sans min-h-auto font-medium leading-[18px]
                        text-[14px] text-[#000] w-auto mb-[6px]"
                    >
                      {item?.brand}
                    </p>
                    <p
                      className="text-ellipsis mb-[8px] leading-[16px]
                        text-[13px] break-words break-keep whitespace-normal h-[32px] line-clamp-1
                        text-[#000]"
                    >
                      {item?.front_multiline}
                    </p>

                    <p
                      className="font-sans text-[12px] text-[#808080] mb-[4px] block overflow-hidden 
                        
                        text-nowrap text-ellipsis align-top leading-[16px]"
                    >
                      옵션: {item?.option}
                    </p>
                  </Link>
                </div>
                <div className="w-[calc(100% - 96px)]"></div>
              </td>
              <td className="py-[14px] text-center h-auto border-[#f9f9f9] align-middle font-sans  text-[14px] text-[#000]">
                {item?.quantity}
              </td>
              <td className="py-[14px] text-center h-auto  border-[#f9f9f9] ]">
                <div className="text-[14px] font-sans text-[#000] leading-[20px] relative">
                  <em className="text-[12px] text-[#c4c4c4] line-through block leading-[14px] mb-[2px]">
                    {item?.price?.toLocaleString()} 원
                  </em>
                  <strong className="text-[16px] font-sans font-light">
                    {(
                      item?.price *
                      (1 - item?.discount / 100)
                    ).toLocaleString()}
                  </strong>
                  원
                </div>
              </td>
              <td
                className="py-[14px] text-center
                  text-[16px]
                  h-auto border-[#f9f9f9] "
              >
                <div className="flex justify-center items-center flex-col gap-[4px]">
                  <strong className=" text-[16px] font-normal">
                    {(
                      item?.price *
                      (1 - item?.discount / 100) *
                      Number(item?.quantity)
                    ).toLocaleString()}
                    원
                  </strong>
                </div>
              </td>
              <td className="py-[14px] text-center h-auto  border-[#f9f9f9]">
                무료배송
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
