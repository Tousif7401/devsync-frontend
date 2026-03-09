'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, MessageSquare, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const EXAMPLE_QUESTIONS = [
  'How do I connect my GitHub repository?',
  'What social platforms can I post to?',
  'Is my private code secure?',
];

export default function AIInput() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setMessages([]);
    setInput('');
  };

  const predefinedAnswers: Record<string, string> = {
    'How do I connect my GitHub repository?': 'Connecting your GitHub repository is simple. After signing up, you\'ll be prompted to authorize your GitHub account. Select repositories you want to track, and we\'ll set up webhooks automatically. Every push to those repos will trigger content generation.',
    'What social platforms can I post to?': 'DevSync AI currently supports LinkedIn, Twitter/X, and Instagram. We\'re actively adding more platforms including Mastodon, Bluesky, and Threads based on user demand.',
    'Is my private code secure?': 'Your code privacy is our top priority. We only read commit metadata (messages, author, branch names) - never your actual source code. Private repositories remain private, and you have full control over what gets shared.',
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const answer = predefinedAnswers[input] ||
        `I understand you're asking about "${input}". DevSync AI helps developers automatically generate and share social media content from their GitHub activity. Would you like me to explain how our GitHub integration works, or would you prefer to see our pricing plans?`;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-2 sm:px-4"
    >
      {/* AI Assistant Container - Feeta AI Style */}
      <div className="relative">
        {/* Subtle glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 via-white/10 to-white/10 rounded-[24px] blur-xl" />

        <div className="relative bg-[#0a0a0a] rounded-[20px] sm:rounded-[24px] border border-white/5 overflow-hidden">
          {/* Header - Minimal and Clean */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/5">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* AI Avatar with subtle pulse */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 rounded-full blur-lg opacity-30"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-left min-w-0">
                <h3 className="text-white font-semibold text-sm sm:text-lg break-words">Ask anything about DevSync</h3>
                <p className="text-gray-500 text-xs sm:text-sm break-words">Get instant answers about your workflow</p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/20 flex-shrink-0">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[10px] sm:text-xs font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area - Clean and Spacious */}
          <div className="h-[250px] sm:h-[320px] overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center px-2"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center mb-4 sm:mb-6"
                  >
                    <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <h4 className="text-white text-lg sm:text-xl font-semibold mb-2">Talk to DevSync AI</h4>
                  <p className="text-gray-500 text-sm sm:text-base max-w-md px-2 break-words">
                    I have real-time knowledge of our platform. Ask me about GitHub integration, social platforms, pricing, or anything else.
                  </p>

                  {/* Example questions as cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 w-full max-w-2xl mt-4 sm:mt-6">
                    {EXAMPLE_QUESTIONS.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => setInput(question)}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl text-left transition-all group"
                      >
                        <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors break-words">
                          {question}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-white rounded-2xl rounded-tr-md px-3 sm:px-5 py-2.5 sm:py-3.5'
                      : 'bg-white/5 rounded-2xl rounded-tl-md px-3 sm:px-5 py-2.5 sm:py-3.5 border border-white/5'
                  }`}>
                    <p className={`text-[14px] sm:text-[15px] leading-relaxed ${
                      message.role === 'user' ? 'text-black' : 'text-gray-200'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area - Minimal and Elegant */}
          <div className="px-4 sm:px-8 pb-4 sm:pb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 rounded-2xl sm:rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-2 sm:gap-3 bg-[#111] rounded-lg sm:rounded-2xl border border-white/10 focus-within:border-white/30 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything about DevSync..."
                  className="flex-1 px-3 sm:px-5 py-2.5 sm:py-4 bg-transparent text-white placeholder-gray-500 rounded-2xl focus:outline-none text-[14px] sm:text-[15px]"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`
                    m-1 sm:m-1.5 p-2 sm:p-3 rounded-xl transition-all
                    ${isLoading || !input.trim()
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-black shadow-lg'
                    }
                  `}
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            </div>

            {/* Helper text */}
            <div className="flex items-center justify-between mt-2 sm:mt-3">
              <p className="text-gray-600 text-[10px] sm:text-xs">
                Powered by AI • Responses may vary
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[10px] sm:text-xs font-medium">Reset</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
