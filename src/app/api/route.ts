import express from "express";
import { NextApiRequest, NextApiResponse } from "next";

import * as dotenv from "dotenv";
dotenv.config();

// export default async function GET(req: Request) {
//   console.log(req);

//   return new Response("hello", {
//     status: 200,
//   });
// }

type ResponseData = {
  message: string;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req, res);
  res.status(200).json({ message: "Hello from Next.js!" });
}
// export async function handler(req: Request, res: NextApiResponse) {
//   const com = req;

//   console.log(com, "sdfkasopdfkop");
//   try {
//     const paymentResponse = await fetch(
//       `https://api.portone.io/p const { paymentId } = req.body;
//       console.log(paymentId, "paymentId");ayments/${paymentId}`,
//       {
//         headers: { Authorization: `PortOne ${process.env.NEXT_PUBLIC_SECRET}` },
//       }
//     );
//     console.log(paymentResponse, "안녕 그대로 걸어가");
//     if (!paymentResponse.ok) {
//       throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
//     }
//     const payment = await paymentResponse.json();
//     // const order = await OrderService.findById(orderId);
//     // if (order.amount === payment.amount.total) {
//     //   switch (payment.status) {
//     //     case "VIRTUAL_ACCOUNT_ISSUED": {
//     //       // 가상 계좌가 발급된 상태입니다.
//     //       // 계좌 정보를 이용해 원하는 로직을 구성하세요.
//     //       break;
//     //     }
//     //     case "PAID": {
//     //       // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
//     //       break;
//     //     }
//     //   }
//     // } else {
//     //   // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
//     // }

//     // return new Response("GET Handler");
//   } catch (e) {
//     // 결제 검증에 실패했습니다.
//     // return res.status(400).send(e);
//   }
// }
