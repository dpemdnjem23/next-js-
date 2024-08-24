import { supabaseKey, supabaseUrl } from "@/lib";
import { useQuery, QueryFunctionContext } from "react-query";

type props = {
  queryKey: [string, string];
};

export async function getProductHeart({
  queryKey,
}: QueryFunctionContext<[string, number]>) {
  const [_, product_id] = queryKey;
  console.log(product_id);
  //2개로 나눌수있다. 몇명이 찜했는지 볼수있도록,

  const url: string = `${supabaseUrl}/rest/v1/favorite?select=*&product_id=eq.${product_id}`;

  //userid가 존재하지않는경우
  try {
    const response = await fetch(url, {
      next: { tags: ["favorites", product_id.toString()] },
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",

        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    //서버에서 갯수만 추출해서 내보내준다.

    const jsonData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return jsonData.length;
  } catch (err: any) {
    throw Error(err);
  }
}
