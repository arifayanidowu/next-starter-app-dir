"use client";
import React from "react";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { CogIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Drawer } from "@/components/ui/drawer";
import { AppBar } from "@/components/ui/appbar";
import { SideMenu } from "@/components/ui/side-menu";
import { IconButton } from "@/components/ui/icon-button";
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
  const { setTheme, theme } = useTheme();
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
                <SideMenu.NavigationMenuLink
                  href={item.href}
                  iconleft={<item.Icon className="w-6 h-6" />}
                >
                  {item.label}
                </SideMenu.NavigationMenuLink>
              </SideMenu.NavigationMenu>
            ))}
          </SideMenu.Content>
          <SideMenu.Footer></SideMenu.Footer>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton>
                  <SunIcon className="text-orange-500 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  data-theme={theme}
                  className="data-[theme=light]:bg-slate-100 dark:data-[theme=light]:bg-slate-900"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  data-theme={theme}
                  className="data-[theme=dark]:bg-slate-100 dark:data-[theme=dark]:bg-slate-900"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  data-theme={theme}
                  className="data-[theme=system]:bg-slate-100 dark:data-[theme=system]:bg-slate-900"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <Drawer.Content>
            {links.map((item, idx) => (
              <Drawer.NavigationMenu
                key={idx}
                active={pathname.startsWith(item.href)}
              >
                <Drawer.NavigationMenuLink
                  href={item.href}
                  iconleft={<item.Icon className="w-6 h-6" />}
                >
                  {item.label}
                </Drawer.NavigationMenuLink>
              </Drawer.NavigationMenu>
            ))}
          </Drawer.Content>
          <Drawer.Footer></Drawer.Footer>
        </Drawer>
        {children}
      </AnimatedWrapper>
    </AnimatePresence>
  );
};

export default Wrapper;
