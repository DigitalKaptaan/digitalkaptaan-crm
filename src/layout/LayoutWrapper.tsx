"use client";
import React, { useState } from "react";
import styles from "@/styles/layout/layoutwrapper.module.css";
import Sidebar from "./Sidebar";

type WrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: WrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Sidebar (drawer for mobile) */}
      <Sidebar isOpen={isOpen} />

      {/* Overlay for mobile */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* Content */}
      <main className={styles.content}>
        {/* Mobile Toggle Button */}
        <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <div className={styles.mainContent}>{children}</div>
      </main>
    </div>
  );
};

export default LayoutWrapper;
