"use client";
import cartArrow from "../../../../public/ico_cart_arrow_opt.svg";
import btnDel from "../../../../public/ico_basket_delete_20.svg";
import checkBoxS from "../../../../public/ico_checkbox_square_20.svg";
import checkBox from "../../../../public/ico_checkbox_square_s_20.svg";
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
import { getCartData } from "@/app/_lib/getCartData";

export default function CartTable() {
  const queryClient = useQueryClient();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const [controlQuantity, setControlQuantity] = useState<[]>([]);

  //cart items는 2가지가있다. 로그인된경우 되지 않은경우

  const { data: cartItems }: any = useQuery({
    queryKey: ["cart", userInfo?.id || "guest"],
    queryFn: getCartData,
  });

  console.log(cartItems);

  const boxObj = useSelector((state) => state?.cart?.boxObj);
  // const boxObj = [];

  // const controlQuantity = useSelector((state) => state?.cart?.controlQuantity);
  const dispatch = useDispatch();

  const quantityById = () => {
    let arr: any = [];
    cartItems?.forEach((item) => {
      arr = [...arr, { id: item?.id, quantity: item?.quantity }];
    });
    setControlQuantity(arr);
  };
  useEffect(() => {
    quantityById();
  }, [cartItems]);

  // console.log(boxObj);

  const checkToCart = (itemId, option, quantity) => {
    const updatedCartItems = boxObj?.map((item) => {
      if (item.id === itemId && item.option === option) {
        // 해당 아이템의 isChecked 값을 토글합니다.
        return {
          ...item,
          id: itemId,
          option,

          quantity,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });

    // const unCheck =

    // console.log(unCheck);
    dispatch(setBoxObj(updatedCartItems));
    //check가 돼있다면 check를 해제한다.
    //check버
  };

  const updateData = (itemId: number) => {
    //update할때 id를 찾아서 일괄적으로 업데잍르ㅡㄹ한다.

    const updatedControlQuantity = controlQuantity.filter(
      (item: { id: number }) => {
        return item.id === itemId;
      }
    );
    const response = supabase
      .from("cart")
      .update(updatedControlQuantity)
      .eq("id", itemId);

    return response;
  };

  const mutationUpdate = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userInfo?.id || "guest"],
      });
      window.location.reload();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handelButtonAllCheck = () => {
    let arrLength: number = 0;
    let checkLength: number = 0;

    //

    const allCheck = cartItems?.data?.reduce(
      (acc: unknown, curr) => [
        ...acc,
        ...curr?.options.map((option: string, index: number) => ({
          id: curr?.id,
          option,
          product_code: curr?.product_id?.product_code,
          brand: curr?.product_id?.brand,
          front_multiline: curr?.product_id?.front_multiline,
          thumbnail: curr?.product_id?.thumbnail,
          price: curr?.product_id?.price,
          discount: curr?.product_id?.discount,
          quantity: curr.quantity[index],
          isChecked: true,
        })),
      ],
      []
    );

    const notAllCheck = cartItems?.data?.reduce(
      (acc: unknown, curr) => [
        ...acc,
        ...curr?.options.map((option: string, index: number) => ({
          id: curr?.id,
          option,
          product_code: curr?.product_id?.product_code,
          brand: curr?.product_id?.brand,
          front_multiline: curr?.product_id?.front_multiline,
          thumbnail: curr?.product_id?.thumbnail,
          price: curr?.product_id?.price,
          discount: curr?.product_id?.discount,
          quantity: curr.quantity[index],
          isChecked: false,
        })),
      ],
      []
    );

    cartItems?.data?.forEach((el) => {
      el?.options?.forEach((item) => {
        arrLength++;
      });
      // arrLength++;
    });

    boxObj.forEach((el) => {
      if (el.isChecked === true) {
        checkLength++;
      }
    });
    //checked확인

    //모두 체크 해제하기 조건 - 모든 체크가 들어와있으면
    //모든 체크가 들어와있는지 확인하는 방법
    //arr length 를 계산

    //모두 체크하기
    //새로고침할때는 문제

    if (checkLength === arrLength) {
      dispatch(setBoxObj(notAllCheck));
    } else {
      dispatch(setBoxObj(allCheck));
    }
  };

  // const checkToCart = (itemId,item,) => {

  //   //선택된 item을 의 check를 false

  //   //item2sms option을 담고있다.

  //   const singleCheck

  // }

  const handleQuantityUp = (index2: number, itemId: number) => {
    //controlQunatity를 불러온다.
    //quantity에서 변할부분만 변화

    //올리든 내리든 변화가 일어날경우  빨강색으로

    setControlQuantity(
      (prevItemQuantities: [{ id: number; quantity: number[] }]) => {
        return prevItemQuantities.map((item) => {
          if (item.id === itemId) {
            const updatedQuantity = [...item.quantity]; // 배열 복제
            updatedQuantity[index2] = Number(updatedQuantity[index2]) + 1; // 해당 인덱스의 값을 1 증가
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
      }
    );
  };
  const handleQuantityDown = (index2: number, itemId: number) => {
    setControlQuantity(
      (prevItemQuantities: [{ id: number; quantity: number[] }]) => {
        return prevItemQuantities.map((item) => {
          if (item.id === itemId && item.quantity[index2] > 1) {
            const updatedQuantity = [...item.quantity]; // 배열 복제
            updatedQuantity[index2] = Number(updatedQuantity[index2]) - 1; // 해당 인덱스의 값 1 감소
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
      }
    );
  };

  return (
    <table
      className="border-spacing-[0] border-separate w-[100%]
      table-fixed mb-[60px] border-[#171717] border-t-[2px] border-b-[1px]"
    >
      <colgroup>
        <col className="w-[20px]"></col>
        <col></col>
        <col className="w-[80px]"></col>
        <col className="w-[150px]"></col>
        <col className="w-[150px]"></col>
        <col className="w-[130px]"></col>
        <col className="w-[30px]"></col>
      </colgroup>
      <thead>
        <tr>
          {/* 체크박스 */}

          <th
            className="
            h-[68px] font-sans font-medium text-[14px] text-[#000] text-center align-middle
            py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            <span className="w-[20px] h-[20px] leading-[17px] mr-0 inline-block relative">
              <label
                onClick={handelButtonAllCheck}
                className="block relative leading-[17px]"
              >
                {/* checked를 확인했을때 모두 false인 상태면 false 한개라도 true면true  */}
                {boxObj?.filter((el) => {
                  return el?.isChecked === true;
                }).length >
                boxObj?.length - 1 ? (
                  <Image
                    className="top-[0px] left-[1px] absolute"
                    width={20}
                    height={20}
                    alt=""
                    src={checkBox}
                  ></Image>
                ) : (
                  <Image
                    className="top-[0px] left-[1px] absolute"
                    width={20}
                    height={20}
                    alt=""
                    src={checkBoxS}
                  ></Image>
                )}
              </label>
            </span>
            {/* <input></input> */}
          </th>
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
            쿠폰할인
          </th>
          <th
            colSpan={2}
            className="h-[68px] font-medium text-[14px] text-[#000] text-center align-middle py-[25px] border-[#d9d9d9] border-b-[1px]"
          >
            선택
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems?.map((item, index: number) => {
          //checke된 가격만 포함시킨다

          const product_id = [item.product_id];

          let number = 0;
          return item?.options.map((item2, index2: number) => {
            number++;

            const check = boxObj?.find(
              (obj: { id: number; option: string }) => {
                // console.log(
                //   obj?.id === item?.id && obj?.option === item2
                // );

                return obj?.id === item?.id && obj?.option === item2;
              }
            );

            if (item?.options?.length > number) {
              return (
                <tr key={index2}>
                  <td className=" align-top py-[20px] font-sans h-auto text-center border-b-[1px] border-[#f9f9f9] border-t-[0px]">
                    <span className="inline-block relative mr-[50px]">
                      <label
                        onClick={() =>
                          checkToCart(item?.id, item2, item?.quantity[index2])
                        }
                        className=" pl-[28px] block text-[#000] text-[14px] leading-[25px] relative"
                      >
                        {/* id와 option 두개를 이용해서 찾기 */}
                        {check?.isChecked === true ? (
                          <Image
                            className="top-[0px] left-[1px] block absolute"
                            width={20}
                            height={20}
                            alt=""
                            src={checkBox}
                          ></Image>
                        ) : (
                          <Image
                            className="top-[0px] left-[1px] block absolute"
                            width={20}
                            height={20}
                            alt=""
                            src={checkBoxS}
                          ></Image>
                        )}
                        &nbsp;
                      </label>
                    </span>
                  </td>
                  <td
                    className="py-[20px] font-sans h-auto 
                   text-[14px] text-[#000]
                    border-t-[0] text-left flex justify-start items-start  px-[10px]"
                  >
                    <div className="w-[80px] relative mr-[16px] ">
                      <Link href={`/product/${product_id[0]?.product_code}`}>
                        <div className="w-[80px] h-[107px] block relative">
                          <Image
                            width={80}
                            height={106}
                            className="w-[100%] block mr-0 float-none relative"
                            alt=""
                            src={product_id[0]?.thumbnail}
                          ></Image>
                        </div>
                      </Link>
                    </div>

                    <div className="w-[calc(100%-96px)]">
                      <Link
                        className="block"
                        href={`/product/${product_id[0]?.product_code}`}
                      >
                        <p
                          className="font-sans min-h-auto font-medium leading-[18px]
                        text-[14px] text-[#000] w-auto mb-[6px]"
                        >
                          {product_id[0]?.brand}
                        </p>
                        <p
                          className="text-ellipsis mb-[8px] leading-[16px]
                        text-[13px] break-words break-keep whitespace-normal h-[32px] line-clamp-1
                        text-[#000]"
                        >
                          {product_id[0]?.front_multiline}
                        </p>

                        <p
                          className="font-sans text-[12px] text-[#808080] mb-[4px] block overflow-hidden 
                        
                        text-nowrap text-ellipsis align-top leading-[16px]"
                        >
                          옵션: {item2}
                        </p>
                      </Link>

                      <button
                        className="relative inline-block h-[16px] mt-[8px] pr-[12px] border-b-[#333] border-b-[1px] text-[12px] text-[#333]"
                        type="button"
                      >
                        옵션변경
                        <Image
                          alt=""
                          width={8}
                          height={8}
                          className="absolute top-[40%] right-0 block "
                          src={cartArrow}
                        ></Image>
                      </button>
                    </div>
                    {/* <div className="w-[calc(100% - 96px)]"></div> */}
                  </td>
                  <td className="py-[14px] text-center h-auto border-t-[1px] border-[#f9f9f9] border-b-[1px] align-middle font-sans  text-[14px] text-[#000]">
                    <div
                      className="w-[45px] h-[25px] my-0 mx-auto
                   border-[1px] border-[#dfdfdf] relative pr-[18px]   
                    "
                    >
                      <button
                        onClick={() => handleQuantityUp(index2, item.id)}
                        type="button"
                        style={{
                          background: `url(https://i.ibb.co/kHDX23R/spr-bag.png) 7px -46px no-repeat`,
                        }}
                        className="w-[19px] h-[11px] top-0 right-0 absolute border-[#dfdfdf] leading-[99em] border-b-[1px] overflow-hidden align-top"
                      ></button>

                      {/* 수량 결정 */}
                      <input
                        value={Number(controlQuantity[index]?.quantity[index2])}
                        readOnly={true}
                        onChange={(e) => e.target.value}
                        disabled={true}
                        className={`${
                          controlQuantity[index]?.quantity[index2] >
                          Number(item.quantity[index2])
                            ? "text-[red]"
                            : ""
                        }   w-[23px] cursor-text  h-[23px] border-[#dfdfdf] border-r-[1px] text-[12px] text-center leading-normal align-top m-0 p-0 bg-[#fff]`}
                      ></input>

                      <button
                        onClick={() => handleQuantityDown(index2, item.id)}
                        type="button"
                        style={{
                          background: `url(https://i.ibb.co/kHDX23R/spr-bag.png) -43px -46px no-repeat  `,
                        }}
                        className="w-[19px] h-[11px] top-auto absolute bottom-0 right-0 leading-[99em] overflow-hidden align-top"
                      ></button>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          controlQuantity[index]?.quantity[index2] >
                          Number(item.quantity[index2])
                        ) {
                          const check = confirm("수량을 변경하시겠습니까?");
                          if (check) {
                            mutationUpdate.mutate(item.id);
                          }
                          return;
                        } else {
                          alert("수량이 변경되지 않았습니다.");
                        }
                      }}
                      type="button"
                      className={`${
                        controlQuantity[index]?.quantity[index2] >
                        Number(item.quantity[index2])
                          ? "text-[black]"
                          : ""
                      } text-[#d9d9d9] min-w-[45px] mt-[6px] h-[20px] p-0 border-[#c4c4c4] border-[1px] leading-[20px] text-[12px] text-center bg-[#fff] font-sans inline-block`}
                    >
                      변경
                    </button>
                  </td>
                  <td className="py-[14px] text-center h-auto border-t-[1px] border-[#f9f9f9] border-b-[1px]">
                    <div className="text-[14px] font-sans text-[#000] leading-[20px] relative">
                      <em className="text-[12px] text-[#c4c4c4] line-through block leading-[14px] mb-[2px]">
                        {product_id[0]?.price?.toLocaleString()} 원
                      </em>
                      <strong className="text-[16px] font-sans font-light">
                        {(
                          product_id[0]?.price *
                          (1 - product_id[0]?.discount / 100)
                        ).toLocaleString()}
                      </strong>
                      원
                    </div>
                  </td>
                  <td className="py-[14px] text-center h-auto border-t-[1px] border-[#f9f9f9] border-b-[1px]">
                    <div className="flex justify-center items-center flex-col gap-[4px]">
                      <button
                        className="text-[#000] min-w-[56px] text-[11px] leading-[22px] text-center h-[24px] border-[#000] border-[1px] "
                        type="button"
                      >
                        <span>쿠폰받기</span>
                      </button>
                    </div>
                  </td>
                  <td className="py-[14px] text-center h-auto border-t-[1px] border-[#f9f9f9] border-b-[1px]">
                    <div className=" flex gap-[4px] justify-center items-center flex-col ">
                      <button
                        className="border-[1px] border-[#c4c4c4] text-[#333] h-[40px] min-w-[110px] text-center p-0"
                        type="button"
                      >
                        바로구매
                      </button>
                      <button
                        className="border-[1px] border-[#c4c4c4] text-[#333] h-[40px] min-w-[110px] text-center p-0"
                        type="button"
                      >
                        선물하기
                      </button>
                    </div>
                  </td>
                  <td className="py-[14px] text-center h-auto border-t-[1px] border-[#f9f9f9] border-b-[1px]">
                    <div className=" flex gap-[4px] justify-center items-center flex-col ">
                      <button
                        className="w-[20px] h-[20px] relative"
                        type="button"
                      >
                        <Image
                          className=" absolute top-[30%] inline-block"
                          width={11}
                          height={11}
                          alt=""
                          src={btnDel}
                        ></Image>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
            if (number >= item.options.length) {
              // console.log("칸나누기");
              let totalCost: number = 0;
              let shipCost: number = 0;
              item?.quantity.forEach((el) => {
                totalCost =
                  totalCost +
                  el *
                    product_id[0]?.price *
                    (1 - product_id[0]?.discount / 100);
              });

              // console.log(totalCost);

              if (totalCost <= 40000) {
                shipCost = 3000;
              }

              return (
                <tr key={item.id}>
                  <td
                    colSpan={7}
                    className="p-0 border-[0] text-center h-auto
border-[#f9f9f9] border-b-[1xp] align-top font-sans text-[#000] font-[14px] border-t-[1px]"
                  >
                    <div className="flex justify-end py-[14px] px-[44px] text-[16px] leading-[24px] text-[#000] gap-[20px] bg-[#f9f9f9] ">
                      <p className="inline-block">
                        <span>{totalCost.toLocaleString()}</span>원 +
                        <span>{shipCost} </span>
                        원(배송비) =
                        <span className="font-sans font-medium">
                          {(shipCost + totalCost).toLocaleString()}
                        </span>
                        원
                      </p>
                    </div>
                  </td>
                </tr>
              );
            }
          });
        })}
      </tbody>
    </table>
  );
}
