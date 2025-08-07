import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

// ── Root ────────────────────────────────────────────────────────────────
const Tabs = TabsPrimitive.Root;

// ── List (the rail) ─────────────────────────────────────────────────────
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // full-width, pill-shaped rail with a subtle inner shadow
      "inline-flex w-full overflow-x-auto whitespace-nowrap rounded-full bg-gradient-to-r from-slate-100 to-slate-50 p-1 shadow-inner" +
        " dark:from-slate-800 dark:to-slate-700",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// ── Trigger (each tab) ──────────────────────────────────────────────────
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // base
      "relative inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold" +
        " text-slate-600 transition-colors duration-300 ease-out focus-visible:outline-none" +
        " focus-visible:ring-2 focus-visible:ring-[#b89773]/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" +
        // hover / active
        " hover:text-slate-900 dark:hover:text-white" +
        " data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md" +
        " dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ── Content (the panel) ────────────────────────────────────────────────
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // top-margin & focus ring in brand gold
      "mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89773]/60 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ── Exports ─────────────────────────────────────────────────────────────
export { Tabs, TabsList, TabsTrigger, TabsContent };
