'use client';

import { motion } from 'framer-motion';

export default function IntegrationsWithQuote() {
  return (
    <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-[#5235ef]/3 to-transparent">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            One platform, unlimited integrations
          </h2>
          <motion.blockquote
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-2xl md:text-3xl text-white mb-6 font-light italic leading-relaxed">
              "Our platform empowers developers to build their brand, share their journey, and grow their audience—seamlessly and effortlessly."
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}
