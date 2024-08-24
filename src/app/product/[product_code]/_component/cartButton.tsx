"use client";

import { supabase } from "@/lib";
import { setCartCheckModal } from "@/reducers/slices/ProductSlice";
import { cookieCreate, cookieGet } from "@/utils/cookieUtils";
import {
  InfiniteData,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
export default function CartButton() {
    const params = useParams();

    const queryClient = useQueryClient();
    const { product_code } = params;
    const product = useQuery({ queryKey: ["product", product_code] });

    //   const product = queryClient.getQueryData([["product", product_code]]);
    console.log(product, "cartButton");
    const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

    const selectOption = useSelector((state) => state?.product.selectOption);
    //   let cartId = cookieGet("cartId");
    //   console.log(cartId, "cartButton");

    const dispatch = useDispatch();

    const fetchData = async (cartId: string|undefined) => {
    const optionsArr = selectOption?.map((el) => {
      return el.name;
    });
    const quantityArr = selectOption?.map((el) => {
      return Number(el.quantity);
    });
    //해당하는 cart_id를 찾아서 넣기

    // const select = {
    //   user_id: userInfo?.user?.id || null,

    // };
    optionsArr.push("end");
    //option이 여러개
    // const response = await supabase.from("cart").update(select);

    const select = {
      user_id: userInfo?.user?.id || null,
      options: optionsArr,
      quantity: quantityArr,
      cart_id: cartId,

      product_id: product?.data?.id,
    };

    // //option이 여러개
    const response = await supabase.from("cart").insert(select);

    return response;
  };

  const mutation = useMutation({
    mutationFn: fetchData,
    onSuccess: (cartId) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const addToCart = async () => {
    //cart에 추가할때 cookie를 추가한다.

    let cartId = await cookieGet("cartId");
    // let cart;

    //cartId가 없는경우
    if (!cartId) {
      await cookieCreate("cartId");
      // mutation.mutate();
    }

    mutation.mutate(cartId);
  };

  //haert를 클릭햇을때 집어넣거나빼고, heart를 불러와서 heart를찍은 사람 수 만큼넣어주기
  //heart는 product번호랑 매칭시켜야한다.

  //heart를 클릭할시 하트색깔을 바꾼다.
  //hear user_id에 값을 넣고 다시클릭하면 줄어들도록
  //heart클릭시 로그인이 되지 않았다면

  // const query = useQuery({queryKey:['cart']})

  const openCartCheckModal = () => {
    // console.log("dllddlltlfgod");

    //옵션이 1개 이상일때부터 시작
    //옵션에 해당하는 product를 넣는다.
    //
    if (selectOption.length >= 1) {
      addToCart();

      dispatch(setCartCheckModal(true));
    } else if (selectOption.length < 1) {
      //옵션이 0개인경우
      alert("옵션을 선택해주세요");
    }
  };
  return (
    <>
      <button
        onClick={openCartCheckModal}
        type="button"
        className="w-[100%] h-[70px] font-sans font-medium leading-[68px] text-[20px] bg-[#000] text-[#fff] border-[#000]"
      >
        쇼핑백 담기
      </button>
    </>
  );
}
