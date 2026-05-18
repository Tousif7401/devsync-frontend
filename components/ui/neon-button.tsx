import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border mx-auto text-center rounded-buttons font-geist",
    {
        variants: {
            variant: {
                default: "bg-white/5 hover:bg-white/10 border-white/15 text-white transition-all duration-200",
                solid: "bg-actionBlack hover:bg-midnightInk border-actionBlack text-canvasWhite transition-all duration-200",
                ghost: "bg-white/5 hover:bg-white/10 border-white/10 text-white transition-colors",
                hollow: "bg-white/5 hover:bg-white/10 border-white/10 text-white transition-colors",
            },
            size: {
                default: "px-6 py-2.5 ",
                sm: "px-4 py-1.5 ",
                lg: "px-10 py-3 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
