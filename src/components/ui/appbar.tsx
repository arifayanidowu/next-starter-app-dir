import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const appBarVariants = cva(
  "flex fixed w-full md:w-[calc(100%-300px)] backdrop-blur-sm top-0 items-center justify-between h-16 md:px-0 px-1 border-b border-border dark:border-border-dark",
  {
    variants: {
      variant: {
        default: "bg-background/80 text-background-foreground",
        primary: "bg-primary/80 text-primary-foreground",
        secondary: "bg-secondary/80  text-secondary-foreground",
        info: "bg-info/80  text-info-foreground",
        warning: "bg-orange-600/80",
        error: "bg-destructive/80 text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const AppBarRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof appBarVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(appBarVariants({ variant }), className)}
    {...props}
  />
));

AppBarRoot.displayName = "AppBarRoot";

const Brand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between h-16 p-4",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

Brand.displayName = "AppBar.Brand";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof Image> {
  asChild?: boolean;
}

const Avatar = React.forwardRef<React.ElementRef<typeof Image>, AvatarProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Image;
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-center w-10 h-10 aspect-w-10 rounded-full object-center object-cover bg-gray-300",
          props.className
        )}
        width={50}
        height={50}
        priority
        {...props}
      />
    );
  }
);

Avatar.displayName = "AppBar.Avatar";

const Menu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-2 h-16 p-4",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

Menu.displayName = "AppBar.Menu";

interface ActiveIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

const ActiveIndicator = React.forwardRef<HTMLSpanElement, ActiveIndicatorProps>(
  (props, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute opacity-0 transition-all bottom-0 left-0 group-hover:opacity-100 group-hover:inline-block w-full h-[2px] dark:bg-white bg-black",
          props.active && "opacity-100 inline-block"
        )}
        {...props}
      />
    );
  }
);

ActiveIndicator.displayName = "AppBar.ActiveIndicator";

interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  active?: boolean;
  asChild?: boolean;
}

const MenuItem = React.forwardRef<React.ElementRef<typeof Link>, MenuItemProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex relative group items-center justify-between p-4 h-16",
          props.className
        )}
        {...props}
      >
        {props.children}
        <ActiveIndicator active={props?.active} />
      </Comp>
    );
  }
);

MenuItem.displayName = "AppBar.MenuItem";

const AppBar = Object.assign(AppBarRoot, {
  Brand,
  Menu,
  MenuItem,
  ActiveIndicator,
  Avatar,
});

AppBar.displayName = "AppBar";

export { AppBar };
