import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//동일한 패키지에서 생성된걸로 구성해야한다.
//예컨데 middleware 에서 supabase helper 패키지에서 사용됏다면,
//supabase apdlsdptjeh
//메인에서도

export const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
});

// Export for usage by the rest of the app
