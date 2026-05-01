import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-white mx-auto text-center rounded-lg",
    {
        variants: {
            variant: {
                default: "bg-[#4c3bcf]/5 hover:bg-[#4c3bcf]/0 border-[#4c3bcf]/20",
                solid: "bg-[#4c3bcf] hover:bg-[#3d2fa6] border-transparent hover:border-white/50 transition-all duration-200",
                ghost: "bg-transparent border-gray-700 hover:border-[#4c3bcf] hover:text-[#4c3bcf] hover:bg-transparent transition-colors",
                hollow: "bg-transparent hover:bg-[#4c3bcf]/10 border-[#4c3bcf]",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
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
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#8b7cf5] via-[#4c3bcf] to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#8b7cf5] via-[#4c3bcf] to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
