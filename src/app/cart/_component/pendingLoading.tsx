"use client";
import { useTransition } from "react";
import Loading from "@/app/_lib/loading";

export default function PendingLoading({ children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <html>
      <body>
        {isPending && <Loading />}
        {children}
      </body>
    </html>
  );
}
