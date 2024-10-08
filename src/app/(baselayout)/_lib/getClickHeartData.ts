//클릭한 product를 가져온다.
// product버튼을 누를ㄸ

//product를 클릭하면 그 데이터를 넘겨준다.
//get dataHeart는 모든 데이터를 가져오기때문에 product에 쓰기 불펴해짐


import { supabaseKey, supabaseUrl } from "@/lib";
import { useQuery, QueryFunctionContext } from "react-query";

type props = {
  queryKey: [string, string];
};

export async function getClickHeartData({
  queryKey,
}: QueryFunctionContext<[string, undefined | string]>) {
  const [_, user_id] = queryKey;

  if (!user_id) {
    throw Error("로그인 하지 않은상태");
  }
  const url: string = `${supabaseUrl}/rest/v1/favorite?select=*&user_id=eq.${user_id}`;

  //userid가 존재하지않는경우
  try {
    const response = await fetch(url, {
      next: { tags: ["favorites", user_id] },
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",

        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    const jsonData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return jsonData;
  } catch (err: any) {
    throw Error(err);
  }
}
