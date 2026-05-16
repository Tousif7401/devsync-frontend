import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "DevSync AI - Turn GitHub Updates Into Social Media Posts",
  description: "Connect your GitHub repository and automatically post updates to your social media platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Performance optimizations for Windows browsers */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-geist antialiased bg-canvasWhite text-midnightInk`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
