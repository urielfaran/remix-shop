import { toast } from "sonner";
import { Button, ButtonProps } from "./ui/button";
import { MouseEvent } from "react";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";

type ToastTypes = "warning" | "error" | "success" | "info";

interface ToastProps extends ButtonProps {
  description: string;
  toastType: ToastTypes;
  toastTitle: string;
}

const toasterVariants = cva("", {
  variants: {
    toastVariant: {
      success:
        "group-[.toaster]:border-green-500 group-[.toaster]:border group-[.toaster]:bg-white text-primary-foreground hover:bg-primary/90",
      error:
        "text-primary-foreground hover:bg-destructive/90 group-[.toaster]:border group-[.toaster]:border-red-500",
      warning:
        "group-[.toaster]:border group-[.toaster]:bg-background hover:bg-accent hover:text-accent-foreground group-[.toaster]:border-orange-500",
      info: "group-[.toaster]:bg-secondary group-[.toaster]:text-secondary-foreground hover:bg-secondary/80 group-[.toaster]:border group-[.toaster]:border-blue-500",
    },
  },
  defaultVariants: {
    toastVariant: "info",
  },
});

export function Toaster({
  description,
  toastTitle,
  children,
  toastType,
  ...props
}: ToastProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    console.log(toastType)
    if (props.onClick) props.onClick(e);
    const className = cn(toasterVariants({ toastVariant: toastType }));
    toast[toastType](toastTitle, {
      description: description,
      className: className,
      position: 'bottom-left'
    });
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
