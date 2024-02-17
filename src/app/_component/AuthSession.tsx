"use client";
import { SessionProvider } from "next-auth/react";

import { useState } from "react";
type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  const [set, setss] = useState(0);

  return <SessionProvider>{children}</SessionProvider>;
}
