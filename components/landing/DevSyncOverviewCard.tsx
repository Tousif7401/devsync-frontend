'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, AlertCircle, Code2, Sparkles } from 'lucide-react';

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
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    textColor: 'text-emerald-600',
    label: 'Done'
  },
  progress: {
    bg: 'bg-highlightOrange/10',
    border: 'border-highlightOrange/30',
    iconBg: 'bg-highlightOrange/15',
    iconColor: 'text-highlightOrange',
    textColor: 'text-highlightOrange',
    label: 'In Progress'
  },
  blocked: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    textColor: 'text-red-600',
    label: 'Blocked'
  },
  waiting: {
    bg: 'bg-offWhiteSage',
    border: 'border-fadedStone',
    iconBg: 'bg-fadedStone',
    iconColor: 'text-gunmetalGray',
    textColor: 'text-gunmetalGray',
    label: 'Waiting'
  }
};

export default function DevSyncOverviewCard() {
  const [tasks, setTasks] = useState<TaskItem[]>(MOCK_TASKS.map(t => ({ ...t, status: 'waiting' as const })));
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: '0px 0px -100px 0px' });

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
    setTasks(MOCK_TASKS.map(t => ({ ...t, status: 'waiting' as const })));

    for (let i = 0; i < MOCK_TASKS.length; i++) {
      setCurrentTaskIndex(i);

      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'progress' as const } : t
      ));
      await new Promise(resolve => setTimeout(resolve, 800));

      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'done' as const } : t
      ));
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    await new Promise(resolve => setTimeout(resolve, 2500));

    setCurrentTaskIndex(0);
    setTimeout(startAnimation, 500);
  };

  return (
    <div ref={ref} className="w-full h-full">
      {/* Browser Frame - Titan Style */}
      <div className="bg-canvasWhite border border-fadedStone rounded-cards overflow-hidden h-full flex flex-col relative">
        {/* Browser Header */}
        <div className="bg-offWhiteSage border-b border-fadedStone px-3 py-2 flex items-center gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-2 bg-canvasWhite rounded-navigation h-5 max-w-xs flex items-center px-3 border border-fadedStone">
            <span className="text-[10px] text-gunmetalGray font-geist">devsync.ai/overview</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 overflow-hidden flex flex-col">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-highlightOrange/5 rounded-medium p-3 border border-highlightOrange/20 mb-4 shrink-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-highlightOrange" />
              <span className="text-xs text-highlightOrange font-semibold font-geist">AI Processing Summary</span>
            </div>
            <p className="text-xs text-gunmetalGray font-geist">
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
                    className={`${colors.bg} rounded-medium px-3 py-2.5 border ${colors.border} transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-7 h-7 ${colors.iconBg} rounded-small flex items-center justify-center shrink-0 mt-0.5`}>
                        {task.status === 'done' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          </motion.div>
                        )}
                        {task.status === 'progress' && (
                          <div className="w-2 h-2 bg-highlightOrange rounded-full animate-pulse" />
                        )}
                        {task.status === 'blocked' && (
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                        )}
                        {task.status === 'waiting' && (
                          <Code2 className="w-3.5 h-3.5 text-gunmetalGray" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-midnightInk font-medium font-geist break-words">{task.title}</p>
                        {task.description && (
                          <span className={`text-xs ${colors.textColor} block font-geist break-words`}>{task.description}</span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <span className={`text-xs ${colors.textColor} shrink-0 ml-1 whitespace-nowrap font-geist`}>
                        {STATUS_COLORS[task.status].label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
