import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

//동일한 패키지에서 생성된걸로 구성해야한다.
//예컨데 middleware 에서 supabase helper 패키지에서 사용됏다면,
//supabase apdlsdptjeh
//에
//메인에서도

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
