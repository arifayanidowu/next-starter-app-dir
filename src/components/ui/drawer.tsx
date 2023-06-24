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
            id="drawer-backdrop"
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
            ref={ref}
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

DrawerRoot.displayName = "Drawer";

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

Brand.displayName = "Drawer.Brand";

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full h-full p-4 overflow-y-auto", props.className)}
      {...props}
    >
      {props.children}
    </div>
  );
});

NavigationMenuContent.displayName = "Drawer.NavigationMenuContent";

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col w-full rounded-md overflow-hidden my-2 transition-all hover:bg-gray-100 dark:bg-transparent dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-slate-100 active:bg-gray-100 dark:active:bg-slate-800/30",
          active &&
            "bg-gray-100 dark:bg-slate-800/80 text-gray-900 dark:text-slate-100",
          props.className
        )}
        {...props}
      />
    );
  }
);

NavigationMenu.displayName = "Drawer.NavigationMenu";

interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  iconleft?: React.ReactNode;
  iconright?: React.ReactNode;
}

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<"a">,
  NavigationMenuLinkProps
>((props, ref) => {
  // lookup backdrop element
  const backdrop =
    typeof window !== "undefined"
      ? window.document.getElementById("drawer-backdrop")
      : null;
  // close drawer on link click
  function handleClick() {
    if (backdrop) {
      backdrop.click();
    }
  }

  return (
    <div>
      <Link
        ref={ref}
        className={cn(
          "flex items-center gap-4 w-full px-4 py-3 text-base font-medium text-left text-gray-800 transition-colors duration-200 dark:text-slate-50 ",
          props.className
        )}
        onClick={handleClick}
        {...props}
      >
        {props.iconleft && <div>{props.iconleft}</div>}
        {props.children}
        {props.iconright && (
          <div
            className={cn(
              "items-center flex-grow flex-shrink-0 flex justify-end w-4 h-4 text-gray-400 dark:text-slate-600"
            )}
          >
            {props.iconright}
          </div>
        )}
      </Link>
    </div>
  );
});

NavigationMenuLink.displayName = "Drawer.NavigationMenuLink";

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center absolute bottom-0 w-full justify-between px-5 h-[4.4rem] border-t border-border dark:border-border-dark",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

Footer.displayName = "Drawer.Footer";

const Drawer = Object.assign(DrawerRoot, {
  Brand,
  Content: NavigationMenuContent,
  NavigationMenu,
  NavigationMenuLink: NavigationMenuLink,
  Footer,
});

export { Drawer };
