import { motion } from 'framer-motion';
import { Mail, Link as LinkIcon, Globe, Send, Dribbble } from 'lucide-react';

interface SocialIconBlockProps {
  containerSize?: number;
  backgroundColor?: string;
  iconColor?: string;
  strokeWidth?: number;
  borderRadius?: number;
  href?: string;
  icon: 'X' | 'Mail' | 'Instagram' | 'GitHub' | 'Website' | 'Telegram' | 'LinkedIn' | 'Dribbble' | 'Link' | 'Gemini' | 'Vercel';
  withShadow?: boolean;
  hoverLift?: boolean;
  openInNew?: boolean;
  className?: string;
}

// Custom X (Twitter) SVG Logo with brand colors
const XLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#000000" />
    <path d="M46.5 15 H51 L38 32 L53 49 H45.5 L36 35.5 L25 49 H16 L29.5 32 L15 15 H22.5 L31.5 28 L42 15 Z M43 44 L26 20 H23 L40 44 H43 Z" fill="white"/>
  </svg>
);

// Custom Vercel SVG Logo with brand colors
const VercelLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#000000" />
    <path d="M32 18 L52 50 H12 L32 18 Z" fill="white"/>
  </svg>
);

// GitHub Logo with brand colors
const GitHubLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#24292F" />
    <path d="M32 16 C23.16 16 16 23.16 16 32 C16 39.84 21.52 46.39 29 47.92 C29.84 48.08 30.12 47.52 30.12 47.04 L30.12 44.32 C26.4 45.12 25.36 42.64 25.36 42.64 C24.56 40.64 23.44 40.08 23.44 40.08 C21.84 39.2 23.52 39.2 23.52 39.2 C25.28 39.36 26.24 40.96 26.24 40.96 C27.76 43.52 30.24 42.8 31.2 42.4 C31.36 41.44 31.76 40.72 32.16 40.32 C28.48 39.92 24.56 38.48 24.56 31.84 C24.56 30 25.2 28.48 26.24 27.28 C26.08 26.88 25.44 25.2 26.32 22.88 C26.32 22.88 27.76 22.4 30.16 24.56 C31.52 24.16 32.96 24 34.4 24 C35.84 24 37.28 24.16 38.64 24.56 C41.04 22.4 42.48 22.88 42.48 22.88 C43.36 25.2 42.72 26.88 42.56 27.28 C43.6 28.48 44.24 30 44.24 31.84 C44.24 38.48 40.32 39.92 36.64 40.32 C37.2 40.8 37.68 41.76 37.68 43.2 L37.68 47.04 C37.68 47.52 37.96 48.08 38.8 47.92 C46.32 46.39 51.84 39.84 51.84 32 C51.84 23.16 44.68 16 35.84 16 L32 16 Z" fill="white"/>
  </svg>
);

// LinkedIn Logo with brand colors
const LinkedInLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#0077B5" />
    <path d="M22 26 H26 V44 H22 V26 Z M24 20 C22.9 20 22 19.1 22 18 C22 16.9 22.9 16 24 16 C25.1 16 26 16.9 26 18 C26 19.1 25.1 20 24 20 Z M30 26 H34 V28.2 C34.8 27.2 36.2 26 38.4 26 C42.6 26 44 28.4 44 32.8 V44 H40 V33.6 C40 31.4 39.2 30.4 37.6 30.4 C35.6 30.4 34.4 31.8 34.4 33.6 V44 H30 V26 Z" fill="white"/>
  </svg>
);

// Instagram Logo with brand gradient
const InstagramLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="50%" stopColor="#FD1D1D" />
        <stop offset="100%" stopColor="#F77737" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#instagramGradient)" />
    <rect x="20" y="20" width="24" height="24" rx="6" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="32" cy="32" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="40" cy="24" r="1.5" fill="white"/>
  </svg>
);

// Gemini Logo (official Google Gemini branding)
const GeminiLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* Background circle with gradient */}
    <circle cx="32" cy="32" r="30" fill="url(#geminiGradient)" />
    {/* Gemini symbol - four-point star */}
    <path d="M32 8 L38 26 L56 32 L38 38 L32 56 L26 38 L8 32 L26 26 Z" fill="white" opacity="0.95"/>
  </svg>
);

export default function SocialIconBlock({
  containerSize = 40,
  backgroundColor = 'transparent',
  iconColor = '#FFFFFF',
  strokeWidth = 2,
  borderRadius = 8,
  href = '#',
  icon,
  withShadow = false,
  hoverLift = true,
  openInNew = false,
  className = '',
}: SocialIconBlockProps) {
  const sizePx = containerSize;
  const iconPx = Math.round(containerSize * 0.5);

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizePx,
    height: sizePx,
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    cursor: 'pointer',
    boxShadow: withShadow ? '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)' : 'none',
    textDecoration: 'none',
  };

  const hoverAnimation = {
    scale: hoverLift ? 1.1 : 1,
    y: hoverLift ? -2 : 0,
    boxShadow: withShadow ? '0 8px 16px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)' : 'none',
  };

  const iconProps = { size: iconPx, color: iconColor, strokeWidth };

  // Direct component rendering
  const renderIcon = () => {
    switch (icon) {
      case 'X':
        return <XLogo size={iconPx} />;
      case 'Mail':
        return <Mail {...iconProps} />;
      case 'Instagram':
        return <InstagramLogo size={iconPx} />;
      case 'GitHub':
        return <GitHubLogo size={iconPx} />;
      case 'Website':
        return <Globe {...iconProps} />;
      case 'Telegram':
        return <Send {...iconProps} />;
      case 'LinkedIn':
        return <LinkedInLogo size={iconPx} />;
      case 'Dribbble':
        return <Dribbble {...iconProps} />;
      case 'Vercel':
        return <VercelLogo size={iconPx} />;
      case 'Gemini':
        return <GeminiLogo size={iconPx} />;
      default:
        return <LinkIcon {...iconProps} />;
    }
  };

  return (
    <motion.a
      href={href}
      style={containerStyle}
      className={className}
      whileHover={hoverAnimation}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      target={openInNew ? '_blank' : undefined}
      rel={openInNew ? 'noopener noreferrer' : undefined}
    >
      {renderIcon()}
    </motion.a>
  );
}
