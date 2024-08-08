"use server";
import { supabase } from "@/lib";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

export async function getProductData({
  queryKey,
}: {
  queryKey: [string, string];
}) {
  const [_, product_code] = queryKey;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/product?product_code=eq.${product_code}`,
    {
      next: { tags: ["product", product_code] },
      credentials: "include",
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",

        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  const jsonData = await response.json();
  console.log(jsonData);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  // const result = async () => {
  //   const { data, error }: any = await supabase
  //     .from("product")
  //     .select()
  //     .eq("product_code", product_code)
  //     .single();

  //   if (error) {
  //     throw error;
  //   }

  //   if (!ignore) {
  //     dispatch(setProduct(data));
  //     dispatch(setIsImage(data.imageArr[key]));
  //     dispatch(setSelectOption([]));
  //   }
  // };
  // result();

  return jsonData;
}
