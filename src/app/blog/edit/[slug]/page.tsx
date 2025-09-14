import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import { getBlogDetailsBySlugAction } from "@/networking";
import { BlogDetailsView } from "@/sections";
import React from "react";

type Props = {
  params: { slug: string };
};

const page = async ({ params }: Props) => {
  const param = await params;
  const blogDetails = await getBlogDetailsBySlugAction(param.slug);

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <BlogDetailsView
        type="EDIT"
        details={blogDetails?.data?.data}
        slug={param.slug}
      />
    </LayoutWrapper>
  );
};

export default page;
