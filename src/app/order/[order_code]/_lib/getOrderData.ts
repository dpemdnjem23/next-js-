// import { useParams } from "next/navigation";

import { supabase } from "@/lib";

export async function getOrderData({ queryKey }: any) {
  // const response = await supabase.from("order").select().eq("id", "46464a");

  try {
    const [_, order_code] = queryKey;


    const response = await supabase.from("order").select().eq("id", order_code);

    if (response.error) {
      throw new Error("Failed to fetch data");
    }

    return response.data
  } catch (err) {
    return err;
  }

  // return [];
}
