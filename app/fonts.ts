import { Inter, JetBrains_Mono } from 'next/font/google'

// Titan Design System Fonts
// Geist is substituted with Inter
// Geist Mono is substituted with JetBrains Mono

export const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['400', '500'],
})
