"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import bgPlus from "../../../../public/bg-plus.gif";
import bgAmount from "../../../../public/bg-amount.gif";
import btnDel from "../../../../public/btn_del_12.svg";
// import { Post } from "@/model/Post";
import { useParams } from "next/navigation";
import { supabase } from "@/lib";
import Image from "next/image";
import Slide from "./_component/slide";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch, useSelector } from "react-redux";

import {
  clearOption,
  setCardInfoModal,
  setIsImage,
  setPointsInfoModal,
  setProduct,
  setSelectOption,
  setShowOption,
} from "@/reducers/slices/ProductSlice";

import ButtonBox from "./_component/button";
import Description from "./_component/description";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductData } from "./_lib/getProductData";
import SelectOptions from "./_component/selectOptions";
import Loading from "@/app/_lib/loading";

type props = {
  id: number;
  created_at: TimeRanges;
  brand: any;

  front: string;
  front_multiline: string;

  price: number;

  discount: number;

  option: size;
  general_info: JSON;
  category_id: number;
  imageArr: image;
  image: string[];

  product_code: number;

  thumbnail: string;
};
type size = {
  size: string[];
};

type image = {
  image: string[];
};

export default function ProductDetail() {
  // const [product, setProduct] = useState<props>();

  const params = useParams();

  const { product_code }: any = params;

  //option창을 여는것

  // const product = useSelector((state) => state?.product.product);

  //option창을 열고 option 선택했을때 option엔 price, quantity, name

  //imageArr  갯수만큼 id가 생성되어야 한다.
  const [isActive, setIsActive] = useState<any>({ 0: true });
  // const selectedImage = useSelector(
  //   (state: { product: string }) => state?.product.image
  // )
  const dispatch = useDispatch();
  const selectOption = useSelector((state) => state?.product?.selectOption);
  
  useEffect(() => {
    
dispatch(clearOption())
    
  },[])

  
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", product_code],
    // staleTime: 1000 * 60 * 30,
    // gcTime: 1000 * 60 * 30,
  });
  

  if (isLoading) {
    return <Loading></Loading>;
  }

  //클릭하면 active 변화를주어 css변화를 준다.
  //active 된 이미지를 메인화면에 띄워준다.

  const handleImageClick = (index: any) => {
    // setIsActive((prevState: any) => ({
    //   ...prevState,
    //   [index]: !prevState[index],
    // }));

    //이게 먼저 업데이트 되도록한다.
    setIsActive((prevState: any) => {
      const updatedState: any = {}; // 업데이트된 상태를 저장할 객체

      // 모든 인덱스의 상태를 비활성화로 설정
      Object.keys(prevState).forEach((key) => {
        updatedState[key] = false;
      });

      // 클릭된 인덱스의 상태를 토글
      updatedState[index] = true;

      return updatedState;
    });

    dispatch(setIsImage(product?.imageArr[findTrueKeys2()]));
  };

  const findTrueKeys2 = () => {
    let trueKeys: any = null;
    const isActive: any = { 0: true };

    for (const key in isActive) {
      if (isActive[key] === true) {
        trueKeys = key;
      }
    }

    return trueKeys;
  };

  const findTrueKeys = () => {
    let trueKeys: any = null;

    for (const key in isActive) {
      if (isActive[key] === true) {
        trueKeys = key;
      }
    }

    return trueKeys;
  };

  //재고를 고려해서 quantity값

  //quantity를 조정할수 있어야한다.

  //카드안내, 포인트 안내 modal만들기

  //option창을 만들기

  //삭제
  const handleDeleteOption = (index: number) => {
    const updatedItems = selectOption.filter((item) => item.index !== index);

    dispatch(setSelectOption(updatedItems));
  };

  //버튼을 클릭하여 수량을 조절한다. 수량은 stock을 따른다. stock은

  const handleQuantityUp = (index: number) => {
    //index에 해당하는 quantity 수량을 조절한다.

    const item = selectOption.map(
      (item: { index: number; quantity: number }) => {
        if (item.index === index) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }
    );

    dispatch(setSelectOption(item));
  };
  const handleQuantityDown = (index: number) => {
    //index에 해당하는 quantity 수량을 조절한다.

    const item = selectOption.map(
      (item: { index: number; quantity: number }) => {
        if (item.index === index) {
          console.log({ ...item });
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      }
    );
    dispatch(setSelectOption(item));
  };

  const handlePointsModalOn = () => {
    dispatch(setPointsInfoModal(true));
  };

  const handleCardModalOn = () => {
    dispatch(setCardInfoModal(true));
  };

  const handleShowOptionFalse = () => {
    dispatch(setShowOption(false));
  };
  return (
    <div
      onClick={handleShowOptionFalse}
      className="relative w-[1240px] pt-[40px] my-0 mx-auto"
    >
      <div
        className="relative w-[1240px] mt-[20px]
       after:clear-both after:block
      "
      >
        <div className="relative">
          <div className="left float-left w-[520px] relative">
            <div className="relative mb-[30px]">
              <div className="w-[100%] h-[700px]  relative">
                <Image
                  className="w-100% h-100%"
                  height={700}
                  width={525}
                  alt=""
                  src={product?.imageArr?.[findTrueKeys()]}
                ></Image>
              </div>
              <div className="mt-[20px] h-[80px] overflow-hidden">
                <ul className="max-w-[520px]">
                  {product?.imageArr?.map((el: string, index: number) => {
                    return (
                      <li
                        onClick={() => handleImageClick(index)}
                        className="mr-[18px] float-left cursor-pointer"
                        key={index}
                      >
                        <div
                          className={` ${
                            !isActive[index] ? "opacity-[0.3]" : "opacity-[1]"
                          }  w-[100%]`}
                        >
                          <Image src={el} alt="" width={60} height={80}></Image>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="right float-right w-[660px]">
            <form>
              <div>
                <h2
                  className="
                text-[24px] font-semibold cursor-pointer text-[2e2e2e] w-auto m-0 leading-[29px]     padding: 0 100px 8px 0;
                "
                >
                  {product?.brand}
                </h2>
                <p className="mt-[12px] flex justify-start"> </p>
              </div>
              <button className="absolute top-0 right-0 text-0">
                <em className=" align-top inline-block text-[12px] text-[#191919] h-[16px] leading-[16px] font-bold">
                  MY
                </em>
                <span
                  className="inline-block w-[28px] h-[16px] align-top "
                  style={{
                    background: ` url(https://static.wconcept.co.kr/web/images/product/bg-heart.png) 0 0 no-repeat`,
                  }}
                ></span>
                <em className="align-top inline-block text-[12px] text-[#191919] h-[16px] leading-[16px] font-bold">
                  BRAND
                </em>
              </button>
              <div className="relative">
                <p className=" font-sans text-[14px] leading-[20px] text-[#000] pr-[30px] mt-[12px]">
                  {product?.front}
                </p>
                <h3 className="text-[14px] font-sans text-[#000] mt-[10px]">
                  {product?.front_multiline}
                </h3>
              </div>
              <div className="relative">
                <dl className=" border-t-0 pt-[20px] pb-[14px] border-b-[2px] border-b-[#000] relative">
                  <dt className=" font-sans text-[13px] h-[32px] leading-[18px] py-[7px] px-0 float-left m-0 clear-both w-[125px] text-[#333]">
                    정상가
                  </dt>
                  <dd
                    className="
                   m-0
                  text-[#ccc] text-[14px] h-[40px] leading-[18px] py-[7px] px-0 line-through"
                  >
                    <em className="text-[#ccc] leading-[18px] h-[32px] py-[7px] px-0 text-[18px]">
                      {product?.price?.toLocaleString()}
                    </em>{" "}
                    원
                  </dd>
                  <dt
                    className="m-0 float-left w-[125px] h-[32px] text-[#333]  inline-flex justify-start items-center'
                  "
                  >
                    <span className=" font-sans text-[13px]">쿠폰적용가</span>

                    <button
                      style={{
                        backgroundPosition: "-50px 0",
                        backgroundSize: "200px auto",

                        background: `url(https://static.wconcept.co.kr/web/images/product/spr_product_price.png) -50px 0 no-repeat`,
                      }}
                      className="inline-block ml-[3px] mt-[3px] w-[15px] h-[15px]"
                    ></button>
                  </dt>
                  <dd className="text-[#000] text-[14px] h-[32px]  float-left px-0 w-[130px]">
                    <em className="font-bold float-left   text-[18px]">
                      {(
                        product?.price *
                        (1 - product?.discount / 100)
                      ).toLocaleString()}
                    </em>
                    <span className="float-left ml-[1px]">원</span>

                    <span className="block text-[#fa5500] text-[18px] float-left font-bold ml-[6px] ">
                      {product?.discount}%
                    </span>
                  </dd>
                  <div className="block clear-both"></div>
                </dl>
                <button className="absolute h-[40px] text-[#000] bg-[#fff] font-sans text-[14px] text-left align-top border-[1px] border-[#000] leading-[36px] right-0 bottom-[20px] pt-0 pr-[20px] pl-[20px]  ">
                  쿠폰받기
                </button>
              </div>

              <div className="benefit relative border-b-[1px] border-[#e6e6e6]">
                <dl className="pt-[17px] pb-[19px] font-sans text-[13px]">
                  <dt className="float-left w-[125px] h-[40px] py-[8px] px-0">
                    신규회원
                  </dt>
                  <dd className="float-left w-[425px] py-[6px] px-0 overflow-hidden">
                    <span className="text-[11px] text-[#777]">
                      신규 가입시 10% 쿠폰 즉시 지급
                    </span>
                  </dd>
                  <dt className="w-[125px] m-0 h-[40px] float-left clear-both text-[12px]">
                    추가 혜택가
                  </dt>
                  <dd className="slide float-left m-0 w-[425px] overflow-hidden py-[6px] px-0">
                    <Slide></Slide>
                  </dd>
                  <div className="block clear-both"></div>
                </dl>
              </div>
              {/* 카드 할인가 정보 */}
              <dl className=" font-sans block text-[13px] py-[15px] px-0">
                <dt className="w-[125px] py-[7px] px-0 text-[#333] float-left m-0">
                  무이자 할부
                </dt>
                <dd className=" text-[13px] py-[7px] px-0 text-[#000] float-left">
                  최대4개월(
                  <em className=" not-italic">
                    {" "}
                    {(
                      (product?.price * (1 - product?.discount / 100)) /
                      4
                    ).toLocaleString()}
                  </em>{" "}
                  원 X 4개월)
                  <button
                    type="button"
                    onClick={handleCardModalOn}
                    className="
                     
                    inline-flex justify-between items-center
                    pr-[29px] pl-[6px] align-middle ml-[5px]
                  h-[21px] leading-[19px] border-[#959595] border-[1px] text-[#323232] text-[12px]"
                  >
                    카드안내
                    <Image
                      typeof="button"
                      className="absolute right-[291px]"
                      width={19}
                      height={19}
                      alt=""
                      src={bgPlus}
                    ></Image>
                  </button>
                </dd>
                <dt className="w-[125px] text-[#333] float-left m-0 clear-both py-[7px] font-sans px-0">
                  포인트 적립
                </dt>
                <dd className="text-[13px] float-left py-[6px] px-0">
                  <span>
                    <em className=" not-italic">
                      {(product?.price * 0.01).toLocaleString()}
                    </em>
                    p 적립
                  </span>
                  <button
                    type="button"
                    onClick={handlePointsModalOn}
                    className="max-w-[150px]
                    pr-[29px] pl-[6px] align-middle ml-[5px]
                     inline-flex justify-between items-center
                  h-[21px] leading-[19px] border-[#959595] border-[1px] text-[#323232] text-[12px]"
                  >
                    포인트 안내
                    <Image
                      className="absolute right-[380px]"
                      width={19}
                      height={19}
                      alt=""
                      src={bgPlus}
                    ></Image>
                  </button>
                </dd>
                <dt className="w-[125px] text-[#333] float-left m-0 clear-both py-[7px] font-sans px-0">
                  쇼핑가이드
                </dt>
                <dd className="text-[13px]  max-h-[45px] py-[7px] px-0 float-left m-0 text-[#000]">
                  <div className="text-[#959595] text-[10px] border-[1px] border-[#959595] overflow-hidden float-left  w-[30px] h-[18px] pl-[5px] align-top mb-0 ">
                    쿠폰
                  </div>
                  <div className=" clear-both block"></div>
                </dd>
                <div className="block clear-both"></div>
              </dl>
              {/* 색상/사이즈등의 옵션들 */}
              <dl className="block font-sans text-[13px] py-[15px] h-[108px]">
                <dt className="pt-[17px] w-[125px] text-[#333] float-left clear-both"></dt>
                <dd className="relative w-[535px] py-[5px] float-left m-0"></dd>
                <dt className="pt-[17px] text-[13px] w-[125px] clear-both float-left py-[5px] px-0">
                  색상/사이즈
                </dt>
                <dd className="py-[5px] float-left m-0 w-[535px] relative px-0">
                  <SelectOptions product={product}></SelectOptions>
                </dd>
              </dl>
              <div className="clear-both block"></div>
              <div
                className="w-[100%] max-h-[280px] font-sans  px-[20px] overflow-y-auto relative
              bg-[#fafafa]"
              >
                {/* 수량 쿠폰적용 */}
                <ul className="">
                  {selectOption?.map((el) => {
                    return (
                      <li key={el?.index} className="relative py-[20px] px-0">
                        <em className="block text-[15px] text-[#333] mb-[20px] pr-[30px] not-italic">
                          {el?.name}
                        </em>
                        <div className="flex relative justify-between">
                          {/* 재고 설정도 포함해보자 */}
                          <div className="flex relative items-center">
                            <input
                              type="text"
                              value={el?.quantity}
                              readOnly
                              className="w-[90px] text-center text-[13px] h-[30px] float-left p-0 leading-[30px] bg-[#fff] text-[#333] border-[1px] border-[#dedede]"
                            ></input>
                            <div className="w-[25px] h-[30px]  mr-[16px] ml-[6px]">
                              <button
                                type="button"
                                onClick={() => handleQuantityUp(el?.index)}
                                title="수량 증가"
                                style={{
                                  background: `url(https://i.ibb.co/QYGsjZG/bg-amount.gif) 0 0 no-repeat`,
                                }}
                                className="w-[100%] block  h-[15px] leading-[99em] overflow-hidden align-top"
                              ></button>
                              <button
                                type="button"
                                onClick={() => handleQuantityDown(el?.index)}
                                style={{
                                  background: `url(https://i.ibb.co/QYGsjZG/bg-amount.gif) 0 bottom no-repeat  `,
                                }}
                                title="수량 감소"
                                className="w-[100%]  block h-[15px] leading-[99em] overflow-hidden align-top"
                              ></button>
                            </div>
                          </div>

                          {/* 옵션들의 가격 */}
                          <div className="text-0 pr-[22px]">
                            <span className="font-sans font-extralight text-[13px] leading-[30px] text-[#333]">
                              <b className="text-[18px] mr-[3px]">
                                {(el?.price * el?.quantity).toLocaleString()}
                              </b>
                              원
                            </span>
                            <Image
                              onClick={() => handleDeleteOption(el.index)}
                              width={12}
                              height={12}
                              className=" cursor-pointer absolute bottom-[10px] right-0"
                              alt=""
                              src={btnDel}
                            ></Image>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {/* 스크롤 x,y 조정하기 */}
              </div>

              {/* 구매 쇼핑백담기등의 버튼 */}
              <ButtonBox></ButtonBox>
            </form>

            <Description></Description>
          </div>
          {/* 상품명 정보 */}
        </div>
      </div>
    </div>
  );
}
