"use server";

import { tokenName } from "@/shared";
import { cookies } from "next/headers";

interface CookieOptions {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number; // in seconds
}

export const getToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get(tokenName);
};

export const setCookies = async (
  key: string,
  value: object | string | number,
  options?: CookieOptions
) => {
  const cookiesStore = await cookies();

  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  cookiesStore.set({
    name: key,
    value: stringValue,
    path: options?.path || "/",
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7, // default 7 days
  });
};
