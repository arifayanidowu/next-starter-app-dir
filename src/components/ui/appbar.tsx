import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const appBarVariants = cva(
  "flex fixed inset-0 items-center justify-between h-16 px-4 border-b border-border dark:border-border-dark",
  {
    variants: {
      variant: {
        default: "bg-background text-background-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info text-info-foreground",
        warning: "bg-orange-600",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const AppBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof appBarVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(appBarVariants({ variant }), className)}
    {...props}
  />
));

AppBar.displayName = "AppBar";

export { AppBar };
