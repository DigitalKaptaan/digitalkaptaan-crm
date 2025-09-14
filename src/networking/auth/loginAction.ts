"use server";

import { setCookies } from "@/utils";
import { https } from "../fetcher";
import { dkUserDetail, tokenName } from "@/shared";

export const loginAction = async (prevState: any, formData: FormData) => {
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
  } catch (error: any) {
    return {
      data: null,
      message: error?.message || "Something went wrong",
      error: error?.message || "Something went wrong",
      status: 500,
    };
  }
};
