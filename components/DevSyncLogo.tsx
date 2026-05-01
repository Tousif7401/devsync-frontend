'use client';

import { motion } from 'framer-motion';

interface DevSyncLogoProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export default function DevSyncLogo({ className, style, size = 200 }: DevSyncLogoProps) {
  return (
    <div className={className} style={style}>
      <div className="flex items-center gap-3">
        <img
          src="/DevPulse_LOGO_clean.png"
          alt="DevPulse Logo"
          width={size * 0.5}
          height={size * 0.2}
          style={{ display: 'block' }}
        />
        <span className="text-xl font-bold text-white font-heading" style={{ letterSpacing: '-0.5px' }}>
          DevSync AI
        </span>
      </div>
    </div>
  );
}
