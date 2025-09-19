import { LayoutWrapper } from "@/layout";
import { Breadcrumb } from "@/components";
import { AnalystDashboard } from "@/sections";

export const metadata = {
  title: "Dashboard || Digital Kaptaan",
  description:
    "Track website performance, visitors, and analytics with the Digital Kaptaan dashboard.",
  keywords: [
    "dashboard",
    "analytics",
    "digital kaptaan",
    "visitors",
    "performance",
  ],
};

export default function Home() {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <AnalystDashboard />
    </LayoutWrapper>
  );
}
