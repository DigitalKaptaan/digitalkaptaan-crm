"use client";
import { Input } from "@/shared";
import React, { useActionState, useEffect } from "react";
import styles from "@/styles/page/login.module.css";
import { loginAction } from "@/networking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (!state) return;

    if (state.error) {
      toast.error(state.error, {
        position: "top-right",
      });
    } else if (state.data) {
      toast.success("Login successful!", {
        position: "top-right",
      });

      router.replace("/");
    }
  }, [state, router]);

  return (
    <form method="POST" action={formAction}>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        autoComplete="off"
        required
      />
      <button type="submit" className={styles.loginBtn}>
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
