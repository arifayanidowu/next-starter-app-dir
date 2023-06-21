import { AppDashboardLayout } from "@/components/ui/app-dashboard-layout";

import Wrapper from "./_components/Wrapper";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppDashboardLayout>
      <Wrapper>{children}</Wrapper>
    </AppDashboardLayout>
  );
}
