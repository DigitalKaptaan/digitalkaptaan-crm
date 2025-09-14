"use client";

import React from "react";
import styles from "@/styles/ui/input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, error, ...props }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label} {props.required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
        {...props}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default Input;
