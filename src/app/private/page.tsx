// import { redirect } from "next/navigation";

// import { createClient } from "@/app/utils/supabase2";

// export default async function PrivatePage() {
//   const supabase = createClient();

//   const { data, error } = await supabase.auth.getUser();

//   console.log(data);
//   if (error || !data?.user) {
//     redirect("/login");
//   }

//   return <p>Hello {data.user.email}</p>;
// }
