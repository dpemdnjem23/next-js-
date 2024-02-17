"use server";

import bcrypt from "bcrypt";

export const hardPassword = async (
  plainPassword: string | Buffer
): Promise<string | undefined> => {
  const saltRounds: number = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);

    if (!salt) {
      console.error("salt error");
      return;
    }

    const hash = await bcrypt.hash(plainPassword, salt);

    if (!hash) {
      console.error("hash error");
      return;
    }
    return String(hash);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const comparePassword = async (
  inputPassword: string,
  hashedPasswordFromDB: string
) => {
  const check = await bcrypt.compare(inputPassword, hashedPasswordFromDB);

  if (check) {
    console.log("로그인!");
    return true;
  } else {
    console.log("실패");
    return false;
  }
};
