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
        "bg-[#4C3BCF]/20",
        "border",
        "border-[#4C3BCF]/30",
        "rounded-full",
        "px-3 sm:px-4",
        "py-1 sm:py-1.5",
        "text-white",
        "transition-all duration-300",
        "hover:scale-[1.02]",
        "hover:shadow-[0_4px_16px_rgba(76,59,207,0.4)]",
        "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* "New" section - uses negative margins to extend beyond container */}
      <span className="bg-[#4C3BCF] text-white text-[10px] sm:text-xs font-semibold -ml-1.5 sm:-ml-2 px-2.5 sm:px-4 py-0.75 sm:py-1.5 rounded-full font-manrope flex-shrink-0">
        {announcement}
      </span>
      {/* Label section - just text */}
      <span className="text-xs sm:text-sm font-manrope">
        {label}
      </span>
    </motion.a>
  )
}
