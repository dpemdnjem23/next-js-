"use client";
import { setSelectOption, setShowOption } from "@/reducers/slices/ProductSlice";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../_lib/getProductData";

export default function SelectOptions({ product }) {
  const params = useParams();
  const dispatch = useDispatch();
  const selectOption = useSelector((state) => state?.product?.selectOption);

  const showOption = useSelector((state) => state?.product?.showOption);


  const handleSelectOption = (el: string, index: number) => {
    //option을 추가한다. 기존에 옵션이 있다면 추가하지 않는다.
    const newItem = {
      index,
      quantity: 1,
      name: el,
      price: product?.price * (1 - product?.discount / 100),
    };
    const isDuplicate = selectOption.some(
      (item) => item.index === newItem.index
    );

    if (isDuplicate) {
      alert("이미 추가된 상품입니다. \n\n 주문수량을 조정해주시기 바랍니다.");
      setShowOption(false);

      return;
    }

    dispatch(setSelectOption([...selectOption, newItem]));

    dispatch(setShowOption(false));
  };

  const handleShowOption = () => {
    if (showOption) {
      dispatch(setShowOption(false));
    } else {
      dispatch(setShowOption(true));
    }
  };

  // console.log(product);

  return (
    <Fragment>
      <select className="hidden">
        <option value="00">선택해 주세요 </option>
      </select>
      <div onClick={(e) => e.stopPropagation()}>
        <div
          onClick={handleShowOption}
          className={`outline-none h-[40px] ${
            showOption
              ? "bg-[#fff] border-[#000]"
              : "bg-[#f2f2f2] border-[#f2f2f2]"
          }
      
      border-[1px]
      leading-[38px] text-[#010101] text-[14px] font-sans indent-[20px] block relative `}
        >
          <span className=" block h-[38px] overflow-hidden whitespace-nowrap text-ellipsis pr-[25.5px]">
            선택해 주세요
          </span>
          <div
            className="absolute w-[11px] top-[17px] right-[20px] h-[7px] "
            style={{
              background: `url(https://static.wconcept.co.kr/web/images/common/spr-input.png) 0 -60px no-repeat  `,
            }}
          ></div>
        </div>
        {showOption ? (
          <ul className="h-[202px] absolute w-[100%] border-[1px] border-[#000] overflow-y-auto z-[10] overflow-hidden bg-[#fff] block top-[45px] left-0">
            <li onClick={handleShowOption} className="hover:bg-[#e6e6e6]">
              <button
                className="bloc leading-[40px] h-[40px] text-[#000] text-[14px] font-sans px-[19px] text-ellipsis 
               overflow-hidden break-normal align-middle
              whitespace-nowrap "
                type="button"
              >
                선택해 주세요.
              </button>
            </li>
            {product?.option?.size.map((el, index: number) => {
              return (
                <li
                  onClick={() => handleSelectOption(el, index)}
                  className="hover:bg-[#e6e6e6]"
                  key={index}
                >
                  <button
                    className="bloc leading-[40px] h-[40px] text-[#000] text-[14px] font-sans px-[19px] text-ellipsis 
               overflow-hidden break-normal align-middle 
              whitespace-nowrap "
                    type="button"
                  >
                    {el}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Fragment>
  );
}
