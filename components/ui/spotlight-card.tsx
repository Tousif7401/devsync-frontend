'use client';

import React, { useEffect, useRef, ReactNode, useState } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

// Global registry for all cards to update from a single event listener
const cardRegistry = new Set<HTMLDivElement>();

// Global pointer move handler
const handlePointerMove = (e: PointerEvent) => {
  const { clientX: x, clientY: y } = e;
  cardRegistry.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = x - rect.left;
    const cardY = y - rect.top;
    card.style.setProperty('--mouse-x', `${cardX}px`);
    card.style.setProperty('--mouse-y', `${cardY}px`);
  });
};

// Track if global listener is set up
let isListenerSetup = false;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [uniqueId] = useState(() => `glow-card-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!cardRef.current) return;

    // Add to registry
    cardRegistry.add(cardRef.current);

    // Set up global listener once
    if (!isListenerSetup) {
      document.addEventListener('pointermove', handlePointerMove);
      isListenerSetup = true;
    }

    return () => {
      // Remove from registry
      if (cardRef.current) {
        cardRegistry.delete(cardRef.current);
      }

      // Clean up listener if no cards left
      if (cardRegistry.size === 0) {
        document.removeEventListener('pointermove', handlePointerMove);
        isListenerSetup = false;
      }
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: any = {
      '--base': base,
      '--spread': spread,
      '--radius': '14px',
      '--border': '3px',
      '--spotlight-size': '200px',
      position: 'relative',
      overflow: 'hidden',
    };
    return baseStyles as React.CSSProperties;
  };

  return (
    <>
      <style>{`
        .${uniqueId} {
          background: radial-gradient(
            600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            hsl(var(--base), 50%, 60%, 0.25),
            transparent 50%
          ),
          rgba(255, 255, 255, 0.03) !important;
          border-radius: var(--radius);
        }

        .${uniqueId}::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          padding: var(--border);
          background: radial-gradient(
            500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            hsl(var(--base), 80%, 60%, 0.6),
            transparent 50%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.8;
        }
      `}</style>
      <div
        ref={cardRef}
        style={getInlineStyles()}
        className={`
          ${uniqueId}
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl
          relative
          p-4
          shadow-[0_1rem_2rem_-1rem_black]
          backdrop-blur-[5px]
          border border-white/10
          transition-all duration-300
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};

export { GlowCard }
