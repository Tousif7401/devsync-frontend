'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Target, Rocket } from 'lucide-react'

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Content Generation',
    description: 'Transform your commits into engaging posts in seconds with AI-powered content creation.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Multi-Platform Distribution',
    description: 'Publish simultaneously to LinkedIn, X, and Instagram with a single click.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Smart Customization',
    description: 'Personalize every post with custom prompts, edits, and scheduling.',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Analytics & Insights',
    description: 'Track engagement metrics and optimize your social media performance.',
  },
]

export default function PowerfulFeatures() {
  return (
    <section id="powerful-features" className="relative z-10 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Supercharge your social media presence with AI-powered features
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#111111] rounded-2xl border border-gray-800 p-6 hover:border-draftrPurple/40 transition-all"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4"
                >
                  <span className="text-draftrPurple">{feature.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </section>
    )
}

