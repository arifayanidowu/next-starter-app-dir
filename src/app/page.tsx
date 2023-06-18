"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import useDark from "@/hooks/useDark";
import { AppBar } from "@/components/ui/appbar";

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
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-background">
      <AppBar className="w-full" />
      <Drawer open={open} onClose={handleClose}>
        <Drawer.Brand>
          <h1 className="text-2xl font-bold">Brand</h1>
        </Drawer.Brand>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold">Hello World</h1>
        </div>
      </Drawer>
      <Button variant={"info"} onClick={handleOpen}>
        Click me
      </Button>
      <Button onClick={toggleDark}>Toggle Dark Mode</Button>
    </main>
  );
}
