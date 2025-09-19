import { Breadcrumb } from "@/components";
import { LayoutWrapper } from "@/layout";
import React from "react";
export const metadata = {
  title: "Settings || Digital Kaptaan",
  description:
    "Manage your profile, preferences, and account settings on Digital Kaptaan.",
  keywords: [
    "settings",
    "preferences",
    "account",
    "digital kaptaan",
    "profile",
  ],
};
const page = () => {
  return (
    <LayoutWrapper>
      <Breadcrumb />
    </LayoutWrapper>
  );
};

export default page;
