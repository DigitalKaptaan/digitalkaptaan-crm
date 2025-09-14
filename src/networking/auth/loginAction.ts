"use server";

import { getErrorMessage, setCookies } from "@/utils";
import { https } from "../fetcher";
import { dkUserDetail, tokenName } from "@/shared";

type LoginState = {
  data: unknown;
  error?: string | null;
  status: number;
  message?: string;
} | null;
export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        data: null,
        error: "Please enter a valid email address.",
        status: 400,
      };
    }

    if (!password || password.length < 6) {
      return {
        data: null,
        error: "Password must be at least 6 characters.",
        status: 400,
      };
    }

    const res = await https.post("/api/auth/login", { email, password });

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    await setCookies(tokenName, res?.data?.data?.token);
    await setCookies(dkUserDetail, res?.data?.data?.user);

    return {
      data: res.data,
      message: res?.data?.message,
      error: res.error,
      status: res.status,
    };
  } catch (error: unknown) {
    return {
      data: null,
      status: 500,
      error: getErrorMessage(error),
      message: getErrorMessage(error),
    };
  }
};
