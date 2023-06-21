"use client";
import React from "react";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { CogIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";

import useDark from "@/hooks/useDark";
import { Drawer } from "@/components/ui/drawer";
import { AppBar } from "@/components/ui/appbar";
import { SideMenu } from "@/components/ui/side-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedWrapper from "../_components/AnimatedWrapper";

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    Icon: LayoutDashboardIcon,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    Icon: CogIcon,
  },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const { toggleDark, isDark } = useDark();
  const pathname = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <AnimatePresence mode="wait">
      <AnimatedWrapper>
        <SideMenu>
          <SideMenu.Brand>
            <h1 className="text-2xl font-bold">Brand</h1>
          </SideMenu.Brand>
          <SideMenu.Content>
            {links.map((item, idx) => (
              <SideMenu.NavigationMenu
                key={idx}
                active={pathname.startsWith(item.href)}
              >
                <SideMenu.NavigationMenuLink href={item.href}>
                  <item.Icon className="w-6 h-6" />
                  {item.label}
                </SideMenu.NavigationMenuLink>
              </SideMenu.NavigationMenu>
            ))}
          </SideMenu.Content>
        </SideMenu>
        <AppBar className="right-0 w-full md:w-[calc(100%-300px)]">
          <div className="flex items-center">
            <IconButton
              className="md:hidden border-none mx-1"
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <AppBar.Brand>
              <h1 className="text-2xl font-bold">Brand</h1>
            </AppBar.Brand>
          </div>
          <AppBar.Menu>
            <IconButton onClick={toggleDark}>
              {isDark ? <MoonIcon /> : <SunIcon className="text-amber-500" />}
            </IconButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton>
                  <AppBar.Avatar
                    alt="avatar"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <span>Profile</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <span>Settings</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </AppBar.Menu>
        </AppBar>
        <Drawer open={open} onClose={handleClose}>
          <Drawer.Brand>
            <h1 className="text-2xl font-bold">Brand</h1>
          </Drawer.Brand>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Hello World</h1>
          </div>
        </Drawer>
        {children}
      </AnimatedWrapper>
    </AnimatePresence>
  );
};

export default Wrapper;
