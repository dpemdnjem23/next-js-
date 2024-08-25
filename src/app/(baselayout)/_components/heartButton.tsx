"use client";

import { supabase } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function HeartButton({ id }:{id:number}) {
  const queryClient = useQueryClient();

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || `{}`);

  const {
    data: heart,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", userInfo?.id],
    // queryFn: getHeartData,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  const fetch = async (index: number) => {
    const response = await supabase
      .from("favorite")
      .insert([{ user_id: userInfo?.id, product_id: product[index]?.id }]);

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
    onMutate: (index: number) => {
      //즉시 하트를 추가한다.

      console.log(userInfo?.id);

      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      console.log(!value, value, "value");
      const shallow = [...value];
      console.log(shallow);

      shallow.push({
        user_id: userInfo?.id,
        product_id: product[index]?.id,
      });
      queryClient.setQueryData(["favorites", userInfo?.id], shallow);

      return { value };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["favorites", userInfo?.id], context?.value);
    },
  });

  const heartOff = useMutation({
    mutationFn: del,
    onMutate(productId: number) {
      //삭제하면 즉시 배열에있는 data 삭제
      const value: [] | undefined = queryClient.getQueryData([
        "favorites",
        userInfo?.id,
      ]);

      const arr = value?.filter((el: { product_id: number }) => {
        return el?.product_id !== productId;
      });

      queryClient.setQueryData(["favorites", userInfo?.id], arr);

      return { arr };
      //만약 데이터가 존재하면
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", userInfo?.id] });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["favorites", userInfo?.id], context?.arr);
    },
  });

  const handleClickHeart = async (index: number, productId: number) => {
    console.log(productId);
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

          heartOn.mutate(index);

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
        onClick={() => handleClickHeart(index, id)}
        id="heart"
        value={id}
        style={{
          background: ` url(https://static.wconcept.co.kr/web/images/common/spr-common.png) -330px 0`,
        }}
        className={`w-[18px] top-[10px] right-[10px] z-[2] h-[17px] absolute
                ${heart?.some((fav) => fav?.product_id === id) ? "active" : ""}
              
              `}
      ></button>
    </>
  );
}
