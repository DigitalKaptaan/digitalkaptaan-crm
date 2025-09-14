import Image from "next/image";
import styles from "./page.module.css";
import { LayoutWrapper } from "@/layout";
import { Breadcrumb } from "@/components";

export default function Home() {
  return (
    <LayoutWrapper>
      <Breadcrumb action={<button>vb fkvmn,</button>} />
    </LayoutWrapper>
  );
}
