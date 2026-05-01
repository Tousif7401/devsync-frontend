"use client";

import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-8">
            Built and launched PulseSync from scratch - a platform that transforms your GitHub activity into engaging social media content
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
              alt="coding"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=500&fit=crop"
              alt="development"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-8">
            Started the journey with a simple idea - developers should share their work more easily
          </p>
          <p className="text-gray-400 text-xs md:text-sm font-normal mb-8">
            Built the initial prototype with Next.js and GitHub integration
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop"
              alt="code review"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop"
              alt="team collaboration"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-4">
            Recent updates and improvements
          </p>
          <div className="mb-8 space-y-2">
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm">
              ✅ GitHub OAuth integration
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm">
              ✅ AI-powered content generation
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm">
              ✅ Multi-platform publishing
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm">
              ✅ Real-time webhook processing
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm">
              ✅ Customizable post templates
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=500&fit=crop"
              alt="dashboard"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
              alt="analytics"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Timeline
        data={data}
        title="PulseSync Journey"
        subtitle="From idea to reality - tracking our development milestones"
      />
    </div>
  );
}
