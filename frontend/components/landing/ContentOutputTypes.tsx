'use client';

import { motion } from 'framer-motion';
import DisplayCards from '@/components/ui/display-cards';
import Safari_01 from '@/components/ui/safari-01';
import { FileText, Zap, Image as ImageIcon } from 'lucide-react';

const contentOutputCards = [
  {
    icon: <FileText className="size-4 text-white" />,
    title: "Technical Deep Dives",
    description: "LinkedIn long-form content",
    date: "2 min read",
    iconClassName: "",
    titleClassName: "text-white font-heading font-semibold",
    className:
      "[grid-area:stack] sm:hover:-translate-y-10 hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Zap className="size-4 text-white" />,
    title: "Quick Updates",
    description: "X (Twitter) short posts",
    date: "280 chars",
    iconClassName: "",
    titleClassName: "text-white font-heading font-semibold",
    className:
      "[grid-area:stack] sm:translate-x-12 translate-x-6 sm:translate-y-10 translate-y-6 sm:hover:-translate-y-1 hover:-translate-y-0 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <ImageIcon className="size-4 text-white" />,
    title: "Visual Stories",
    description: "Instagram carousels",
    date: "Multiple slides",
    iconClassName: "",
    titleClassName: "text-white font-heading font-semibold",
    className:
      "[grid-area:stack] sm:translate-x-24 translate-x-12 sm:translate-y-20 translate-y-12 sm:hover:translate-y-10 hover:translate-y-6",
  },
];

    export default function ContentOutputTypes() {
  return (
    <section id="content-output-types" className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-draftrPurple/3 to-transparent overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center"
        >
          {/* Right Side - Content - On mobile, show this first */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-heading break-words">
                Three Content Types, One Powerful Platform
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-heading break-words">
                DevSync AI transforms your commits into perfectly formatted content for every platform. Choose an output that matches your audience.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 hover:bg-[#4C3BCF] transition-colors duration-300">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading break-words">Technical Deep Dives</h3>
                  <p className="text-gray-400 leading-relaxed break-words">
                    In-depth articles for LinkedIn that showcase your expertise. Perfect for thought leadership and networking with peers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 hover:bg-[#4C3BCF] transition-colors duration-300">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading break-words">Quick Updates</h3>
                  <p className="text-gray-400 leading-relaxed break-words">
                    Short, punchy posts for X that keep your followers engaged. Ideal for daily updates and quick wins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 hover:bg-[#4C3BCF] transition-colors duration-300">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading break-words">Visual Stories</h3>
                  <p className="text-gray-400 leading-relaxed break-words">
                    Eye-catching carousels for Instagram that combine visuals with your technical story. Great for reaching broader audiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Side - Display Cards inside Browser */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center w-full order-2 lg:order-1"
          >
            <Safari_01>
              <DisplayCards cards={contentOutputCards} />
            </Safari_01>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
