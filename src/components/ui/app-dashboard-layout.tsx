import * as React from "react";
import { cn } from "@/lib/utils";

const AppDashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <main
      className={cn(
        "md:absolute relative right-0 w-screen md:w-[calc(100%-300px)] h-screen bg-background py-20 px-4",
        props.className
      )}
      {...props}
      ref={ref}
    >
      {props.children}
    </main>
  );
});

export { AppDashboardLayout };
