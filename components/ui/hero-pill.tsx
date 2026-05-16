import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroPillProps {
  href: string
  label: string
  announcement?: string
  className?: string
  isExternal?: boolean
}

export default function HeroPill({
  href,
  label,
  announcement = "New",
  className,
  isExternal = false,
}: HeroPillProps) {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      className={cn(
        "inline-flex items-center gap-2",
        "bg-offWhiteSage",
        "border",
        "border-fadedStone",
        "rounded-buttons",
        "px-3 sm:px-4",
        "py-1 sm:py-1.5",
        "text-midnightInk",
        "transition-colors duration-300",
        "hover:scale-[1.02]",
        "hover:bg-softConcrete",
        "hover:border-gunmetalGray",
        "cursor-pointer",
        "font-geist",
        "text-xs sm:text-sm",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* "New" section - uses negative margins to extend beyond container */}
      <span className="bg-actionBlack text-canvasWhite text-[10px] sm:text-xs font-bold -ml-1.5 sm:-ml-2 px-2.5 sm:px-4 py-0.75 sm:py-1.5 rounded-buttons font-geist flex-shrink-0">
        {announcement}
      </span>
      {/* Label section - just text */}
      <span className="font-geist font-medium">
        {label}
      </span>
    </motion.a>
  )
}
