"use client";
import React from "react";
import styles from "@/styles/layout/sidebar.module.css";
import { FaTachometerAlt, FaCog, FaSignOutAlt, FaBlog } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: Props) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <FaTachometerAlt size={18} />,
    },
    { name: "Blogs", href: "/blog", icon: <FaBlog size={18} /> },
    { name: "Settings", href: "/settings", icon: <FaCog size={18} /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <Image src="/dwk_logo.svg" alt="sdc" width={60} height={60} />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.link} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.logoutWrapper}>
        <button className={styles.logoutBtn}>
          <span className={styles.icon}>
            <FaSignOutAlt size={18} />
          </span>
          <span className={styles.text}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
