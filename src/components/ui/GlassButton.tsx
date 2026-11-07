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
      "bg-gradient-to-r from-[#F6B77A] via-[#F28B82] to-[#E27D60] text-white font-bold shadow-[0_6px_20px_rgba(246,183,122,0.35)] hover:shadow-[0_10px_28px_rgba(242,139,130,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/60",
    secondary:
      "bg-[#FFFDF5] text-[#343A32] border-2 border-[#FFD6BF] hover:border-[#F28B82] hover:bg-[#FFF4DF] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm font-semibold",
    glass:
      "bg-[#FFFDF5]/90 text-[#343A32] border border-[#FFD6BF] hover:border-[#F28B82] hover:text-[#F28B82] hover:bg-[#FFF4DF] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-semibold shadow-xs",
    ghost:
      "bg-transparent text-[#77776D] hover:text-[#343A32] hover:bg-[#FFF4DF]/70 font-semibold border border-transparent hover:border-[#FFD6BF]/40",
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
    "group inline-flex items-center justify-center cursor-pointer transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28B82] focus-visible:ring-offset-2",
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
