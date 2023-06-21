import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center text-gray-400 dark:text-gray-50 transition-colors duration-200 rounded-full hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outlined:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        ghost:
          "bg-transparent hover:bg-accent hover:text-accent-foreground shadow-none border",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "w-10 h-10",
        sm: "w-9 h-9",
        lg: "w-11 h-11",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }
);

export { IconButton };
