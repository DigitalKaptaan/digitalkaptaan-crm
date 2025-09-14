import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import { BlogDetailsView } from "@/sections";
import React from "react";

const page = () => {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <BlogDetailsView type="CREATE" />
    </LayoutWrapper>
  );
};

export default page;
