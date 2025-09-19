"use client";
import * as React from "react";
import styles from "@/styles/ui/card.module.css";

// Card
export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`${styles.card} ${className}`} {...props} />
  )
);
Card.displayName = "Card";

// CardHeader
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`${styles.cardHeader} ${className}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

// CardTitle
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={`${styles.cardTitle} ${className}`} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

// CardContent
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.cardContent} ${className}`}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";
