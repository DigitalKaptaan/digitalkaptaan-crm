import { LoginForm } from "@/components/auth";
import styles from "@/styles/page/login.module.css";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Image
            src="/dk_logo.svg"
            alt="Logo"
            width={60}
            height={60}
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Login to continue</p>

        <LoginForm />
      </div>
    </div>
  );
}
