"use server";
import { createSupabaseClient, createSupabaseServer } from "@/lib";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login({ id, password }) {
  try {
    const data = {
      email: id,
      password,
    };

    if (!id || !password) {
      throw new Error("아이디와 비밀번호를 입력해주세요.");
    }
    const { auth } = await createSupabaseServer();

    const { error } = await auth.signInWithPassword(data);

    // if (error) {
    //   throw error;
    // }
    if (error) {
      throw error;
    }

    return { errorMessage: null };

    return signData;
  } catch (error) {
    return { errorMessage: error };
  }
}
