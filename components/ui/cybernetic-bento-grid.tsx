'use client';

import React, { useEffect, useRef } from 'react';
import { BarChart3, Globe, Shield, Database, Zap, Terminal } from 'lucide-react';

interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

// Reusable BentoItem component with mouse-tracking spotlight effect
const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={itemRef} className={`bento-item ${className || ''}`}>
      {children}
    </div>
  );
};

// Main Component
export const CyberneticBentoGrid = () => {
  return (
    <div className="cybernetic-bento-container">
      <div className="w-full max-w-6xl mx-auto z-10 px-4">
        <div className="bento-grid">
          {/* Large Feature - Real-time Analytics */}
          <BentoItem className="col-span-2 row-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5235ef] to-[#FF6B6B] flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Real-time Analytics</h2>
              </div>
              <p className="mt-3 text-gray-400 leading-relaxed">
                Monitor your content performance with up-to-the-second data streams and visualizations. Track engagement, reach, and growth across all platforms.
              </p>
            </div>
            <div className="mt-6 h-48 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5235ef]/10 via-transparent to-[#FF6B6B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10x</div>
                  <div className="text-xs text-gray-500 mt-1">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5235ef]">+247%</div>
                  <div className="text-xs text-gray-500 mt-1">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6B6B]">5.2K</div>
                  <div className="text-xs text-gray-500 mt-1">Reach</div>
                </div>
              </div>
            </div>
          </BentoItem>

          {/* Global CDN */}
          <BentoItem>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-[#5235ef]" />
              <h2 className="text-lg font-bold text-white">Multi-Platform Sync</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              Post to LinkedIn, X, and Instagram simultaneously with platform-optimized content.
            </p>
          </BentoItem>

          {/* Secure Auth */}
          <BentoItem>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-bold text-white">Privacy First</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              We only read commit metadata. Your actual code never leaves your repository.
            </p>
          </BentoItem>

          {/* Automated Backups */}
          <BentoItem className="row-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-[#FF6B6B]" />
              <h2 className="text-lg font-bold text-white">Smart History</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              Every generated post is saved. Review, edit, and reuse your best-performing content.
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#5235ef] to-[#FF6B6B] rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500">75% content reuse rate</div>
            </div>
          </BentoItem>

          {/* Serverless Functions */}
          <BentoItem className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-white">Instant Generation</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              AI-powered content generation in seconds. No manual writing required—just push your code and we handle the rest.
            </p>
          </BentoItem>

          {/* CLI Tool */}
          <BentoItem>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">GitHub Integrated</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              Connect your repo in one click. Works with your existing workflow seamlessly.
            </p>
          </BentoItem>
        </div>
      </div>
    </div>
  );
};
