"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/neon-button";

interface NavbarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <nav className="fixed top-0 left-0 right-0 z-[100]">
        {children}
      </nav>
    </NavbarContext.Provider>
  );
};

export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "hidden md:flex relative items-center justify-between px-4 py-6 sm:px-8 lg:px-20 w-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className }: { items: Array<{ name: string; link: string }>; className?: string }) => {
  return (
    <div className={cn("hidden md:flex items-center gap-8", className)}>
      {items.map((item, idx) => (
        <a
          key={`nav-link-${idx}`}
          href={item.link}
          className="relative text-white hover:text-white/80 transition-colors text-base font-normal font-heading"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, isOpen }: { children: React.ReactNode; className?: string; isOpen?: boolean }) => {
  return <div className={cn("md:hidden", isOpen && "bg-darkBg", className)}>{children}</div>;
};

export const MobileNavHeader = ({ children, className, isOpen }: { children: React.ReactNode; className?: string; isOpen?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("flex items-center justify-between px-6 py-4 transition-colors duration-300", (isScrolled || isOpen) && "bg-darkBg", className)}>
      {children}
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <a href="#" className="text-xl font-semibold text-white tracking-tight font-heading">
      DevSync AI
    </a>
  );
};

export const NavbarButton = ({
  variant = "primary",
  children,
  className,
  onClick,
}: {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const variantMap = {
    primary: "solid",
    secondary: "ghost",
  } as const;

  return (
    <Button
      onClick={onClick}
      variant={variantMap[variant]}
      className={cn("!px-6 !py-2 rounded-lg font-normal !text-base", className, variant === "secondary" && "!bg-[#1a1a1a] hover:!bg-[#2a2a2a] border-gray-700")}
    >
      {children}
    </Button>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
};

export const MobileNavMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-darkBg border-b border-white/5"
        >
          <div className="px-6 py-4 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
