import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import { BlogsView } from "@/sections";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <LayoutWrapper>
      <Breadcrumb
        action={
          <Link href={"/blog/create"}>
            <button>Create</button>
          </Link>
        }
      />
      <BlogsView />
    </LayoutWrapper>
  );
};

export default page;
