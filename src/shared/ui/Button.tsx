"use client";
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
  memo,
} from "react";
import styles from "@/styles/ui/button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Professional Button Component
 * - forwardRef for better integration with forms and external refs
 * - Supports variants (primary, secondary, outline, danger)
 * - Handles loading state
 * - Optimized with React.memo
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      isLoading = false,
      disabled,
      fullWidth = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          ${styles.btn} 
          ${styles[variant] ?? ""} 
          ${fullWidth ? styles.fullWidth : ""} 
          ${className}
        `}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? <span className={styles.loader}></span> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);
