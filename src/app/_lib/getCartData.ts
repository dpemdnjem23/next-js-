import {
  createSupabaseServer,
  supabase,
  supabaseKey,
  supabaseUrl,
} from "@/lib";
import { cookieGet } from "@/utils/cookieUtils";

export async function getCartData({ queryKey }) {
  const [_, user_id] = queryKey;

  // 두가지 경우가 존재
  const cookie = await cookieGet("cartId");

  //1. 로그인한 사용자인경우(getData로 )
  // cart_id=eq.${cookie}&
  // select=id,options,cart_id,quantity,user_id,product_id(id,price,thumbnail,product_code,brand,front_multiline,discount)
  try {
    let response;

    if (user_id !== "guest") {
      response = await supabase
        .from("cart")
        .select(
          `id,options,cart_id,quantity,user_id,product_id(id,price,thumbnail,product_code,brand,front_multiline,discount)`
        )
        .eq("user_id", user_id);
    } else if (user_id === "guest" && cookie) {
      response = await supabase
        .from("cart")
        .select(
          `id,options,cart_id,quantity,user_id,product_id(id,price,thumbnail,product_code,brand,front_multiline,discount)`
        )
        .eq("cart_id", cookie);
    } else {
      return []; // 쿠키가 없거나 유저가 guest인 경우 빈 배열 반환
    }


    // const supabase = await createSupabaseServer();

    if (response.error) {
      throw Error("cart를 불러오는데 실패");
    }

    return response.data;

    //2. 로그인하지 않은 사용자인경우
  } catch (err) {
    return err;
  }
}
