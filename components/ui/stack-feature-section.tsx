"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Vercel icon component
function VercelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="white">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  );
}

// Gemini icon component
function GeminiIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/GEMINI.webp"
      alt="Gemini"
      width={32}
      height={32}
      className={className}
    />
  );
}

const iconConfigs = [
  { Icon: Github, color: "#ffffff", bgColor: "#333333", name: "GitHub", rotation: 180 },
  { Icon: XIcon, color: "#ffffff", bgColor: "#000000", name: "X", rotation: 180 },
  { Icon: Linkedin, color: "#ffffff", bgColor: "#0077B5", name: "LinkedIn", rotation: 0 },
  { Icon: Instagram, color: "#ffffff", bgColor: "#E1306C", name: "Instagram", rotation: 180 },
  { Icon: GeminiIcon, color: "#ffffff", bgColor: "#4285F4", name: "Gemini", rotation: 180 },
  { Icon: VercelIcon, color: "#ffffff", bgColor: "#000000", name: "Vercel", rotation: 0 },
];

export default function StackFeatureSection() {
  const orbitCount = 2;
  const orbitGap = 10;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <div className="relative max-w-6xl mx-auto my-32">
      <section className="relative flex items-center justify-between h-[30rem] border border-white/30 overflow-hidden rounded-3xl shadow-2xl">
        {/* Solid background layer */}
        <div className="absolute inset-0 bg-transparent z-0"></div>

        {/* Content layer */}
        <div className="relative z-10 flex items-center justify-between w-full h-full">
          {/* Left side: Heading and Text */}
          <div className="w-1/2 pl-9 pr-8">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white">
              Build your brand
            </h1>
            <p className="text-gray-400 mb-6 max-w-lg">
              DevSync AI seamlessly integrates with your development workflow. Connect your repositories and let every commit become engaging content.
            </p>
          </div>

          {/* Right side: Orbit animation */}
          <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden">
        <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
          {/* Center Circle with DevPulse Logo */}
          <div className="w-28 h-28 rounded-full bg-white/5 backdrop-blur-sm shadow-2xl flex items-center justify-center border-2 border-white/20 relative z-20">
            <Image
              src="/DevPulse_LOGO_clean.png"
              alt="DevPulse Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${14 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;
            const startIdx = orbitIdx * iconsPerOrbit;
            const orbitIcons = iconConfigs.slice(startIdx, startIdx + iconsPerOrbit);

            // Adjust positions for better spacing with 6 icons
            const adjustedIcons = orbitIdx === 0
              ? orbitIcons.slice(0, 3) // First orbit: 3 icons
              : orbitIcons.slice(0, 3); // Second orbit: 3 icons

            const adjustedAngleStep = (2 * Math.PI) / adjustedIcons.length;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-white/20"
                style={{
                  width: size,
                  height: size,
                  animation: `${orbitIdx === 0 ? 'spin' : 'spin-reverse'} ${15 + orbitIdx * 8}s linear infinite`,
                }}
              >
                {adjustedIcons.map((cfg, iconIdx) => {
                  const angle = iconIdx * adjustedAngleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={iconIdx}
                      className="absolute z-10 group"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Icon circle - rotates with orbit */}
                      <div
                        className="rounded-full shadow-lg border border-white/20 flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: cfg.bgColor,
                          width: "56px",
                          height: "56px",
                          transform: `rotate(${cfg.rotation || 180}deg)`,
                        }}
                      >
                        <cfg.Icon className="w-10 h-10" style={{ color: cfg.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
        </div>
      </section>
    </div>
  );
}
