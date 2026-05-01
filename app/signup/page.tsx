'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, X } from 'lucide-react';
import AnoAI from '@/components/ui/animated-shader-background';
import { Tiles } from '@/components/ui/tiles';
import { Button } from '@/components/ui/neon-button';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Signup attempt:', { name, email, passwordLength: password?.length });

    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log('Signup response:', { status: response.status, success: data.success, error: data.error });

      if (response.ok && data.success) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.data));
        }
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-darkBg flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <AnoAI />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
        <Tiles rows={50} cols={8} tileSize="md" />
      </div>

      {/* Sign Up Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easings.smooth }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easings.smooth }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image
                src="/DevPulse_LOGO_clean.png"
                alt="DevSync AI Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600 }}>DevSync AI</h1>
            </div>
            <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>Create your account to get started</p>
          </motion.div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easings.smooth }}
            className="space-y-3 mb-8"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <button
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-all text-white font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <Github className="w-5 h-5" />
              <span>Sign up with GitHub</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </motion.div>

          {/* Sign Up Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: easings.smooth }}
            onSubmit={handleSubmit}
            className="space-y-5"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                required
              />
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {isLoading ? (
                'Creating account...'
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-white/10 text-center"
          >
            <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Already have an account?{' '}
              <a href="/login" className="text-[#4C3BCF] hover:text-[#5235ef] font-medium transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Sign in
              </a>
            </p>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <a
            href="/"
            className="text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
