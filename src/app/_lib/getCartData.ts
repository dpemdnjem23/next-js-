"use server";

import { getUser, supabaseKey, supabaseUrl } from "@/lib";
import { cookieGet } from "@/utils/cookieUtils";
import { error } from "console";

export async function getCartData({ queryKey }) {
  const [_, user_id] = queryKey;
  // 두가지 경우가 존재

  //1. 로그인한 사용자인경우(getData로 )

  try {
    //
    //cart를 번호와 사용자로 나눈다?

    if (user_id) {
      const url: string = `${supabaseUrl}/rest/v1/cart?user_id=eq.${user_id}&select=id,options,cart_id,quantity,user_id,product_id(id,price,thumbnail,product_code,brand,front_multiline,discount)`;

      const response = await fetch(url, {
        next: { tags: ["cart", user_id] },
        credentials: "include",
        cache: "no-store",

        headers: {
          "Content-Type": "application/json",

          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (!response.ok) {
        throw error("cart를 불러오는데 실패");
      }

      const jsonData = await response.json();

      return jsonData;
    } else if (!user_id) {
      const cookie = await cookieGet("cartId");
      //쿠키가 존재하지안흥면 안만들면되잖아?

      //
      const url: string = `${supabaseUrl}/rest/v1/cart?cart_id=eq.${cookie}&select=id,options,cart_id,quantity,user_id,product_id(id,price,thumbnail,product_code,brand,front_multiline,discount)`;

      if (!cookie) {
        throw error("cart를 불러오는데 실패");
      }

      const response = await fetch(url, {
        next: { tags: ["cart", cookie] },
        credentials: "include",
        cache: "no-store",

        headers: {
          "Content-Type": "application/json",

          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (!response.ok) {
        throw error("cart를 불러오는데 실패");
      }

      const jsonData = await response.json();

      return jsonData;
    }

    //2. 로그인하지 않은 사용자인경우
  } catch (err) {
    return { errMessage: err };
  }
}
