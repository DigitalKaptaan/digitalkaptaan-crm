"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaHome } from "react-icons/fa";
import styles from "@/styles/components/breadcrumb.module.css";

type BreadcrumbProps = {
  action?: React.ReactNode;
};

export default function Breadcrumb({ action }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.breadcrumb}>
        <ul>
          {/* Home link */}
          <li>
            <Link href="/" className={styles.link}>
              <FaHome className={styles.icon} />
              <span className={styles.text}>Dashboard</span>
            </Link>
          </li>

          {pathSegments.map((segment, idx) => {
            const href = "/" + pathSegments.slice(0, idx + 1).join("/");
            const isLast = idx === pathSegments.length - 1;

            return (
              <li key={href} className={styles.item}>
                <FaChevronRight className={styles.separator} />
                {isLast ? (
                  <span className={styles.current}>
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link href={href} className={styles.link}>
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {action && <div className={styles.right}>{action}</div>}
    </div>
  );
}
