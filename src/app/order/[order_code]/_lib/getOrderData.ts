"use server";
import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

export async function getOrderData(params) {
  const { order_code } = params;
  // const response = await supabase.from("order").select().eq("id", "46464a");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/order?id=eq.${order_code}`,
    {
      next: { tags: ["orders",order_code] },
      credentials: "include",
      cache: "no-store",

      headers: {
        
        "Content-Type": "application/json",

        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}
