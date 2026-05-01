'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, Zap, Github, Code2, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import './CommitProcessor.css';

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'completed';
  generatedContent?: string;
}

interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

const MOCK_COMMITS: Omit<Commit, 'id' | 'status'>[] = [
  {
    message: 'feat: add dark mode support with system preference detection',
    author: 'mohammedtousif',
    timestamp: '2 minutes ago'
  },
  {
    message: 'fix: resolve memory leak in useEffect cleanup',
    author: 'mohammedtousif',
    timestamp: '15 minutes ago'
  },
  {
    message: 'refactor: optimize Three.js particle rendering for better performance',
    author: 'mohammedtousif',
    timestamp: '1 hour ago'
  },
];

const PROCESSING_STEPS: Omit<ProcessingStep, 'status'>[] = [
  { id: '1', label: 'Analyzing commit context' },
  { id: '2', label: 'Understanding code changes' },
  { id: '3', label: 'Generating social content' },
  { id: '4', label: 'Optimizing for platforms' },
];

// Generate engaging social media content from commit messages
const generateSocialContent = (commitMessage: string): string => {
  if (commitMessage.includes('dark mode')) {
    return "🌙 Excited to share that dark mode support is now live! The app now automatically detects your system preferences and switches themes seamlessly. Building for better accessibility & user experience! 💻✨ #DarkMode #WebDev #UserExperience";
  }
  if (commitMessage.includes('memory leak')) {
    return "🔧 Fixed a tricky memory leak in our React useEffect cleanup! Small optimization that makes a big difference for long-running sessions. Always good to keep an eye on those cleanup functions. #React #Performance #WebDev #Debugging";
  }
  if (commitMessage.includes('Three.js') || commitMessage.includes('particle')) {
    return "⚡ Just optimized our Three.js particle rendering system! The animations are now 60fps smooth even on lower-end devices. Sometimes you gotta go deep into the render loop to squeeze out those performance gains. 🎮 #ThreeJS #WebGL #Performance #Frontend";
  }
  return "🚀 Shipping more improvements to the codebase! Every commit brings us closer to a better product. Keep building, keep shipping! 💪 #WebDev #Coding #TechLife";
};

export default function CommitProcessor() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [currentCommitIndex, setCurrentCommitIndex] = useState(0);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>(
    PROCESSING_STEPS.map(step => ({ ...step, status: 'pending' as const }))
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const initializeAndStart = () => {
    const initializedCommits = MOCK_COMMITS.map((commit, index) => ({
      ...commit,
      id: `${index}-${Date.now()}`,
      status: 'pending' as const
    }));
    setCommits(initializedCommits);
    setCurrentCommitIndex(0);
    setProcessingSteps(PROCESSING_STEPS.map(step => ({ ...step, status: 'pending' as const })));
    setHasStarted(true);
    setIsPaused(false);
    startProcessing(initializedCommits);
  };

  const reset = () => {
    setCommits([]);
    setCurrentCommitIndex(0);
    setProcessingSteps(PROCESSING_STEPS.map(step => ({ ...step, status: 'pending' as const })));
    setIsProcessing(false);
    setHasStarted(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isInView && !hasStarted) {
      initializeAndStart();
    } else if (isInView) {
      // Resume if already started
      setIsPaused(false);
    } else if (!isInView && hasStarted) {
      // Pause animations when out of view, but preserve state
      setIsPaused(true);
    }
  }, [isInView, hasStarted]);

  const startProcessing = async (commitList: Commit[]) => {
    setIsProcessing(true);
    for (let i = 0; i < commitList.length; i++) {
      setCurrentCommitIndex(i);
      await processCommit(i, commitList[i].id);
    }
    setIsProcessing(false);
  };

  const processCommit = async (index: number, commitId: string) => {
    setCommits(prev => prev.map(c =>
      c.id === commitId ? { ...c, status: 'processing' } : c
    ));

    setProcessingSteps(PROCESSING_STEPS.map(step => ({ ...step, status: 'pending' as const })));

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProcessingSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'active' as const } :
          idx < i ? { ...step, status: 'completed' as const } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCommits(prev => prev.map(c =>
      c.id === commitId ? {
        ...c,
        status: 'completed',
        generatedContent: generateSocialContent(c.message)
      } : c
    ));
  };

  const currentCommit = commits[currentCommitIndex];

  const handleReplay = () => {
    reset();
    setTimeout(() => initializeAndStart(), 100);
  };

  return (
    <div ref={ref} className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden min-h-[550px]" data-animations-paused={isPaused ? 'true' : 'false'}>
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5235ef] to-[#FF6B6B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {isProcessing && (
                <div className="absolute -inset-1 bg-[#5235ef]/20 rounded-lg pulse-animation" />
              )}
            </div>

            <div className="text-left">
              <h3 className="text-white font-semibold text-base">DevSync AI</h3>
              <p className="text-gray-500 text-xs">
                <span className="w-1.5 h-1.5 inline-block rounded-full bg-green-400 animate-pulse mr-1.5" />
                Converting commits to content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <Github className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white/50 text-xs font-medium">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 min-h-[420px]">
        <AnimatePresence mode="wait">
          {currentCommit && (
            <motion.div
              key={currentCommit.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Commit Card */}
              <div className="bg-white/[0.03] rounded-xl border border-white/8 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#5235ef]/10 flex items-center justify-center shrink-0">
                    {currentCommit.status === 'pending' && <Code2 className="w-5 h-5 text-[#5235ef]" />}
                    {currentCommit.status === 'processing' && (
                      <div className="spin-animation-fast">
                        <Loader2 className="w-5 h-5 text-[#5235ef]" />
                      </div>
                    )}
                    {currentCommit.status === 'completed' && (
                      <div className="scale-bounce">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                        currentCommit.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        currentCommit.status === 'processing' ? 'bg-[#5235ef]/10 text-[#5235ef] border border-[#5235ef]/20' :
                        'bg-white/5 text-gray-400 border border-white/10'
                      }`}>
                        {currentCommit.status}
                      </span>
                      <span className="text-gray-500 text-xs">{currentCommit.timestamp}</span>
                    </div>
                    <h4 className="text-white font-medium text-base leading-snug break-words">
                      {currentCommit.message}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      @{currentCommit.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Processing Steps */}
              {currentCommit.status === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5 pt-4 border-t border-white/5"
                >
                  <h5 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">Processing</h5>
                  {processingSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="relative">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-500/15' :
                            step.status === 'active' ? 'bg-[#5235ef]/15' :
                              'bg-white/5'
                        }`}>
                          {step.status === 'completed' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            </motion.div>
                          )}
                          {step.status === 'active' && (
                            <div className="spin-animation-fast">
                              <Loader2 className="w-3.5 h-3.5 text-[#5235ef]" />
                            </div>
                          )}
                          {step.status === 'pending' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          )}
                        </div>
                        {index < processingSteps.length - 1 && (
                          <div className={`absolute left-1/2 top-6 w-0.5 h-4 -translate-x-1/2 ${
                            step.status === 'completed' ? 'bg-green-500/20' : 'bg-white/5'
                          }`} />
                        )}
                      </div>
                      <span className={`text-xs ${
                        step.status === 'completed' ? 'text-green-400' :
                          step.status === 'active' ? 'text-white font-medium' :
                            'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Generated Content Preview */}
              {currentCommit.status === 'completed' && currentCommit.generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-white/5"
                >
                  <div className="bg-green-500/5 rounded-lg border border-green-500/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 text-xs font-medium">Generated Content</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentCommit.generatedContent}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {['LinkedIn', 'X', 'Instagram'].map((platform) => (
                        <button
                          key={platform}
                          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 text-xs font-medium transition-all hover:text-white"
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Commits Queue */}
              {commits.slice(currentCommitIndex + 1).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-white/8 pt-4 mt-4"
                >
                  <h5 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    Queue ({commits.length - currentCommitIndex - 1} remaining)
                  </h5>
                  <div className="space-y-1.5">
                    {commits.slice(currentCommitIndex + 1).map((commit, index) => (
                      <motion.div
                        key={commit.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                          <Code2 className="w-3.5 h-3.5 text-white/30" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-400 text-sm truncate">{commit.message}</p>
                          <p className="text-gray-600 text-xs">{commit.timestamp}</p>
                        </div>
                        <span className="text-xs text-gray-600 shrink-0">waiting</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-3 border-t border-white/8 bg-white/[0.02]">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-gray-500">
                <span className="text-white font-medium">{commits.filter(c => c.status === 'completed').length}</span> processed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5235ef] animate-pulse" />
              <span className="text-gray-500">
                <span className="text-white font-medium">{commits.filter(c => c.status === 'processing').length}</span> processing
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReplay}
              disabled={isProcessing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="font-medium">Replay</span>
            </motion.button>
            <div className="text-gray-600 text-xs">
              DevSync AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
