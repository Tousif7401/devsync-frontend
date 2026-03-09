import type { Metadata } from "next";
import { inter, poppins, quattrocento, spaceGrotesk, manrope, playfairDisplay, plusJakartaSans, dmSans } from "./fonts";
import "./globals.css";

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
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${quattrocento.variable} ${spaceGrotesk.variable} ${manrope.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
