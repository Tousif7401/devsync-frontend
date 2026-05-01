'use client';

import { motion } from 'framer-motion';
import { Github, Edit, Share2 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Connect Your GitHub',
    subtitle: 'One-click authorization',
    description: 'Create a new project or import your repository with just one click. Set up your workspace effortlessly.',
    icon: <Github className="w-6 h-6" />,
    tags: ['OAuth 2.0', 'Webhooks', 'Private repos'],
  },
  {
    number: '02',
    title: 'Code as Usual',
    subtitle: 'Push commits, open PRs',
    description: 'Push commits, open PRs, merge branches. Every action becomes content fodder—no extra work required.',
    icon: <Edit className="w-6 h-6" />,
    tags: ['Auto-detect', 'Smart parsing', 'Context aware'],
  },
  {
    number: '03',
    title: 'Review & Publish',
    subtitle: 'One-click publishing',
    description: 'Get AI-generated posts ready for all platforms. Edit if you want and publish with a single click.',
    icon: <Share2 className="w-6 h-6" />,
    tags: ['LinkedIn', 'X (Twitter)', 'Instagram'],
  },
];

export default function WorkflowSteps() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        const height = timelineRef.current.offsetHeight;
        setTotalHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && timelineRef.current) {
        const container = scrollContainerRef.current;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const timelineHeight = timelineRef.current.offsetHeight;
        const maxScroll = timelineHeight - containerHeight;
        const progress = Math.min(scrollTop / maxScroll, 1);
        setLineHeight(progress * timelineHeight);

        // Determine which step is in view
        const stepElements = refs.current.filter(Boolean);
        stepElements.forEach((stepEl, index) => {
          if (stepEl) {
            const rect = stepEl.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const containerCenter = containerRect.top + containerRect.height / 2;

            if (Math.abs(stepCenter - containerCenter) < containerRect.height / 2) {
              setActiveStep(index);
            }
          }
        });
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [totalHeight]);

  return (
    <div className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading break-words">
            Simplify Your Workflow
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto break-words">
            Turn your GitHub activity into social content in three simple steps
          </p>
        </motion.div>

        {/* Mobile: Simple card grid */}
        <div className="grid grid-cols-1 md:hidden gap-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 overflow-hidden h-full"
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-draftrPurple to-[#8771ff] flex items-center justify-center text-white mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 font-heading">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{step.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Vertical scrollable container with animations */}
        <div className="relative hidden md:block">
          <div
            ref={scrollContainerRef}
            className="max-h-[500px] sm:max-h-[600px] overflow-y-auto scrollbar-hide border border-white/10 rounded-2xl w-full"
          >
            {/* Timeline line */}
            <div ref={timelineRef} className="relative px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-28 w-full">
              {/* Animated progress line */}
              <div
                className="absolute left-8 md:left-1/2 top-2 w-[2px] bg-gradient-to-b from-draftrPurple to-[#8771ff] will-change-height"
                style={{ height: `${lineHeight}px`, transition: 'height 0.05s linear' }}
              />

              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  ref={(el) => { refs.current[index] = el; }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: '-100px' }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } mb-12 sm:mb-16 md:mb-24 w-full`}
                >
                  {/* Floating Step Number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: activeStep === index ? 0.15 : 0.03, scale: activeStep === index ? 1.05 : 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-[50px] sm:text-[70px] md:text-[80px] lg:text-[90px] font-bold leading-none select-none font-heading pointer-events-none ${
                      index % 2 === 0 ? 'right-1/2 translate-x-16' : 'left-1/2 -translate-x-16'
                    } ${activeStep === index ? 'text-draftrPurple' : 'text-white'}`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Dot */}
                  <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 transition-all duration-300 ${
                    activeStep === index ? 'bg-draftrPurple border-white scale-125' : 'bg-white border-draftrPurple'
                  }`} />

                  {/* Card */}
                  <div className={`w-full md:w-[38%] pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition duration-300 overflow-hidden h-full min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-draftrPurple to-[#8771ff] flex items-center justify-center text-white mb-4 sm:mb-6">
                          {step.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading break-words">{step.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-4">{step.subtitle}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 sm:mb-6 break-words">
                          {step.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span key={tag} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
