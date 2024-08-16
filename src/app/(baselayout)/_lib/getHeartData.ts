
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

export async function getHeartsData({ useQuery }) {

    const [_,user_id] = useQuery
  const url: string = `${supabaseUrl}/rest/v1/favorite?user_id=eq.${user_id}`

  const response = await fetch(url, {
    next: { tags: ["favorites",user_id] },
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
