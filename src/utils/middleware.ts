// import { supabase } from "@/lib/supbabase";
// const supabaseAuthMiddleware = (handler) => async (req, res) => {
//   // 여기에서 Supabase의 인증을 확인하고 로그인 여부를 검사할 수 있습니다.
//   const user = supabase.auth.getUser();

//   if (!user) {
//     // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트합니다.
//     res.writeHead(302, { Location: "/login" });
//     res.end();
//     return;
//   }

//   // 사용자가 인증되었을 경우 요청 처리를 계속합니다.
//   return handler(req, res);
// };

// export default supabaseAuthMiddleware;