'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, AlertCircle, Code2, Sparkles, Zap } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  status: 'done' | 'progress' | 'blocked' | 'waiting';
  description?: string;
}

const MOCK_TASKS: TaskItem[] = [
  {
    id: '1',
    title: 'Commit Received',
    status: 'done',
    description: 'feat: add dark mode support'
  },
  {
    id: '2',
    title: 'AI Analysis',
    status: 'done',
    description: 'Understanding code changes'
  },
  {
    id: '3',
    title: 'Content Generation',
    status: 'progress',
    description: 'Creating LinkedIn post...'
  },
  {
    id: '4',
    title: 'Platform Optimization',
    status: 'waiting',
    description: 'X, Instagram formatting'
  },
  {
    id: '5',
    title: 'Ready to Publish',
    status: 'waiting',
    description: 'Awaiting your approval'
  }
];

const STATUS_COLORS = {
  done: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    textColor: 'text-green-400',
    label: 'Done'
  },
  progress: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-400',
    label: 'In Progress'
  },
  blocked: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    textColor: 'text-red-400',
    label: 'Blocked'
  },
  waiting: {
    bg: 'bg-white/5',
    border: 'border-white/10',
    iconBg: 'bg-white/10',
    iconColor: 'text-gray-500',
    textColor: 'text-gray-500',
    label: 'Waiting'
  }
};

export default function DevSyncOverviewCard() {
  const [tasks, setTasks] = useState<TaskItem[]>(MOCK_TASKS.map(t => ({ ...t, status: 'waiting' as const })));
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsPaused(false);
      startAnimation();
    } else if (isInView && hasAnimated) {
      setIsPaused(false);
    } else if (!isInView) {
      setIsPaused(true);
    }
  }, [isInView, hasAnimated]);

  const startAnimation = async () => {
    // Set all tasks to waiting first
    setTasks(MOCK_TASKS.map(t => ({ ...t, status: 'waiting' as const })));

    for (let i = 0; i < MOCK_TASKS.length; i++) {
      setCurrentTaskIndex(i);

      // Set to in progress
      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'progress' as const } : t
      ));
      await new Promise(resolve => setTimeout(resolve, 800));

      // Set to done
      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'done' as const } : t
      ));
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // All tasks completed - wait to show the final state
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Reset and loop
    setCurrentTaskIndex(0);
    setTimeout(startAnimation, 500);
  };

  return (
    <div ref={ref} className="w-full h-full">
      {/* macOS-style Browser Frame */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col relative">
        {/* Browser Header */}
        <div className="bg-gray-900/80 border-b border-gray-800 px-3 py-2 flex items-center gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400 ml-2">DevSync Overview</span>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 overflow-hidden flex flex-col">
          {/* Summary Card - Purple Gradient */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#5235ef]/10 rounded-xl p-3 border border-[#5235ef]/30 mb-4 shrink-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#5235ef]" />
              <span className="text-xs text-[#5235ef] font-semibold">AI Processing Summary</span>
            </div>
            <p className="text-xs text-gray-300">
              {tasks.filter(t => t.status === 'done').length} task{tasks.filter(t => t.status === 'done').length !== 1 ? 's' : ''} completed,{' '}
              {tasks.filter(t => t.status === 'progress').length > 0 ? '1 in progress' : 'processing complete'}
            </p>
          </motion.div>

          {/* Task List */}
          <div className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => {
                const colors = STATUS_COLORS[task.status];
                const isCurrent = index === currentTaskIndex;

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1
                    }}
                    className={`${colors.bg} rounded-xl px-3 py-2.5 border ${colors.border} transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-7 h-7 ${colors.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                        {task.status === 'done' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          </motion.div>
                        )}
                        {task.status === 'progress' && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        )}
                        {task.status === 'blocked' && (
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                        {task.status === 'waiting' && (
                          <Code2 className="w-3.5 h-3.5 text-gray-500" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium break-words">{task.title}</p>
                        {task.description && (
                          <span className={`text-xs ${colors.textColor} block break-words`}>{task.description}</span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <span className={`text-xs ${colors.textColor} shrink-0 ml-1 whitespace-nowrap`}>
                        {STATUS_COLORS[task.status].label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none rounded-b-2xl" />
      </div>
    </div>
  );
}
