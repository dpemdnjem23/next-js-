"use client";
import Image from "next/image";
import giftImage from "../../../../../public/ico_prod_gift.svg";
import heartOffImage from "../../../../../public/ico_prod_heart_off.svg";
import heartOnImage from "../../../../../public/ico_prod_heart_on.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/lib";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { setIsHeart, setPersonalHeart } from "@/reducers/slices/UserSlice";
import { setCartCheckModal } from "@/reducers/slices/ProductSlice";
import { addToCart } from "@/lib/cookieAddCart";

interface props {
  id: number;
  product_id: number;
  user_id: number;
}
export default function ButtonBox() {
  //옵션 이 있을때 구매가 가능하도록한다.
  const product = useSelector((state) => state?.product.product);
  const isHeart = useSelector((state) => state?.user.isHeart);
  const selectOption = useSelector((state) => state?.product.selectOption);

  //만약 personalHeart에 변화가 생겼다면

  const personalHeart = useSelector((state) => state?.user.personalHeart);

  const [prevHeart, setPrevHeart] = useState<boolean>(personalHeart);

  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];

  const dispatch = useDispatch();
  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

  //heart를 클릭할시 하트색깔을 바꾼다.
  //hear user_id에 값을 넣고 다시클릭하면 줄어들도록
  //heart클릭시 로그인이 되지 않았다면

  const handleClickHeart = async () => {
    //로그인 되어있는 경우
    try {
      //db에 추가 db에 추가된경우 db에서 삭제
      if (userLogin.login) {
        //db에 추가하려면, 없어야한다. 있는경우 삭제한다.

        console.log(product?.id);
        const { data, error } = await supabase
          .from("favorite")
          .select()
          .eq("user_id", userInfo.user.id)
          .eq("product_id", product?.id);

        if (error) {
          throw error;
        }
        //data가 존재한다. 확인이 된경우 삭제한다.
        console.log(data[0], "single data");
        if (data[0]) {
          const del = await supabase
            .from("favorite")
            .delete()
            .eq("user_id", userInfo.user.id)
            .eq("product_id", product?.id);

          if (error) {
            throw error;
          }

          dispatch(setPersonalHeart([]));

          // setPrevHeart(!prevHeart);
        } else if (!data[0]) {
          //data가 없는경우

          const add = await supabase
            .from("favorite")
            .insert([{ user_id: userInfo.user.id, product_id: product?.id }]);
          if (add.error) {
            throw add.error;
          }

          const response: any = await supabase
            .from("favorite")
            .select()
            .eq("user_id", userInfo.user.id)
            .eq("product_id", product?.id);

          if (response.error) {
            throw response.error;
          }
          //추가가되면 personalHeart에도 똑같이 만들어서 넣어줘야된다.
          //추가가됏다는건 가장 마지막 배열이라는것

          console.log(response.data, "response data");

          // setPrevHeart(response.data[0]);
          dispatch(setPersonalHeart(response.data));
          // setPrevHeart(!prevHeart);
        }

        //heart체크가

        //db에 추가되면 4개로 되고 해당되는 user_id가 존재할때
      }

      //
      else {
        const userConfirmed = window.confirm("로그인 후 이용해주세요");

        if (userConfirmed) {
          window.location.href = "/Member/login"; // 이동하고자 하는 URL로 변경
          return;
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const openCartCheckModal = () => {
    // console.log("dllddlltlfgod");

    //옵션이 1개 이상일때부터 시작
    //옵션에 해당하는 product를 넣는다.
    //
    if (selectOption.length >= 1) {
      dispatch(setCartCheckModal(true));
      addToCart(product)
    } else if (selectOption.length < 1) {
      //옵션이 0개인경우
      alert("옵션을 선택해주세요");
    }
  };
  //버튼을 클릭하면 옵션창이 활성화돼있는지 확인

  //옵션이 활성화

  // console.log(isHeart, heart, "heat");

  return (
    <ul className="flex w-[660px] justify-between items-center py-[30px]">
      <li className="min-w-[250px] flex ml-[10px] relative flex-1">
        <button
          className="w-[100%] border-[1px] px-[20px]  h-[70px] font-sans font-medium leading-[68px] text-[20px] border-[#000]"
          type="button"
        >
          바로 구매
        </button>
      </li>
      <li className="flex-1 min-w-[250px] ml-[10px] relative ">
        <button
          onClick={openCartCheckModal}
          type="button"
          className="w-[100%] h-[70px] font-sans font-medium leading-[68px] text-[20px] bg-[#000] text-[#fff] border-[#000]"
        >
          쇼핑백 담기
        </button>
      </li>
      <li className=" min-w-[70px] w-[70px] ml-[10px] relative">
        <button
          className="bg-[#fa5500] text-center flex-col w-[70px] h-[70px] relative  flex items-center  justify-center"
          type="button"
        >
          <Image
            className="px-auto"
            width={34}
            height={34}
            alt=""
            src={giftImage}
          ></Image>
          <span className="text-[13px] text-[#fff] font-medium block ">
            선물하기
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={handleClickHeart}
          className=" border-[1px] border-[#ccc] text-center flex-col w-[70px] h-[70px] ml-[2px] flex items-center   justify-center"
          type="button"
        >
          {personalHeart.length === 1 ? (
            <Image width={34} height={34} alt="" src={heartOnImage}></Image>
          ) : (
            <Image width={34} height={34} alt="" src={heartOffImage}></Image>
          )}
          <p className=" font-semibold text-[13px] leading-[20px] pt-[-5px] text-[#7d7d7d]">
            {isHeart?.length}
          </p>
        </button>
      </li>
    </ul>
  );
}
