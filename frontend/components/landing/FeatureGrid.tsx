'use client';

import { motion } from 'framer-motion';
import { Cloud, Zap, Shield, BarChart3, Users, Clock } from 'lucide-react';

const mainFeatures = [
  {
    icon: Cloud,
    title: 'Cloud-based accessibility',
    description: 'Access your projects anytime, anywhere—no downloads or installations needed.',
  },
  {
    icon: Zap,
    title: 'Fast & secure performance',
    description: 'Experience lightning-fast speed with enterprise-level security and version control.',
  },
];

const subFeatures = [
  {
    icon: Users,
    title: 'Effortless brand building',
    description: 'Intuitive interface and smart tools to speed up your creative process.',
  },
  {
    icon: Clock,
    title: 'Instant content generation',
    description: 'Transform static commits into engaging posts in just a few seconds.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            Power up your workflow with next-gen features
          </h2>
        </motion.div>

        {/* Main Features - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] rounded-3xl p-10 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-heading">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Sub Features - Half Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-[#111111] rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
