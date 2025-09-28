import * as React from "react";
import { cn } from "./utils";

const Navbar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    variant?: "default" | "glass" | "floating";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full px-4 lg:px-6 py-4 transition-all duration-200",
      {
        "bg-background border-b border-border-subtle": variant === "default",
        "glass border-b border-glass-border": variant === "glass",
        "glass rounded-2xl m-4 shadow-lg": variant === "floating",
      },
      className
    )}
    {...props}
  />
));
Navbar.displayName = "Navbar";

const NavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-3 font-semibold", className)}
    {...props}
  />
));
NavbarBrand.displayName = "NavbarBrand";

const NavbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("hidden md:flex items-center space-x-6", className)}
    {...props}
  />
));
NavbarContent.displayName = "NavbarContent";

const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  />
));
NavbarActions.displayName = "NavbarActions";

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
  }
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm font-medium transition-colors hover:text-foreground py-2 px-3 rounded-xl",
      {
        "text-foreground bg-accent": active,
        "text-foreground-subtle hover:text-foreground": !active,
      },
      className
    )}
    {...props}
  />
));
NavbarLink.displayName = "NavbarLink";

export { Navbar, NavbarBrand, NavbarContent, NavbarActions, NavbarLink };