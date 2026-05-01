'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Rocket,
  Users,
  Megaphone,
  Building2,
  Briefcase
} from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const audiences = [
  {
    icon: Code2,
    title: 'Open Source Maintainers',
    description: 'Share your project updates and grow your contributor community',
    glowColor: 'purple' as const,
  },
  {
    icon: Rocket,
    title: 'Startup Founders',
    description: 'Document your building journey and attract investors and users',
    glowColor: 'blue' as const,
  },
  {
    icon: Users,
    title: 'Engineering Teams',
    description: 'Showcase your team\'s work and company engineering culture',
    glowColor: 'green' as const,
  },
  {
    icon: Megaphone,
    title: 'Developer Advocates',
    description: 'Amplify your reach with consistent, authentic content',
    glowColor: 'red' as const,
  },
  {
    icon: Building2,
    title: 'Indie Hackers',
    description: 'Build in public and connect with your early adopters',
    glowColor: 'orange' as const,
  },
  {
    icon: Briefcase,
    title: 'Freelance Developers',
    description: 'Attract clients by showcasing your expertise and activity',
    glowColor: 'purple' as const,
  },
];

export default function TargetAudience() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            The perfect content solution for every developer
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how DevSync AI fits your workflow, whether you're a solo developer, startup, or enterprise team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <GlowCard
                glowColor={audience.glowColor}
                customSize={true}
                className="w-full h-auto"
              >
                <div className="flex flex-col h-full p-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                    <audience.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">{audience.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{audience.description}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
