import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";

const User = [
  { id: "elonmusk", nickname: "Elon Musk" },
  { id: "zerohch0", nickname: "초레이" },
  { id: "leoturtle", nickname: "오만" },
];
const Postes = [];

export const handers = [
  http.post("/auth/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
      headers: { "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/" },
    });
  }),
    
    
    http.post("/auth/logout", () => {
        console.log('로그아웃')
        return HttpResponse(null, {
            
            headers: { "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0" },
        

        })

    }),
    http.post('/auth/users', async ({ request }) => {
        console.log('회원가입');
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //   status: 403,
        // })
        return HttpResponse.text(JSON.stringify('ok'), {
          headers: {
            'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0'
          }
        })
      }),
];
