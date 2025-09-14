import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import { BlogDetailsView } from "@/sections";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <BlogDetailsView type="CREATE" />
    </LayoutWrapper>
  );
};

export default page;
