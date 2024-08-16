import { supabase, supabaseKey, supabaseUrl } from "@/lib";

export async function getProductsData() {
  const url: string = `${supabaseUrl}/rest/v1/product?select=id,brand,front,front_multiline,price,discount,imageArr,general_info,thumbnail,option,product_code,category(id,category_name)`;

  const response = await fetch(url, {
    next: { tags: ["products"] },
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
}
