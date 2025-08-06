import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold"
  color?: "default" | "muted" | "primary" | "secondary" | "accent" | "destructive"
  align?: "left" | "center" | "right" | "justify"
  className?: string
  children: React.ReactNode
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    variant = "div", 
    size = "base", 
    weight = "normal", 
    color = "default", 
    align = "left", 
    className, 
    children, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      "xs": "text-xs",
      "sm": "text-sm",
      "base": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    }

    const weightClasses = {
      "light": "font-light",
      "normal": "font-normal",
      "medium": "font-medium",
      "semibold": "font-semibold",
      "bold": "font-bold",
      "extrabold": "font-extrabold",
    }

    const colorClasses = {
      "default": "text-foreground",
      "muted": "text-muted-foreground",
      "primary": "text-primary",
      "secondary": "text-secondary-foreground",
      "accent": "text-accent-foreground",
      "destructive": "text-destructive",
    }

    const alignClasses = {
      "left": "text-left",
      "center": "text-center",
      "right": "text-right",
      "justify": "text-justify",
    }

    const variantClasses = {
      "h1": "text-4xl font-bold",
      "h2": "text-3xl font-semibold",
      "h3": "text-2xl font-semibold",
      "h4": "text-xl font-medium",
      "h5": "text-lg font-medium",
      "h6": "text-base font-medium",
      "p": "text-base",
      "span": "text-base",
      "div": "text-base",
    }

    const Component = variant as keyof JSX.IntrinsicElements

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Typography.displayName = "Typography"

export { Typography } 