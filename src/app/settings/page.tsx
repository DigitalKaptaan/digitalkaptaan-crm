import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <LayoutWrapper>
      <Breadcrumb />
    </LayoutWrapper>
  );
};

export default page;
