'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { InputGroup } from '@/components/ui/aurora-components';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', company: '', role: '', message: '' });

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

  if (isSubmitted) {
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

            {/* Success Message */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-4xl font-medium tracking-tight font-inter text-white">
                Request Received!
              </h2>
              <p className="text-white/60 text-sm leading-relaxed px-4 font-inter">
                Thank you for your interest! Our team will contact you shortly to schedule your personalized demo.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Success */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-xl text-center"
          >
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 lg:hidden mb-8 justify-center">
              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
              </div>
              <span className="text-xl font-semibold tracking-tight font-inter">DevSync AI</span>
            </div>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              >
                <ArrowRight className="w-10 h-10 text-black" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] font-inter transition-all"
              >
                Submit Another Request
              </button>
            </motion.div>

            {/* Back to Home */}
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-inter mx-auto mt-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

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
              Request a Demo
            </h2>
            <p className="text-white/60 text-sm leading-relaxed px-4 font-inter">
              Ready to see DevSync AI in action? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>
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
          <div className="flex items-center gap-2 lg:hidden mb-4 justify-center">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
            </div>
            <span className="text-xl font-semibold tracking-tight font-inter">DevSync AI</span>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight font-inter text-white">
              Schedule Your Demo
            </h1>
            <p className="text-white/40 text-sm font-inter">
              Fill out the form below to request a personalized demonstration.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="First Name"
                placeholder="John"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputGroup
                label="Last Name"
                placeholder="Doe"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <InputGroup
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Company Name"
                placeholder="Your Company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <InputGroup
                label="Role / Job Title"
                placeholder="Developer"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-white">
                Message <span className="text-white/40">(Optional)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your use case, team size, or any specific features you're interested in..."
                rows={4}
                className="w-full bg-brandGray border-none rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 font-inter transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Submitting...
                </span>
              ) : (
                <>
                  Request Demo
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Email Alternative */}
          <div className="text-center">
            <p className="text-white/40 text-sm font-inter">
              Prefer to book directly?{' '}
              <a href="mailto:tousif.cse.rymec@gmail.com" className="text-white hover:underline font-medium transition-colors">
                Email us at tousif.cse.rymec@gmail.com
              </a>
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