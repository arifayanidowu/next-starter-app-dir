"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { XIcon } from "lucide-react";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  width?: string | number;
}

const DrawerRoot = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, ...props }, ref) => {
    const state = props.open ? "open" : "closed";

    const variants = {
      hidden: { opacity: 0, x: "-100%" },
      visible: (open: boolean) => ({
        opacity: open ? 1 : 0,
        transform: open ? "translateX(0)" : "translateX(-100%)",
      }),
    };

    const backdropVariants = {
      hidden: { opacity: 0, display: "none" },
      visible: (open: boolean) => ({
        opacity: open ? 1 : 0,
        display: open ? "block" : "none",
      }),
    };

    const iconButtonVariants = {
      hidden: { opacity: 0, x: "-100%" },
      visible: (open: boolean) => ({
        opacity: open ? 1 : 0,
        transform: open ? "translateX(0)" : "translateX(-100%)",
      }),
    };

    return (
      <AnimatePresence mode="wait">
        <>
          <motion.div
            onClick={props.onClose}
            data-state={state}
            className={cn(
              "fixed hidden inset-0 z-50 bg-background/80 backdrop-blur-sm fade-in transition-all duration-100 pointer-events-auto data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
            )}
            data-aria-hidden="true"
            aria-hidden="true"
            custom={props.open}
            variants={backdropVariants}
            animate="visible"
            initial="hidden"
          />
          <motion.div
            data-state={state}
            className={cn(
              "fixed inset-y-0 left-0 transition-all z-50 w-[300px] duration-300 bg-background dark:text-slate-100 dark:bg-slate-900 shadow-lg border-r border-border dark:border-border-dark"
            )}
            data-aria-hidden="true"
            aria-hidden="true"
            custom={props.open}
            variants={variants}
            animate="visible"
            initial="hidden"
            key={"drawer"}
          >
            <motion.div
              className="absolute -right-12 top-2"
              custom={props.open}
              variants={iconButtonVariants}
              animate="visible"
              initial="hidden"
            >
              <IconButton onClick={props.onClose}>
                <XIcon className="w-5 h-5" />
              </IconButton>
            </motion.div>
            {props.children}
          </motion.div>
        </>
      </AnimatePresence>
    );
  }
);

const Brand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between h-16 p-4 border-b border-border dark:border-border-dark",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>((props, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2 text-base font-medium text-left text-gray-700 transition-colors duration-200 border-b border-border dark:border-border-dark hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-100",
        props.className
      )}
      {...props}
    >
      {props.children}
    </Link>
  );
});

const Drawer = Object.assign(DrawerRoot, {
  Brand,
  // Trigger: NavigationMenuTrigger,
  // Content: NavigationMenuContent,
  // Item: NavigationMenuItem,
  // List: NavigationMenuList,
  // Viewport: NavigationMenuViewport,
  Link: NavigationMenuLink,
});

Drawer.displayName = "Drawer";

export { Drawer };
