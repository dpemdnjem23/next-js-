
import { supabase, supabaseKey } from "@/lib";
import { cookieGet } from "@/utils/cookieUtils";

export async function getCartItems({ queryKey }) {
  const [_, id] = queryKey;
  const cookie = await cookieGet("cartId");

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cart?cart_id=eq.${cookie}&select=id,options,cart_id,quantity,user_id,product(id,product_code,price,thumbnail,product_code,brand,front_multiline,discount)
  &order.id=asc
  `;
  const url2 = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cart?user_id=eq.${id}&select=id,options,cart_id,quantity,user_id,product(id,product_code,price,thumbnail,product_code,brand,front_multiline,discount)
  &order.id=asc
  `;

  try {

    if (!session) {
      const response = await fetch(url, {
        next: { tags: ["cart"] },
        credentials: "include",
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
    } else if (session) {
      const response = await fetch(url2, {
        next: { tags: ["cart", id] },
        credentials: "include",
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

      console.log(jsonData);

      return jsonData;
    }
  } catch (err) {
    throw Error(err);
  }
}
