'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, FileText, Settings, BarChart3, Clock, LogOut, Menu, X, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: FileText, label: 'Posts', href: '/dashboard/posts' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Clock, label: 'Schedule', href: '/dashboard/schedule' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-[65px]' : 'w-[250px]'}
          bg-[#111111] border-r border-white/10
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center border-b border-white/10 px-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/5 rounded-lg text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center flex-1 gap-3 min-w-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center hover:bg-white/5 rounded-lg p-1 transition-all"
            >
              <Image
                src="/DevPulse_LOGO_clean.png"
                alt="DevSync AI"
                width={64}
                height={64}
                className={`shrink-0 object-contain transition-all duration-300 ${isCollapsed ? 'w-12 h-12' : 'w-8 h-8'}`}
              />
            </button>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="text-lg font-semibold text-white whitespace-nowrap"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                DevSync AI
              </motion.span>
            )}
          </div>

          {/* Collapse Toggle */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item, index) => (
            <div key={item.label} className="relative">
              <Link
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: easings.smooth }}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                    ${item.active
                      ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                      className="font-medium whitespace-nowrap"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
              {/* Tooltip for collapsed state */}
              <AnimatePresence>
                {isCollapsed && hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-[70px] top-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-white/10 px-3 py-2 rounded-lg text-white text-sm font-medium whitespace-nowrap z-50 shadow-xl"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/10">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3, ease: easings.smooth }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="font-medium whitespace-nowrap"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Logout
              </motion.span>
            )}
          </motion.button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-30 w-10 h-10 bg-[#111111] border border-white/10 rounded-lg flex items-center justify-center text-white"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main content */}
      <main
        className={`
          overflow-auto transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:flex-[calc(100%-65px)]' : 'lg:flex-[calc(100%-250px)]'}
          flex-1
        `}
      >
        {children}
      </main>
    </div>
  );
}
