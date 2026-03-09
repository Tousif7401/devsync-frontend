"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface Safari_01Props {
  children?: React.ReactNode
  className?: string
  contentPadding?: string
  minHeight?: string
  minWidth?: string
}

const Safari_01: React.FC<Safari_01Props> = ({ children, className, contentPadding = "pt-32", minHeight = "min-h-[450px]", minWidth = "min-w-[700px]" }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden min-w-full sm:min-w-[500px] md:min-w-[600px] lg:" + minWidth,
        className
      )}
    >
      {/* Browser top bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#141414] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full" />
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4 bg-white/5 rounded-full h-5 sm:h-7 max-w-[150px] sm:max-w-md flex items-center px-2 sm:px-3">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2" />
          <span className="text-[10px] sm:text-xs text-gray-500">devsync.ai</span>
        </div>
        <div className="w-3 h-3 sm:w-4 sm:h-4" /> {/* Placeholder for right side icons */}
      </div>

      {/* Content area */}
      <div className={`bg-[#0a0a0a] px-4 sm:px-6 md:px-8 overflow-hidden min-h-[300px] sm:min-h-[400px] md:${minHeight} ${contentPadding} sm:${contentPadding}`}>
        {children || (
          <div className="text-sm text-gray-500">
            No content
          </div>
        )}
      </div>
    </div>
  )
}

export default Safari_01
