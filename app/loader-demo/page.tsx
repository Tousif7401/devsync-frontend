'use client';

import { InfinityLoader } from "@/components/ui/loader-13";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function InfinityLoaderDemo() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      color: "hover:bg-gray-100 hover:text-gray-900",
      texts: [
        "Open source contributions",
        "Star our repositories",
        "Fork and improve code",
        "Report issues & bugs",
        "Join the discussion"
      ]
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-sky-100 hover:text-sky-500",
      texts: [
        "Follow for updates",
        "Share your feedback",
        "Join the conversation",
        "Latest announcements",
        "Community highlights"
      ]
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-100 hover:text-blue-600",
      texts: [
        "Connect with us",
        "Career opportunities",
        "Company updates",
        "Professional network",
        "Industry insights"
      ]
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "hover:bg-pink-100 hover:text-pink-600",
      texts: [
        "Behind the scenes",
        "Product sneak peeks",
        "Team culture",
        "Visual stories",
        "Creative inspiration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with Loader */}
      <div className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          Loading Experience
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12 text-center max-w-md">
          A smooth infinity loader animation while we prepare your content
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 mb-8">
          <InfinityLoader
            size={120}
            className="[&>svg>path:last-child]:stroke-blue-500"
          />
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          Loading your experience...
        </p>
      </div>

      {/* Social Links Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
          Connect With Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <div
                key={social.name}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 ${social.color} transition-colors duration-300`}>
                  <Icon size={32} className="text-slate-700 dark:text-slate-300" />
                </div>

                {/* Platform Name */}
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-center mb-4">
                  {social.name}
                </h3>

                {/* Texts */}
                <ul className="space-y-2">
                  {social.texts.map((text, index) => (
                    <li
                      key={index}
                      className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                {/* Link Button */}
                <button
                  className={`w-full mt-4 py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm ${social.color} transition-all duration-300`}
                >
                  Follow {social.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
