import { supabase } from "@/lib";
import { cookieGet } from "@/utils/cookieUtils";

export async function getCartItems({ queryKey }) {
  const [_, id] = queryKey;

  console.log(queryKey, id, _, "querykey");

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const cookie = await cookieGet("cartId");

  if (!session) {
    const response = await supabase
      .from("cart")
      .select(
        `id,options,cart_id,quantity,user_id,product(id,product_code,price,thumbnail,product_code,brand,front_multiline,discount)`
      )
      .eq("cart_id", cookie)

      .order("id", { ascending: true });

    return response;
  } else if (session) {
    const response = await supabase
      .from("cart")
      .select(
        `id,options,cart_id,quantity,user_id,product(id,price,,product_code,thumbnail,product_code,brand,front_multiline,discount)`
      )
      .order("id", { ascending: true })
      .eq("user_id", user?.user?.id);

    return response;
  }
}
