import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import { BlogsView } from "@/sections";
import { Button } from "@/shared";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Blog || Digital Kaptaan",
  description:
    "Read the latest insights, tips, and articles from Digital Kaptaan’s blog.",
  keywords: [
    "blog",
    "digital kaptaan",
    "articles",
    "insights",
    "marketing tips",
  ],
};

const page = () => {
  return (
    <LayoutWrapper>
      <Breadcrumb
        action={
          <Link href={"/blog/create"}>
            <Button>Create</Button>
          </Link>
        }
      />
      <BlogsView />
    </LayoutWrapper>
  );
};

export default page;
