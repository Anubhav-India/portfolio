"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Download, Send } from "lucide-react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  icon?: "arrow" | "download" | "send" | React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  download,
  target,
  rel,
  icon,
  iconPosition = "right",
  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5 rounded-full font-medium",
    md: "px-5 py-2.5 text-sm gap-2 rounded-full font-medium",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-full font-semibold",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#315FEA] via-[#4F7BFF] to-[#8661D9] dark:from-[#5797FF] dark:via-[#6B85FF] dark:to-[#9B75EF] text-white shadow-[0_6px_20px_rgba(49,95,234,0.28)] dark:shadow-[0_6px_24px_rgba(87,151,255,0.35)] hover:shadow-[0_10px_28px_rgba(49,95,234,0.42)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/20",
    secondary:
      "bg-white/90 dark:bg-[#151E30]/80 backdrop-blur-md text-[var(--text-dark)] border border-[var(--glass-border)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm",
    glass:
      "glass-card text-[var(--text-dark)] hover:text-[var(--accent-primary)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-dark)] hover:bg-black/5 dark:hover:bg-white/5",
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (icon === "arrow") {
      return (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      );
    }
    if (icon === "download") {
      return (
        <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      );
    }
    if (icon === "send") {
      return (
        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      );
    }
    return icon;
  };

  const classes = cn(
    "group inline-flex items-center justify-center cursor-pointer transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4776E6] focus-visible:ring-offset-2",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
        className={classes}
      >
        {icon && iconPosition === "left" && renderIcon()}
        <span>{children}</span>
        {icon && iconPosition === "right" && renderIcon()}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && iconPosition === "left" && renderIcon()}
      <span>{children}</span>
      {icon && iconPosition === "right" && renderIcon()}
    </button>
  );
};
