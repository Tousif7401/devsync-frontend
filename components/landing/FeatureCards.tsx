'use client';

import { motion, AnimatePresence } from 'framer-motion';
import CardSwap, { Card } from '@/components/ui/CardSwap';
import Safari_01 from '@/components/ui/safari-01';
import { X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnalyticsDemo, AutomationDemo, PrivacyDemo, MultiPlatformDemo, HistoryDemo, GitHubDemo } from '@/components/landing/FeatureShowcase';

// Duotone Palette: White (#FFFFFF) + Acid Green (#CCFF00)
const AnalyticsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <path d="M12 32 L18 24 L24 28 L30 18 L36 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="24" r="2.5" fill="white" opacity="0.6"/>
    <circle cx="24" cy="28" r="2.5" fill="white" opacity="0.7"/>
    <circle cx="30" cy="18" r="2.5" fill="white" opacity="0.6"/>
    <circle cx="36" cy="22" r="2.5" fill="#CCFF00"/>
    <rect x="10" y="34" width="28" height="2" rx="1" fill="white" opacity="0.2"/>
  </svg>
);

const AutomationIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <path d="M20 12 L28 20 L20 20 L20 12Z" fill="white" opacity="0.6"/>
    <path d="M28 28 L20 36 L28 36 L28 28Z" fill="white" opacity="0.6"/>
    <circle cx="24" cy="24" r="4" stroke="#CCFF00" strokeWidth="2.5" fill="none"/>
    <circle cx="24" cy="24" r="1.5" fill="#CCFF00"/>
    <path d="M32 24 L40 24 M36 20 L40 24 L36 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    <path d="M8 24 L16 24 M12 20 L8 24 L12 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const PrivacyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <rect x="14" y="14" width="20" height="20" rx="4" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M18 18 L30 18 L30 22 L18 22 Z" fill="white" opacity="0.2"/>
    <path d="M18 26 L30 26 L30 30 L18 30 Z" fill="white" opacity="0.3"/>
    <circle cx="28" cy="16" r="2.5" fill="#CCFF00"/>
  </svg>
);

const MultiPlatformIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <circle cx="24" cy="24" r="6" fill="#CCFF00"/>
    <circle cx="36" cy="16" r="3.5" fill="white" opacity="0.5"/>
    <circle cx="12" cy="32" r="3.5" fill="white" opacity="0.5"/>
    <circle cx="36" cy="32" r="3.5" fill="white" opacity="0.5"/>
    <circle cx="12" cy="16" r="3.5" fill="white" opacity="0.5"/>
    <path d="M24 18 L30 14" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    <path d="M24 30 L18 34" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    <path d="M30 18 L34 16" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    <path d="M18 30 L14 32" stroke="white" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <path d="M24 12 L24 24 L34 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="24" cy="24" r="3" fill="#CCFF00"/>
    <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25"/>
    <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="1.5" fill="none" opacity="0.15"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="white" opacity="0.08"/>
    <circle cx="24" cy="24" r="3.5" fill="#CCFF00"/>
    <circle cx="16" cy="16" r="2" fill="white" opacity="0.5"/>
    <circle cx="32" cy="16" r="2" fill="white" opacity="0.5"/>
    <circle cx="16" cy="32" r="2" fill="white" opacity="0.5"/>
    <circle cx="32" cy="32" r="2" fill="white" opacity="0.5"/>
    <path d="M20 20 L28 28 M28 20 L20 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const features = [
  {
    id: 'analytics',
    icon: AnalyticsIcon,
    title: 'Real-time Analytics',
    description: 'Track engagement, reach, and growth across all platforms with detailed insights.',
    color: 'from-[#CCFF00] to-[#B3E600]',
    stat: '4.2% Engagement',
    detailTitle: 'Data-Driven Insights',
    demo: AnalyticsDemo,
    detailContent: 'Monitor engagement rates, reach, impressions, and growth patterns in real-time. Our analytics dashboard helps you understand what content resonates with your audience, allowing you to refine your strategy and maximize impact. Visualize your growth with beautiful charts and actionable insights.',
    stats: [
      { label: 'Avg. Engagement', value: '4.2%' },
      { label: 'Weekly Growth', value: '+127%' },
      { label: 'Posts Tracked', value: '2.4K' },
    ]
  },
  {
    id: 'automation',
    icon: AutomationIcon,
    title: 'Instant Generation',
    description: 'AI-powered content creation in seconds after every commit.',
    color: 'from-white to-gray-200',
    stat: '< 3s Generation',
    detailTitle: 'Zero-Wait Workflow',
    demo: AutomationDemo,
    detailContent: 'Push your code and watch DevSync AI instantly transform your commits into engaging social media posts. No manual writing, no copy-pasting, no delays. Just seamless automation that keeps your presence active while you focus on coding. The AI understands your technical work and translates it into compelling narratives.',
    stats: [
      { label: 'Generation Time', value: '< 3s' },
      { label: 'Posts Created', value: '10K+' },
      { label: 'Time Saved', value: '8hrs/wk' },
    ]
  },
  {
    id: 'privacy',
    icon: PrivacyIcon,
    title: 'Privacy First',
    description: 'Your code stays private. We only read commit metadata.',
    color: 'from-[#CCFF00]/90 to-[#B3E600]/80',
    stat: 'Zero Code Access',
    detailTitle: 'Enterprise Security',
    demo: PrivacyDemo,
    detailContent: 'Your code stays in your repo. We only read commit metadata. Your intellectual property remains completely private and secure. DevSync AI only accesses commit messages, branch names, and PR descriptions—never your actual source code. Your proprietary logic and implementation details are never exposed or stored.',
    stats: [
      { label: 'Code Access', value: 'Zero' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'SOC2', value: 'Ready' },
    ]
  },
  {
    id: 'multiplatform',
    icon: MultiPlatformIcon,
    title: 'Multi-Platform',
    description: 'Post to LinkedIn, X, and Instagram simultaneously.',
    color: 'from-gray-100 to-gray-300',
    stat: '3+ Platforms',
    detailTitle: 'Everywhere at Once',
    demo: MultiPlatformDemo,
    detailContent: 'Post to LinkedIn, X, and Instagram simultaneously. Each platform receives optimized content tailored to its unique format and audience. Maintain consistent presence across all major social platforms with a single push. Technical depth for LinkedIn, brevity for X, visuals for Instagram—all automatically formatted.',
    stats: [
      { label: 'Platforms', value: '3+' },
      { label: 'Reach Multiplier', value: '3.5x' },
      { label: 'Sync Time', value: 'Instant' },
    ]
  },
  {
    id: 'history',
    icon: HistoryIcon,
    title: 'Smart History',
    description: 'Reuse and refine your best-performing content effortlessly.',
    color: 'from-white to-[#CCFF00]/60',
    stat: 'Unlimited Archive',
    detailTitle: 'Content Library',
    demo: HistoryDemo,
    detailContent: 'Reuse and refine your best-performing content effortlessly. Every generated post is saved and categorized for easy access. Search, filter, and reuse your top-performing content. A/B test variations and learn what drives engagement. Build a repository of your best moments that can be repurposed for maximum impact.',
    stats: [
      { label: 'Posts Archived', value: 'Unlimited' },
      { label: 'Reuse Rate', value: '73%' },
      { label: 'A/B Tests', value: 'Built-in' },
    ]
  },
  {
    id: 'github',
    icon: GitHubIcon,
    title: 'GitHub Native',
    description: 'Seamless integration with your existing development workflow.',
    color: 'from-[#CCFF00] to-gray-400',
    stat: '< 2min Setup',
    detailTitle: 'Developer-First Design',
    demo: GitHubDemo,
    detailContent: 'Seamless integration with your existing development workflow. Connect your repository in one click via GitHub OAuth. Configure branch targeting, commit message patterns, and approval workflows. DevSync AI becomes part of your CI/CD pipeline—content generation happens automatically as part of your existing process.',
    stats: [
      { label: 'Setup Time', value: '< 2min' },
      { label: 'Repos', value: 'Unlimited' },
      { label: 'Webhook', value: 'Instant' },
    ]
  },
];

export default function FeatureCards() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="powerful-features" className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading break-words">
            Powerful Features
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto break-words">
            Everything you need to turn your GitHub activity into a thriving personal brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-heading break-words">
                Everything You Need to Grow Your Brand
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed break-words">
                Six powerful features designed to transform your GitHub activity into compelling content that resonates with your audience.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed break-words">
                From real-time analytics that track your engagement to instant AI-powered content generation, DevSync AI handles it all. Your code stays private while your brand grows.
              </p>
              <p className="text-gray-400 leading-relaxed break-words">
                Connect once, post everywhere. LinkedIn, X, and Instagram—all synchronized automatically with platform-optimized content.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5235ef]/10 border border-[#5235ef]/30">
                <span className="text-[#5235ef] text-sm font-medium">Click cards for details</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - CardSwap Animation inside Browser */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center w-full"
          >
            <Safari_01>
              <div className="mt-12 sm:mt-16 w-full flex items-center justify-center">
                <CardSwap
                  width={320}
                  height={240}
                  cardDistance={40}
                  verticalDistance={45}
                  delay={2000}
                  pauseOnHover={true}
                  skewAmount={3}
                >
                  {features.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card key={feature.id} customClass="p-4 sm:p-5 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform group relative" onClick={() => setSelectedFeature(feature)}>
                        <div>
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-2 sm:mb-3 p-2 sm:p-3 hover:border-[#8B5CF6]/30 transition-colors">
                            <IconComponent />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 font-heading">{feature.title}</h3>
                          <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">{feature.description}</p>
                        </div>
                        <div className="text-[10px] sm:text-xs font-semibold text-white">
                          {feature.stat}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                            Click me!
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white rotate-45"></div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </Safari_01>
          </motion.div>
        </div>
      </div>

      {/* Popup Dialog - Rendered using Portal to avoid stacking context issues */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  rotateX: 15,
                  y: 40
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotateX: 0,
                  y: 0
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  rotateX: -15,
                  y: 40
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  rotateX: { type: "spring", damping: 20, stiffness: 300 }
                }}
                style={{ transformStyle: "preserve-3d", scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                className="bg-[#111111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-shrink-0 p-4">
                    <selectedFeature.icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{selectedFeature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedFeature.description}</p>
                  </div>
                </div>

                {/* Detail Title */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">{selectedFeature.detailTitle}</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedFeature.detailContent}</p>
                </div>

                {/* Demo Animation */}
                <div className="mb-6">
                  {selectedFeature.demo && <selectedFeature.demo />}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {selectedFeature.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
