'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import DevSyncLogo from '../DevSyncLogo';

// Phase definitions
const PHASES = {
  INITIAL: 'initial',
  COMMIT: 'commit',
  AI_PROCESSING: 'ai_processing',
  POST_GENERATED: 'post_generated',
  SOCIAL_PUBLISH: 'social_publish',
  COMPLETE: 'complete'
};

export default function DevSyncLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(PHASES.INITIAL);
  const [showDevSync, setShowDevSync] = useState(true);
  const [showCommit, setShowCommit] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setPhase(PHASES.INITIAL) },
      { time: 800, action: () => setPhase(PHASES.COMMIT) },
      { time: 1500, action: () => setShowCommit(true) },
      { time: 2200, action: () => setPhase(PHASES.AI_PROCESSING) },
      { time: 2800, action: () => setShowAI(true) },
      { time: 3500, action: () => setPhase(PHASES.POST_GENERATED) },
      { time: 4000, action: () => setShowPrompt(true) },
      { time: 4500, action: () => setPhase(PHASES.SOCIAL_PUBLISH) },
      { time: 4800, action: () => setShowSocials(true) },
      { time: 5500, action: () => {
        setPhase(PHASES.COMPLETE);
        setOpacity(0);
        setLoadingComplete(true);
        setTimeout(onComplete, 500);
      }},
    ];

    const timers = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <>
      {/* Permanent logo after loading */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 left-6 z-40"
          >
            <DevSyncLogo size={160} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {!loadingComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#0a0a0a', opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
                  initial={{
                    x: Math.random() * windowSize.width,
                    y: Math.random() * windowSize.height,
                    scale: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* DevSync Logo - FIXED POSITION */}
              <div className="h-24 flex flex-col items-center justify-center gap-2 -mt-8">
                <AnimatePresence>
                  {showDevSync && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <img
                        src="/DevPulse_LOGO_clean.png"
                        alt="DevPulse"
                        width={100}
                        height={40}
                        className="block"
                      />
                      <span className="text-2xl font-bold text-white">
                        DevSync AI
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Loading text - BETWEEN LOGO AND ICONS */}
              <div className="h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!loadingComplete && (
                    <motion.div
                      key={phase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg text-gray-400 text-center absolute"
                    >
                      {phase === PHASES.INITIAL && 'Initializing DevSync AI...'}
                      {phase === PHASES.COMMIT && 'Detecting code changes...'}
                      {phase === PHASES.AI_PROCESSING && 'AI is crafting your post...'}
                      {phase === PHASES.POST_GENERATED && 'Post ready!'}
                      {phase === PHASES.SOCIAL_PUBLISH && 'Connecting to social platforms...'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Flow Animation - FIXED HEIGHT CONTAINER */}
              <div className="h-32 flex items-center justify-center">
                <div className="flex items-center gap-8">
                {/* Commit Icon */}
                <AnimatePresence>
                  {showCommit && (
                    <motion.div
                      initial={{ x: -100, opacity: 0, scale: 0 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-green-400">Commit</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Arrow */}
                <AnimatePresence>
                  {showCommit && showAI && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-16 h-0.5 bg-gradient-to-r from-green-500 via-purple-500 to-blue-500"
                    />
                  )}
                </AnimatePresence>

                {/* AI Brain */}
                <AnimatePresence>
                  {showAI && (
                    <motion.div
                      initial={{ y: -100, opacity: 0, scale: 0 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100
                      }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        {/* Pulsing rings */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full bg-purple-500/20"
                            animate={{
                              scale: [1, 1.5, 2],
                              opacity: [0.5, 0.2, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.4,
                            }}
                            style={{ width: 80, height: 80, marginLeft: -20, marginTop: -20 }}
                          />
                        ))}
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-purple-400">AI Magic</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Arrow */}
                <AnimatePresence>
                  {showAI && showPrompt && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-16 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                    />
                  )}
                </AnimatePresence>

                {/* Prompt/Post */}
                <AnimatePresence>
                  {showPrompt && (
                    <motion.div
                      initial={{ x: 100, opacity: 0, scale: 0 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-cyan-400">Social Post</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </div>

              {/* Social Logos - FIXED HEIGHT CONTAINER */}
              <div className="h-32 flex items-center justify-center">
                <AnimatePresence>
                  {showSocials && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.6 }}
                      className="flex gap-8"
                    >
                    {[
                      {
                        name: 'GitHub',
                        icon: (
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        ),
                        color: 'from-gray-700 to-gray-900',
                        shadow: 'shadow-gray-500/30'
                      },
                      {
                        name: 'Instagram',
                        icon: (
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        ),
                        color: 'from-pink-500 via-red-500 to-yellow-500',
                        shadow: 'shadow-pink-500/30'
                      },
                      {
                        name: 'LinkedIn',
                        icon: (
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        ),
                        color: 'from-blue-500 to-blue-700',
                        shadow: 'shadow-blue-500/30'
                      },
                    ].map((social, index) => (
                      <motion.div
                        key={social.name}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${social.color} p-3 shadow-lg ${social.shadow}`}>
                          {social.icon}
                        </div>
                        <span className="text-xs text-gray-400">{social.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
