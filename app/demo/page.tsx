'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

interface FloatingPathsProps {
  position: number;
}

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', role: '', message: '' });

        if (!result.adminEmailSent) {
          console.error('Admin email failed to send:', result.adminError);
        }
        if (!result.userEmailSent) {
          console.error('User email failed to send:', result.userError);
        }
      } else {
        console.error('API Error:', result.error);
        alert(result.error || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-black">
        {/* Left Panel - Brand */}
        <div className="bg-neutral-950 relative hidden h-full flex-col border-r border-neutral-800 p-10 lg:flex">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 to-transparent" />
          <div className="z-10 flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
            </div>
            <p className="text-xl font-semibold text-white font-geist">DevSync AI</p>
          </div>
          <div className="z-10 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-xl text-neutral-300">
                Thank you for your interest! Our team will contact you shortly to schedule your personalized demo.
              </p>
              <footer className="font-mono text-sm font-semibold text-neutral-400">
                ~ Request Received
              </footer>
            </blockquote>
          </div>
          <div className="absolute inset-0">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
        </div>

        {/* Right Panel - Success Message */}
        <div className="relative flex min-h-screen flex-col justify-center p-4 bg-black">
          <div
            aria-hidden
            className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
          >
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,hsla(0,0%,10%,.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 right-0 h-[80rem] w-[35rem] -translate-y-[21.875rem] rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[80rem] w-[15rem] [translate:5%_-50%] rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[80rem] w-[15rem] -translate-y-[21.875rem] rounded-full" />
          </div>

          <button
            className="absolute top-7 left-5 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-geist"
            onClick={() => window.location.href = '/'}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Home
          </button>

          <div className="mx-auto space-y-4 sm:w-sm w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-white to-neutral-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5 5 5M9 17l5-5 5 5" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 font-geist">
                Request Received!
              </h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white hover:bg-neutral-100 text-black rounded-md px-4 py-2.5 text-sm font-medium font-geist transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-black">
      {/* Left Panel - Brand */}
      <div className="bg-neutral-950 relative hidden h-full flex-col border-r border-neutral-800 p-10 lg:flex">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 to-transparent" />
        <div className="z-10 flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
            <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
          </div>
          <p className="text-xl font-semibold text-white font-geist">DevSync AI</p>
        </div>
        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl text-neutral-300">
              Ready to see DevSync AI in action? Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <footer className="font-mono text-sm font-semibold text-neutral-400">
              ~ Demo Request
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="relative flex min-h-screen flex-col justify-center p-4 bg-black">
        <div
          aria-hidden
          className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,hsla(0,0%,10%,.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 right-0 h-[80rem] w-[35rem] -translate-y-[21.875rem] rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[80rem] w-[15rem] [translate:5%_-50%] rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[80rem] w-[15rem] -translate-y-[21.875rem] rounded-full" />
        </div>

        <button
          className="absolute top-7 left-5 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-geist"
          onClick={() => window.location.href = '/'}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Home
        </button>

        <div className="mx-auto space-y-4 sm:w-sm w-full">
          <div className="flex flex-col space-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-wide text-white font-geist">
              Request a Demo
            </h1>
            <p className="text-neutral-400 text-base">
              Fill out the form below to schedule your personalized demo.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2 font-geist">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent font-geist"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-geist">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your work email"
                  className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent font-geist"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2 font-geist">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent font-geist"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-geist">
                  Role / Job Title
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter your role or job title"
                  className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent font-geist"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2 font-geist">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your use case, team size, or any specific features you're interested in... (optional)"
                rows={4}
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none font-geist"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-black rounded-md px-4 py-2.5 text-sm font-medium font-geist transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : (
                  <>
                    Request Demo
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>

          <div className="text-center pt-4">
            <p className="text-neutral-400 text-sm font-geist">
              Prefer to book directly?{' '}
              <a href="mailto:tousif.cse.rymec@gmail.com" className="text-white hover:underline font-medium transition-colors">
                Email us at tousif.cse.rymec@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function FloatingPaths({ position }: FloatingPathsProps) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
