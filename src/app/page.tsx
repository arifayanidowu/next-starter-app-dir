"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import useDark from "@/hooks/useDark";
import { AppBar } from "@/components/ui/appbar";
import { SideMenu } from "@/components/ui/side-menu";
import { AppDashboardLayout } from "@/components/ui/app-dashboard-layout";

export default function Home() {
  const { toggleDark } = useDark();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Home Page</h1>
    </>
  );
}
