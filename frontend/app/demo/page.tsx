'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail, User, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import AnoAI from '@/components/ui/animated-shader-background';
import { Tiles } from '@/components/ui/tiles';
import { Button } from '@/components/ui/neon-button';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

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

        // Log detailed email delivery status
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
      <main className="min-h-screen bg-darkBg flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <AnoAI />
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
          <Tiles rows={50} cols={8} tileSize="md" />
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-[#4C3BCF] to-[#8771ff] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5 5 5M9 17l5-5 5 5" />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600 }}>
              Request Received!
            </h2>
            <p className="text-gray-300 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Thank you for your interest in DevSync AI. Our team will contact you shortly to schedule your personalized demo.
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="solid"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                Submit Another Request
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-center"
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
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-darkBg flex items-center justify-center relative overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <AnoAI />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
        <Tiles rows={50} cols={8} tileSize="md" />
      </div>

      {/* Demo Request Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easings.smooth }}
        className="relative z-10 w-full max-w-2xl mx-4"
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
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600 }}>DevSync AI</h1>
            </div>
            <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ready to see DevSync AI in action? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Demo Request Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easings.smooth }}
            onSubmit={handleSubmit}
            className="space-y-5"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role / Job Title
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., Developer, CTO, Product Manager"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your use case, team size, or any specific features you're interested in..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] transition-colors resize-none"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: easings.smooth }}
            >
              <Button
                type="submit"
                variant="solid"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                disabled={isLoading}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {isLoading ? (
                  'Submitting...'
                ) : (
                  <>
                    Request Demo
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-white/10 text-center"
          >
            <p className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Prefer to book directly?{' '}
              <a href="mailto:tousif.cse.rymec@gmail.com" className="text-[#4C3BCF] hover:text-[#5235ef] font-medium transition-colors">
                Email us at tousif.cse.rymec@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center mt-6"
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
        </div>
      </motion.div>
    </main>
  );
}
