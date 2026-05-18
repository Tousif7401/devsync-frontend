'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, MessageSquare, Send } from 'lucide-react';
import { ShiningText } from '@/components/ui/shining-text';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  displayedContent: string;
  isStreaming: boolean;
}

const EXAMPLE_QUESTIONS = [
  'How do I connect my GitHub repository?',
  'What social platforms can I post to?',
  'Is my private code secure?',
];

const THINKING_MESSAGES = [
  'Thinking...',
  'Crafting a response...',
  'Tailoring for you...',
  'Almost there...',
];

export default function AIInput() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState('Thinking...');
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleReset = () => {
    abortControllerRef.current?.abort();
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    setMessages([]);
    setInput('');
    setIsLoading(false);
    setIsThinking(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      displayedContent: input,
      isStreaming: false,
    };

    const assistantId = (Date.now() + 1).toString();
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      setIsThinking(false);

      const decoder = new TextDecoder();
      let accumulated = '';

      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', displayedContent: '', isStreaming: true }]);

      // Start typewriter
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      typewriterRef.current = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id !== assistantId || !msg.isStreaming) return msg;
            const current = msg.displayedContent;
            if (current.length >= msg.content.length) return msg;
            return {
              ...msg,
              displayedContent: msg.content.slice(0, current.length + 1),
            };
          })
        );
        scrollToBottom();
      }, 18);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
      }

      // Wait for typewriter to finish, then mark complete
      const checkComplete = setInterval(() => {
        setMessages((prev) => {
          const msg = prev.find((m) => m.id === assistantId);
          if (!msg || !msg.isStreaming) {
            clearInterval(checkComplete);
            return prev;
          }
          if (msg.displayedContent.length >= msg.content.length) {
            clearInterval(checkComplete);
            clearInterval(typewriterRef.current!);
            typewriterRef.current = null;
            return prev.map((m) =>
              m.id === assistantId ? { ...m, isStreaming: false } : m
            );
          }
          return prev;
        });
      }, 50);
    } catch (err: any) {
      setIsThinking(false);
      if (err.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: 'Sorry, something went wrong. Please try again.', displayedContent: 'Sorry, something went wrong. Please try again.', isStreaming: false },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Cycle thinking text
  useEffect(() => {
    if (!isThinking) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % THINKING_MESSAGES.length;
      setThinkingText(THINKING_MESSAGES[idx]);
    }, 1500);
    return () => clearInterval(interval);
  }, [isThinking]);

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
      {/* AI Assistant Container - Titan Style */}
      <div className="relative">
        <div className="relative bg-black/30 backdrop-blur-md rounded-cards sm:rounded-[24px] border border-white/15 overflow-hidden">
          {/* Header - Minimal and Clean */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/15">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* AI Avatar */}
              <div className="relative">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.03] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-left min-w-0">
                <h3 className="text-white font-semibold text-sm sm:text-lg break-words font-geist">Ask anything about DevSync</h3>
                <p className="text-white/60 text-xs sm:text-sm break-words font-geist">Get instant answers about your workflow</p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.03] border border-white/15 flex-shrink-0">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white text-[10px] sm:text-xs font-medium font-geist">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area - Clean and Spacious */}
          <div ref={chatContainerRef} className="h-[250px] sm:h-[320px] overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              {messages.length === 0 && !isThinking && (
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
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-cards bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 sm:mb-6"
                  >
                    <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <h4 className="text-white text-lg sm:text-xl font-semibold mb-2 font-geist">Talk to DevSync AI</h4>
                  <p className="text-white/60 text-sm sm:text-base max-w-md px-2 break-words font-geist">
                    I have real-time knowledge of our platform. Ask me about GitHub integration, social platforms, pricing, or anything else.
                  </p>

                  {/* Example questions as cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-2xl mt-3 sm:mt-4">
                    {EXAMPLE_QUESTIONS.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => setInput(question)}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/[0.03] hover:bg-white/10 border border-white/15 hover:border-brand rounded-buttons text-left transition-all group"
                      >
                        <p className="text-white/60 text-[10px] sm:text-xs group-hover:text-white transition-colors break-words font-geist">
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
                      ? 'bg-actionBlack rounded-cards rounded-tr-md px-3 sm:px-5 py-2.5 sm:py-3.5'
                      : 'bg-white/[0.03] rounded-cards rounded-tl-md px-3 sm:px-5 py-2.5 sm:py-3.5 border border-white/15'
                  }`}>
                    <p className={`text-[14px] sm:text-[15px] leading-relaxed font-geist ${
                      message.role === 'user' ? 'text-white' : 'text-white'
                    }`}>
                      {message.role === 'assistant' && message.isStreaming
                        ? message.displayedContent
                        : message.content}
                      {message.role === 'assistant' && message.isStreaming && message.displayedContent.length > 0 && (
                        <span className="inline-block w-0.5 h-4 bg-white animate-pulse ml-0.5 align-text-bottom" />
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.03] rounded-cards rounded-tl-md px-4 sm:px-5 py-3 sm:py-4 border border-white/15 flex items-center gap-2">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                      />
                    </div>
                    <ShiningText text={thinkingText} className="text-sm font-geist" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Input Area - Minimal and Elegant */}
          <div className="px-4 sm:px-8 pb-4 sm:pb-6">
            <div className="relative flex items-center gap-2 sm:gap-3 bg-white/[0.03] rounded-cards sm:rounded-cards border border-white/15 focus-within:border-brand transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask anything about DevSync..."
                className="flex-1 px-3 sm:px-5 py-2.5 sm:py-4 bg-transparent text-white placeholder-white/40 rounded-cards focus:outline-none text-[14px] sm:text-[15px] font-geist"
                disabled={isLoading}
              />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`
                    m-1 sm:m-1.5 p-2 sm:p-3 rounded-buttons transition-all font-geist
                    ${isLoading || !input.trim()
                      ? 'bg-white/10 text-white/60 cursor-not-allowed'
                      : 'bg-actionBlack text-white'
                    }
                  `}
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

            {/* Helper text */}
            <div className="flex items-center justify-between mt-2 sm:mt-3">
              <p className="text-white/60 text-[10px] sm:text-xs font-geist">
                Powered by AI • Responses may vary
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-buttons bg-white/[0.03] hover:bg-white/10 border border-white/15 text-white/60 hover:text-white transition-all font-geist"
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
