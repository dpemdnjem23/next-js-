"use client";

import { supabase } from "@/lib";
import heartOffImage from "../../../../../public/ico_prod_heart_off.svg";
import heartOnImage from "../../../../../public/ico_prod_heart_on.svg";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getHeartData } from "@/app/(baselayout)/_lib/getHeartData";
import { query } from "express";
import { useState } from "react";
import { getProductHeart } from "../_lib/getProductHearts";

export default function HeartButton() {
  //product를 product_id를 기준으로 가져와

  const [isMutating, setIsMutating] = useState(false); // 클릭 방지 상태

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const params = useParams();
  const { product_code } = params;

  const queryClient = useQueryClient();

  const product = useQuery({ queryKey: ["product", product_code] });

  const favorites = useQuery({
    queryKey: ["favorites", product?.data?.id?.toString()],
    queryFn:getProductHeart,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  const {
    data: heart,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", userInfo?.id],
    queryFn: getHeartData,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  const fetch = async (productId: number) => {
    const response = await supabase
      .from("favorite")
      .insert([{ user_id: userInfo?.id, product_id: productId }]);

    return response;
  };

  const del = async (productId: number) => {
    const response = await supabase
      .from("favorite")
      .delete()
      .eq("user_id", userInfo?.id)
      .eq("product_id", productId);

    return response;
  };

  const heartOn = useMutation({
    mutationFn: fetch,
    onMutate: async () => {
      //즉시 하트를 추가한다.

      setIsMutating(true);

      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      const shallow = [...value];

      shallow.push({
        user_id: userInfo?.id,
        product_id: product?.id,
      });

      queryClient.setQueryData(["favorites", userInfo?.id], shallow);
        queryClient.setQueryData(
          ["favorites", product?.data?.id?.toString()],
          (old) => old + 1
        );

      return { value };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      setIsMutating(false);
      queryClient.invalidateQueries({
        queryKey: ["favorites", product?.data?.id?.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["favorites", product?.data?.id?.toString()],
        (old) => old - 1
      );
      queryClient.setQueryData(["favorites", userInfo?.id], context?.value);
    },
  });

  const heartOff = useMutation({
    mutationFn: del,
    onMutate(productId: number) {
      setIsMutating(true);

      //삭제하면 즉시 배열에있는 data 삭제
      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      const arr = value?.filter((el: { product_id: number }) => {
        return el?.product_id !== productId;
      });

      queryClient.setQueryData(["favorites", userInfo?.id], arr);
      queryClient.setQueryData(
        ["favorites", product?.data?.id?.toString()],
        (old) => old - 1
      );
      return { arr };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["favorites", product?.data?.id?.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
      setIsMutating(false);
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["favorites", product?.data?.id?.toString()],
        (old) => old + 1
      );
      queryClient.setQueryData(["favorites", userInfo?.id], context?.arr);
    },
  });

  const handleClickHeart = async (productId: number, e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      //db에 추가 db에 추가된경우 db에서 삭제
      if (userLogin.login) {
        //로그인한경우 db에 존재하는지 확인.
        //heart데이터가 존재하는중인지 확인해야한다.
        //heart 데이터중 product 랑 일치하는지확인

        const check = heart?.find((el) => {
          return el.product_id === productId;
        });

        // dispatch(setFavorites(response.data));

        //data가 존재한다. 확인이 된경우 삭제한다.
        if (check) {
          heartOff.mutate(productId);
          // setPrevHeart(!prevHeart);
        } else if (!check) {
          //data가 없는경우

          heartOn.mutate(productId);

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

  return (
    <>
      <button
        disabled={isMutating}
        onClick={(e) => handleClickHeart(product?.data?.id, e)}
        className=" border-[1px] border-[#ccc] text-center flex-col w-[70px] h-[70px] ml-[2px] flex items-center   justify-center"
        type="button"
      >
        {heart?.some((fav) => fav?.product_id === product?.data?.id) ? (
          <Image width={34} height={34} alt="" src={heartOnImage}></Image>
        ) : (
          <Image width={34} height={34} alt="" src={heartOffImage}></Image>
        )}
        <p className=" font-semibold text-[13px] leading-[20px] pt-[-5px] text-[#7d7d7d]">
          {favorites?.data}
        </p>
      </button>
    </>
  );
}
