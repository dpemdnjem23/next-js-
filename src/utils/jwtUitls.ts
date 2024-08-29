// "use server";
// import jwt from "jsonwebtoken";
// const secret = process.env.JWT_SECRET as string;

// // access Token 발급
// const sign = (id: number, email: string) => {
//   // "use server";
//   return jwt.sign({ id, email }, secret, {
//     algorithm: "HS256", // 암호화 알고리즘
//     expiresIn: "1h", // 유효기간
//   });
// };

// // access Token 검증
// const verify = (token: string) => {
//   let decoded: any = null;
//   try {
//     decoded = jwt.verify(token, secret);
//     return {
//       ok: true,
//       userId: decoded.id,
//     };
//   } catch (error: any) {
//     return {
//       ok: false,
//       message: error.message,
//     };
//   }
// };

// // refresh Token 발급
// const refresh = (email: string, nickname: string) => {
//   return jwt.sign({ email, nickname }, secret, {
//     algorithm: "HS256",
//     expiresIn: "14d", // 유효기간
//   });
// };

// const refreshVerify = (token: string) => {
//   try {
//     jwt.verify(token, secret);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export { sign, verify, refresh, refreshVerify };
