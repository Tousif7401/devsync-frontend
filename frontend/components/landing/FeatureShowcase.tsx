'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BarChart3, Zap, Shield, Globe, Database, Code2 } from 'lucide-react';

// Analytics Animation - Circular Metrics Dashboard
const AnalyticsDemo = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [progress, setProgress] = useState(0);

  const metrics = [
    { label: 'Engagement', value: '4.2%', color: '#5235ef', trend: '+23%' },
    { label: 'Reach', value: '12.4K', color: '#8771ff', trend: '+127%' },
    { label: 'Impressions', value: '48.2K', color: '#a78bfa', trend: '+89%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
      setProgress(0);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 100);
    return () => clearTimeout(timer);
  }, [activeMetric]);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-[360px] flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-48 h-48 rounded-full bg-draftrPurple/20 blur-3xl" />
      </motion.div>

      <div className="relative z-10 w-full">
        {/* Main circular progress */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg className="w-36 h-36 -rotate-90">
              {/* Background circle */}
              <circle
                cx="72" cy="72" r="60"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <motion.circle
                key={activeMetric}
                cx="72" cy="72" r="60"
                fill="none"
                stroke={metrics[activeMetric].color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={377}
                strokeDashoffset={377}
                animate={{ strokeDashoffset: 377 - (377 * progress / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                key={activeMetric}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-3xl font-bold text-white">{metrics[activeMetric].value}</div>
                <div className="text-xs text-gray-400 mt-1">{metrics[activeMetric].label}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Metric dots */}
        <div className="flex justify-center gap-3 mb-6">
          {metrics.map((metric, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveMetric(i)}
              animate={{
                scale: i === activeMetric ? 1.2 : 1,
                backgroundColor: i === activeMetric ? metric.color : 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 rounded-full"
            />
          ))}
        </div>

        {/* Trend indicator */}
        <motion.div
          key={activeMetric}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-emerald-400 text-sm font-medium">↑ {metrics[activeMetric].trend}</span>
            <span className="text-gray-400 text-xs">this week</span>
          </div>
        </motion.div>

        {/* Mini sparkline */}
        <div className="flex justify-end items-end gap-0.5 mt-4 h-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: Math.random() * 24 + 8 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="w-1 bg-draftrPurple/40 rounded-t"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Automation Animation - Morphing Transformation
const AutomationDemo = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const phases = [
    { icon: '⚡', label: 'CODE', sublabel: 'Pushed' },
    { icon: '🔄', label: 'AI', sublabel: 'Processing' },
    { icon: '✨', label: 'CREATE', sublabel: 'Generating' },
    { icon: '🚀', label: 'PUBLISH', sublabel: 'Done!' }
  ];

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-[360px] flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 rounded-full bg-draftrPurple/30"
            style={{
              left: '50%',
              top: '50%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Morphing circle */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            borderRadius: ['50%', '30%', '50%']
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-32 h-32 mb-8 bg-gradient-to-br from-draftrPurple/40 to-draftrPurple/10 border border-draftrPurple/30 flex items-center justify-center"
        >
          <motion.span
            key={phase}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl"
          >
            {phases[phase].icon}
          </motion.span>
        </motion.div>

        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-white font-bold text-lg">{phases[phase].label}</div>
          <div className="text-draftrPurple text-sm">{phases[phase].sublabel}</div>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {phases.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === phase ? 1.3 : 1,
                backgroundColor: i === phase ? '#5235ef' : 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Privacy Animation - Data Filter Visualization
const PrivacyDemo = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const dataItems = [
    { type: 'code', label: 'src/app.tsx', blocked: true },
    { type: 'code', label: 'utils/auth.js', blocked: true },
    { type: 'meta', label: 'commit msg', blocked: false },
    { type: 'meta', label: 'branch name', blocked: false },
    { type: 'code', label: '.env secrets', blocked: true },
    { type: 'meta', label: 'PR title', blocked: false },
  ];

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-[360px] flex items-center justify-center relative overflow-hidden">
      <div className="flex items-start gap-6 w-full max-w-lg relative">
        {/* Input side - Your Repository */}
        <div className="flex-1 relative" id="repo-section">
          <div className="text-center mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Your Repository</div>
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 flex items-center justify-center relative z-10" id="repo-icon">
              <img src="/Logos/github.png" alt="GitHub" className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            {dataItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: phase >= 1 ? 80 : 0,
                  opacity: phase >= 1 ? 0 : 1,
                }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono ${
                  item.blocked
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                <span className="opacity-60 mr-2">{item.blocked ? '🔒' : '📄'}</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy Filter - Moved up slightly */}
        <div className="relative flex items-center mt-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-2 border-emerald-500/40 flex items-center justify-center relative overflow-hidden"
            style={{ zIndex: 10, position: 'relative' }}
          >
            {/* Shield icon */}
            <svg viewBox="0 0 48 48" className="w-10 h-10 relative z-10">
              <path d="M24 6 L38 14 L38 24 C38 34 30 42 24 42 C18 42 10 34 10 24 L10 14 L24 6Z"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <path d="M24 6 L38 14 L38 24 C38 34 30 42 24 42 C18 42 10 34 10 24 L10 14 L24 6Z"
                fill="rgba(16, 185, 129, 0.1)"
              />
              <circle cx="24" cy="24" r="6" fill="#10b981" />
            </svg>

            {/* Scanning effect */}
            <motion.div
              animate={{ y: ['-50%', '150%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent"
            />
          </motion.div>
        </div>

        {/* Output side - DevSync AI */}
        <div className="flex-1 relative" id="devsync-section">
          <div className="text-center mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">DevSync AI</div>
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-draftrPurple/20 to-draftrPurple/5 border border-draftrPurple/30 flex items-center justify-center relative z-10 p-2" id="devsync-icon">
              <img src="/DevPulse_LOGO_clean.png" alt="DevPulse" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-2">
            {dataItems.filter(d => !d.blocked).map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{
                  x: phase >= 1 ? 0 : 20,
                  opacity: phase >= 1 ? 1 : 0,
                }}
                transition={{
                  delay: 0.5 + i * 0.15,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="px-3 py-2 rounded-lg text-xs font-mono bg-draftrPurple/10 text-draftrPurple border border-draftrPurple/20"
              >
                <span className="opacity-60 mr-2">✓</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow flow line - split into two segments to hide behind shield */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {/* Left segment - from left icon to before shield */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={{ width: phase >= 1 ? '13.5%' : '0%', opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="absolute top-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
          style={{ left: '10.5rem', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 1))' }}
        />

        {/* Right segment - from after shield to right icon */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={{ width: phase >= 1 ? '15%' : '0%', opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="absolute top-16 h-1 bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-full"
          style={{ left: '57%', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 1))' }}
        >
          {/* Arrow head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <svg width="24" height="24" viewBox="0 0 12 12" className="text-emerald-400">
              <polygon points="0,0 12,6 0,12" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Status text */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <div className="text-sm font-semibold text-emerald-400">
          {phase === 0 ? '🔒 Code Protected' : phase === 1 ? '📋 Extracting Metadata...' : '✅ Only Metadata Accessed'}
        </div>
      </motion.div>
    </div>
  );
};

// Multi-Platform Animation - Content Transformation
const MultiPlatformDemo = () => {
  const [stage, setStage] = useState(0);

  const stages = [
    {
      platform: 'Source Code',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M8 3L3 8l5 5m8-8l5 5-5 5M3 21l18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
      color: '#6b7280',
      content: 'Deployed new API endpoint'
    },
    {
      platform: 'LinkedIn',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/></svg>,
      color: '#0077b5',
      content: 'Just shipped a new API endpoint...'
    },
    {
      platform: 'X/Twitter',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="currentColor"/></svg>,
      color: '#ffffff',
      content: 'new API ✅ shipped'
    },
    {
      platform: 'Instagram',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/></svg>,
      color: '#e1306c',
      content: 'API launch story 🎨'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(s => (s + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColorWithOpacity = (color: string, opacity: number) => {
    if (color === '#ffffff') return `rgba(255, 255, 255, ${opacity / 100})`;
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    return color;
  };

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-[360px] flex flex-col items-center relative overflow-hidden">
      {/* Central card transformation */}
      <div className="relative w-56 h-44" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl border-2 p-5 flex flex-col items-center justify-center"
            style={{
              backgroundColor: getColorWithOpacity(stages[stage].color, 10),
              borderColor: stages[stage].color,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Platform icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              className="mb-3 flex items-center justify-center"
              style={{ color: stages[stage].color }}
            >
              {stages[stage].icon}
            </motion.div>

            {/* Platform name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white font-semibold mb-2 text-sm"
            >
              {stages[stage].platform}
            </motion.div>

            {/* Content preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-gray-400 text-center leading-relaxed px-2 line-clamp-2"
            >
              {stages[stage].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-2 mt-3">
        {stages.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: stage === i ? 32 : 8,
              backgroundColor: stage === i ? stages[stage].color : 'rgba(255,255,255,0.1)'
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {/* Sync status */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 flex items-center gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 rounded-full border-2 border-draftrPurple border-t-transparent"
        />
        <span className="text-sm text-gray-400">
          {stage === 0 ? 'Analyzing content...' : `Optimizing for ${stages[stage].platform}...`}
        </span>
      </motion.div>

      {/* Platform logos row */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 pb-4">
        <motion.div
          animate={{
            scale: stage === 1 ? 1.15 : 1,
            opacity: stage === 1 ? 1 : 0.4,
            borderColor: stage === 1 ? '#0077b5' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl bg-white/5 border-2 border-white/10 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077b5"/></svg>
        </motion.div>
        <motion.div
          animate={{
            scale: stage === 2 ? 1.15 : 1,
            opacity: stage === 2 ? 1 : 0.4,
            borderColor: stage === 2 ? '#ffffff' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl bg-white/5 border-2 border-white/10 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="white"/></svg>
        </motion.div>
        <motion.div
          animate={{
            scale: stage === 3 ? 1.15 : 1,
            opacity: stage === 3 ? 1 : 0.4,
            borderColor: stage === 3 ? '#e1306c' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl bg-white/5 border-2 border-white/10 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#e1306c"/></svg>
        </motion.div>
      </div>
    </div>
  );
};

// History Animation - Content Library
const HistoryDemo = () => {
  const [selectedPost, setSelectedPost] = useState(0);

  const posts = [
    {
      id: 1,
      platform: 'LinkedIn',
      logo: '/Logos/linkedin.png',
      title: 'Just shipped a new API endpoint!',
      preview: 'Excited to announce that our new REST API is now live. Built with Node.js and Express...',
      date: '2 hours ago',
      engagement: '4.2K',
      reach: '12.4K'
    },
    {
      id: 2,
      platform: 'X/Twitter',
      logo: '/Logos/twitter.png',
      title: 'New API ✅ shipped',
      preview: 'Production ready • Fast responses • Ready to scale',
      date: '5 hours ago',
      engagement: '2.8K',
      reach: '8.1K'
    },
    {
      id: 3,
      platform: 'Instagram',
      logo: '/Logos/instagram.png',
      title: 'Behind the scenes: API Launch',
      preview: 'Swipe to see how we built our new API from scratch...',
      date: '1 day ago',
      engagement: '6.1K',
      reach: '18.2K'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPost(prev => (prev + 1) % posts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-5 h-[360px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-white font-semibold text-base">Your Generated Posts</h3>
          <p className="text-gray-400 text-xs">Click to reuse or edit</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-draftrPurple/20 border border-draftrPurple/40">
          <span className="text-draftrPurple text-xs font-semibold">{posts.length} posts</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Sidebar - Post List */}
        <div className="w-44 space-y-2 overflow-y-auto pr-1 flex-shrink-0 scrollbar-hide">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              animate={{
                x: i === selectedPost ? [0, 3, 0] : 0,
                backgroundColor: i === selectedPost ? ['#5235ef20'] : ['transparent']
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPost(i)}
              className={`p-2.5 rounded-lg cursor-pointer border transition-all ${
                i === selectedPost ? 'border-draftrPurple/40' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={post.logo}
                  alt={post.platform}
                  className="w-6 h-6 object-contain"
                />
                <div className="text-xs font-medium text-gray-300 truncate">{post.platform}</div>
              </div>
              <div className="text-white text-xs font-medium truncate leading-tight">{post.title}</div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{post.date}</span>
                <span>{post.engagement}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Preview */}
        <div className="flex-1 relative min-h-0">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: i === selectedPost ? 1 : 0,
                x: i === selectedPost ? 0 : 20
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col p-3"
            >
              {/* Platform Header */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10 flex-shrink-0">
                <img
                  src={post.logo}
                  alt={post.platform}
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{post.platform}</h4>
                  <p className="text-gray-400 text-[10px]">Generated from your commit</p>
                </div>
              </div>

              {/* Post Content Preview */}
              <div className="flex-1 bg-white/5 rounded-lg p-3 mb-3 flex-shrink-0">
                <div className="text-white text-xs font-medium mb-1">{post.title}</div>
                <div className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">{post.preview}</div>
              </div>

              {/* Stats */}
              <div className="flex gap-2 mb-3 flex-shrink-0">
                <div className="flex-1 text-center p-1.5 rounded-lg bg-white/5">
                  <div className="text-draftrPurple text-xs font-bold">{post.engagement}</div>
                  <div className="text-gray-400 text-[9px]">Engagement</div>
                </div>
                <div className="flex-1 text-center p-1.5 rounded-lg bg-white/5">
                  <div className="text-draftrPurple text-xs font-bold">{post.reach}</div>
                  <div className="text-gray-400 text-[9px]">Reach</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-draftrPurple to-draftrPurple/80 text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>♻️</span> Reuse
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white/10"
                >
                  <span>✏️</span> Edit
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// GitHub Animation - Branch Tree
const GitHubDemo = () => {
  const [commits, setCommits] = useState(0);
  const githubBlue = '#58A6FF';

  const branches = [
    { path: 'M24 24 L24 48 L48 72' },
    { path: 'M24 24 L0 48' },
    { path: 'M24 24 L24 0 L48 -24' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCommits(c => (c + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-[360px] flex flex-col items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 96 96" className="w-full h-full max-w-[280px]">
        <g stroke="currentColor" strokeWidth="2" fill="none">
          {/* Main trunk */}
          <motion.path
            d="M48 96 L48 24"
            stroke={githubBlue}
            strokeWidth="3"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Branches */}
          {branches.map((branch, i) => (
            <motion.path
              key={i}
              d={branch.path}
              stroke={githubBlue}
              strokeOpacity={commits > i ? 1 : 0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: commits > i ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}

          {/* Commit dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={48}
              cy={96 - i * 24}
              r={commits > i ? 5 : 3}
              fill={githubBlue}
              initial={{ scale: 0 }}
              animate={{
                scale: commits > i ? 1 : 0.5,
                opacity: commits > i ? 1 : 0.3
              }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            />
          ))}
        </g>

        {/* GitHub logo icon */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-2 left-2"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 0 3.59-.209 6.819-1.57 9.391-5.429 5.429-5.429 0 3.409 1.792 6.24 2.997 2.832 2.994-5.665 3.405-2.867 1.79-6.249 5.408-5.408 0-3.216-1.586-6.228-4.515-8.035-6.228-8.035 0-4.265 2.47-7.998 5.408-7.998z"/>
          </svg>
        </motion.div>
      </svg>

      <div className="text-center mt-4">
        <div className="text-white font-bold text-sm mb-1">
          {commits === 0 ? 'Listening for commits...' : `${commits} new commit${commits > 1 ? 's' : ''}`}
        </div>
        <div className="flex items-center gap-2 justify-center text-xs text-gray-400">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-400"
          />
          <span>Webhook Active</span>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track your content performance across all platforms with detailed insights and metrics. Monitor engagement rates, reach, impressions, and growth patterns in real-time.',
    detailContent: 'Our analytics dashboard helps you understand what content resonates with your audience, allowing you to refine your strategy and maximize impact. Visualize your growth with beautiful charts and actionable insights.',
    stats: ['4.2% Avg Engagement', '+127% Weekly Growth', '2.4K Posts Tracked'],
    demo: AnalyticsDemo,
    color: 'from-[#5235ef] to-[#8771ff]'
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Instant Generation',
    description: 'AI-powered content creation in seconds after every commit. Push your code and watch DevSync AI instantly transform your commits into engaging social media posts.',
    detailContent: 'No manual writing, no copy-pasting, no delays. Just seamless automation that keeps your presence active while you focus on coding. The AI understands your technical work and translates it into compelling narratives.',
    stats: ['< 3s Generation', '10K+ Posts Created', '8hrs/wk Saved'],
    demo: AutomationDemo,
    color: 'from-[#FF6B6B] to-[#ff8e8e]'
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy First',
    description: 'Your code stays in your repo. We only read commit metadata. Your intellectual property remains completely private and secure.',
    detailContent: 'DevSync AI only accesses commit messages, branch names, and PR descriptions—never your actual source code. Your proprietary logic and implementation details are never exposed or stored.',
    stats: ['Zero Code Access', 'AES-256 Encryption', 'SOC2 Ready'],
    demo: PrivacyDemo,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'multiplatform',
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Post to LinkedIn, X, and Instagram simultaneously. Each platform receives optimized content tailored to its unique format and audience.',
    detailContent: 'Maintain consistent presence across all major social platforms with a single push. Technical depth for LinkedIn, brevity for X, visuals for Instagram—all automatically formatted.',
    stats: ['3+ Platforms', '3.5x Reach Multiplier', 'Instant Sync'],
    demo: MultiPlatformDemo,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'history',
    icon: Database,
    title: 'Smart History',
    description: 'Reuse and refine your best-performing content effortlessly. Every generated post is saved and categorized for easy access.',
    detailContent: 'Search, filter, and reuse your top-performing content. A/B test variations and learn what drives engagement. Build a repository of your best moments that can be repurposed for maximum impact.',
    stats: ['Unlimited Archive', '73% Reuse Rate', 'Built-in A/B Tests'],
    demo: HistoryDemo,
    color: 'from-purple-400 to-violet-500'
  },
  {
    id: 'github',
    icon: Code2,
    title: 'GitHub Native',
    description: 'Seamless integration with your existing development workflow. Connect your repository in one click via GitHub OAuth.',
    detailContent: 'Configure branch targeting, commit message patterns, and approval workflows. DevSync AI becomes part of your CI/CD pipeline—content generation happens automatically as part of your existing process.',
    stats: ['< 2min Setup', 'Unlimited Repos', 'Instant Webhook'],
    demo: GitHubDemo,
    color: 'from-[#58A6FF] to-[#4B8BFF]'
  },
] as const;

export { AnalyticsDemo, AutomationDemo, PrivacyDemo, MultiPlatformDemo, HistoryDemo, GitHubDemo };

export default function FeatureShowcase() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to turn your GitHub activity into a thriving personal brand
          </p>
        </motion.div>

        {/* Feature Sections with Alternating Layout */}
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={feature.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
              className={`mb-32 last:mb-0`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Content Side */}
                <div className={isEven ? 'order-1' : 'order-2 lg:order-1'}>
                  <motion.div
                    initial={{ x: isEven ? -30 : 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Header with inline icon */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Detail content */}
                    <p className="text-gray-400 leading-relaxed">
                      {feature.detailContent}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3">
                      {feature.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.05] rounded-lg border border-white/10 px-4 py-2"
                        >
                          <div className={`text-sm font-semibold bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                            {stat}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Demo/Animation Side */}
                <div className={isEven ? 'order-2' : 'order-1 lg:order-2'}>
                  <motion.div
                    initial={{ x: isEven ? 30 : -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                  >
                    <feature.demo />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
