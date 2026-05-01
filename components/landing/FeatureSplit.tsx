'use client';

import { motion } from 'framer-motion';
import { BarChart3, Zap, Shield, Globe, Database, Code2 } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track your content performance across all platforms with detailed insights and metrics.',
    color: 'from-[#5235ef] to-[#8771ff]',
    detailTitle: 'Data-Driven Insights',
    detailContent: 'Monitor engagement rates, reach, impressions, and growth patterns. Our analytics dashboard helps you understand what content resonates with your audience, allowing you to refine your strategy and maximize impact.',
    stats: [
      { label: 'Avg. Engagement', value: '4.2%' },
      { label: 'Weekly Growth', value: '+127%' },
      { label: 'Posts Tracked', value: '2.4K' },
    ]
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Instant Generation',
    description: 'AI-powered content creation in seconds after every commit.',
    color: 'from-[#FF6B6B] to-[#ff8e8e]',
    detailTitle: 'Zero-Wait Workflow',
    detailContent: 'Push your code and watch DevSync AI instantly transform your commits into engaging social media posts. No manual writing, no copy-pasting, no delays. Just seamless automation that keeps your presence active while you focus on coding.',
    stats: [
      { label: 'Generation Time', value: '< 3s' },
      { label: 'Posts Created', value: '10K+' },
      { label: 'Time Saved', value: '8hrs/wk' },
    ]
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy First',
    description: 'Your code stays in your repo. We only read commit metadata.',
    color: 'from-green-400 to-emerald-500',
    detailTitle: 'Enterprise Security',
    detailContent: 'We understand your code is your intellectual property. DevSync AI only accesses commit messages, branch names, and PR descriptions—never your actual source code. Your proprietary logic and implementation details remain completely private.',
    stats: [
      { label: 'Code Access', value: 'Zero' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'SOC2', value: 'Ready' },
    ]
  },
  {
    id: 'multiplatform',
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Post to LinkedIn, X, and Instagram simultaneously.',
    color: 'from-blue-400 to-indigo-500',
    detailTitle: 'Everywhere at Once',
    detailContent: 'Maintain consistent presence across all major social platforms with a single push. Each platform receives optimized content tailored to its unique format and audience—technical depth for LinkedIn, brevity for X, visuals for Instagram.',
    stats: [
      { label: 'Platforms', value: '3+' },
      { label: 'Reach Multiplier', value: '3.5x' },
      { label: 'Sync Time', value: 'Instant' },
    ]
  },
  {
    id: 'history',
    icon: Database,
    title: 'Smart History',
    description: 'Reuse and refine your best-performing content effortlessly.',
    color: 'from-purple-400 to-violet-500',
    detailTitle: 'Content Library',
    detailContent: 'Every generated post is saved and categorized. Search, filter, and reuse your top-performing content. A/B test variations and learn what drives engagement. Build a repository of your best moments that can be repurposed for maximum impact.',
    stats: [
      { label: 'Posts Archived', value: 'Unlimited' },
      { label: 'Reuse Rate', value: '73%' },
      { label: 'A/B Tests', value: 'Built-in' },
    ]
  },
  {
    id: 'github',
    icon: Code2,
    title: 'GitHub Native',
    description: 'Seamless integration with your existing development workflow.',
    color: 'from-orange-400 to-amber-500',
    detailTitle: 'Developer Experience',
    detailContent: 'Connect your repository in one click via GitHub OAuth. Configure branch targeting, commit message patterns, and approval workflows. DevSync AI becomes part of your CI/CD pipeline—content generation happens automatically as part of your existing development process.',
    stats: [
      { label: 'Setup Time', value: '< 2min' },
      { label: 'Repos Connected', value: 'Unlimited' },
      { label: 'Webhook', value: 'Instant' },
    ]
  },
];

export default function FeatureSplit() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-[#5235ef]/3 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to turn your GitHub activity into a thriving personal brand
          </p>
        </motion.div>

        {/* Two-Column Layout - Feeta AI Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature.id === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(feature)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.08] border-[#5235ef]/50 shadow-lg shadow-[#5235ef]/10'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold mb-1 ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {feature.description}
                      </p>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[#5235ef] mt-2"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Active Feature Details */}
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 p-8">
              {/* Feature Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${activeFeature.color} flex items-center justify-center shadow-lg`}>
                  <activeFeature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeFeature.detailTitle}</h3>
                  <p className="text-gray-400 text-sm mt-1">{activeFeature.title}</p>
                </div>
              </div>

              {/* Feature Description */}
              <p className="text-gray-300 leading-relaxed mb-8">
                {activeFeature.detailContent}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {activeFeature.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/[0.03] rounded-lg border border-white/10 p-4 text-center"
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-br ${activeFeature.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
