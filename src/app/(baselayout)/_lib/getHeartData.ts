import { supabaseKey, supabaseUrl } from "@/lib";
import { useQuery, QueryFunctionContext } from "react-query";

type props = {
  queryKey: [string, string];
};

export async function getHeartData({
  queryKey,
}: QueryFunctionContext<[string, undefined | string]>) {
  const [_, user_id] = queryKey;

  console.log(user_id);
  if (!user_id) {
    throw Error("로그인 하지 않은상태");
  }
  const url: string = `${supabaseUrl}/rest/v1/favorite?user_id=eq.${user_id}`;

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
