'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, Circle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { StepItem, SocialButton, InputGroup } from './aurora-components';

interface AuthPageProps {
  mode?: 'login' | 'signup';
  onModeChange?: (mode: 'login' | 'signup') => void;
}

export function AuthPage({ mode = 'login', onModeChange }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const body = mode === 'login'
        ? { email, password }
        : { name: `${firstName} ${lastName}`, email, password };

      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.data));
        }
        window.location.href = '/dashboard';
      } else {
        alert(data.error || `${mode === 'login' ? 'Login' : 'Signup'} failed`);
      }
    } catch (error) {
      console.error(`${mode} error:`, error);
      alert(`Failed to ${mode}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* Left Column - Hero & Video */}
      <div className="relative hidden w-[52%] flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full lg:flex">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 w-full max-w-xs space-y-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Circle className="fill-white text-white w-6 h-6" />
            <span className="text-xl font-semibold tracking-tight font-inter">DevSync AI</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-4xl font-medium tracking-tight whitespace-nowrap font-inter">
              {mode === 'signup' ? 'Join DevSync AI' : 'Welcome Back'}
            </h2>
            {mode === 'signup' && (
              <p className="text-white/60 text-sm leading-relaxed px-4 font-inter">
                3 quick steps to transform your commits into content.
              </p>
            )}
          </motion.div>

          {/* Steps - Only show in signup mode */}
          {mode === 'signup' && (
            <motion.div variants={itemVariants} className="space-y-3">
              <StepItem number={1} text="Connect your GitHub" active />
              <StepItem number={2} text="Set up content preferences" />
              <StepItem number={3} text="Start generating posts" />
            </motion.div>
          )}

          {/* Quote - Only show in login mode */}
          {mode === 'login' && (
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-xl text-white leading-relaxed font-inter">
                &ldquo;This Platform has helped me to save time and serve my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm font-semibold text-white/40 font-inter">
                ~ Mohammed Tousif
              </footer>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 lg:hidden mb-4">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
            </div>
            <span className="text-xl font-semibold tracking-tight font-inter">DevSync AI</span>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight font-inter text-white">
              {mode === 'signup' ? 'Create New Profile' : 'Welcome Back'}
            </h1>
            <p className="text-white/40 text-sm font-inter">
              {mode === 'signup'
                ? 'Input your basic details to begin the journey.'
                : 'Enter your credentials to access your account.'}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <SocialButton
                icon={<GithubIcon className="w-5 h-5" />}
                label="Continue with GitHub"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest font-inter">
                Or
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <InputGroup
                  label="First Name"
                  placeholder="John"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputGroup
                  label="Last Name"
                  placeholder="Doe"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <InputGroup
              label="Email"
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputGroup
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              helperText="Requires at least 8 symbols."
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 font-inter transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-white/40 text-sm font-inter">
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange?.('signup')}
                    className="text-white hover:underline font-medium ml-1"
                  >
                    Create New Profile
                  </button>
                </>
              ) : (
                <>
                  Member of the team?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange?.('login')}
                    className="text-white hover:underline font-medium ml-1"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Back to Home */}
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-inter mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </main>
  );
}