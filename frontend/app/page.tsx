'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AIInput from '@/components/landing/AIInput';
import ContentOutputTypes from '@/components/landing/ContentOutputTypes';
import FeatureCards from '@/components/landing/FeatureCards';
import WorkflowSteps from '@/components/landing/WorkflowSteps';
import DevSyncOverviewCard from '@/components/landing/DevSyncOverviewCard';
import AnoAI from '@/components/ui/animated-shader-background';
import { Tiles } from '@/components/ui/tiles';
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable-navbar';
import { Button } from '@/components/ui/neon-button';
import { ArrowRight, Github, Linkedin, Zap, Shield, Clock, TrendingUp } from 'lucide-react';
import LogoLoop from '@/components/ui/LogoLoop';
import SocialIconBlock from '@/components/ui/SocialIconBlock';
import { NeoMinimalFooter } from '@/components/ui/neo-minimal-footer';
import HeroPill from '@/components/ui/hero-pill';

// Easing curves matching Feeta AI patterns
const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

// Word-by-word reveal for HERO headlines (uses animate, not whileInView)
function HeroWordReveal({ text, className = '', delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + (i * 0.03), ease: easings.smooth }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Section heading with clip-path reveal (Feeta AI style)
function SectionHeading({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.h2
      initial={{
        y: 10,
        opacity: 0
      }}
      whileInView={{
        y: 0,
        opacity: 1
      }}
      viewport={{ once: false, margin: '-30px' }}
      transition={{ duration: 0.5, ease: easings.smooth }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}

// Section subheading - simple fade up
function SectionSubheading({ children, className = '', delay = 0.15 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.p
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ delay, duration: 0.6, ease: easings.smooth }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

// Staggered cards container (Feeta AI: 120ms stagger, -50px margin)
function StaggerCards({ children, className = '', staggerDelay = 0.12 }: { children: React.ReactNode, className?: string, staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      transition={{ duration: 0.5, ease: easings.smooth }}
    >
      {children}
    </motion.div>
  );
}

// Fade up for general content
function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ delay, duration: 0.6, ease: easings.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Product', link: '#content-output-types' },
    { name: 'How it works', link: '#watch-devsync-ai-in-action' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-darkBg overflow-x-hidden w-full relative">
        {/* Navigation */}
        <Navbar>
          <NavBody className={isScrolled ? 'bg-darkBg/90 backdrop-blur-xl border-b border-white/5' : ''}>
            <NavbarLogo />
            <div className="flex items-center gap-8">
              <NavItems items={navItems} />
              <Link href="/login">
                <NavbarButton variant="secondary">Login</NavbarButton>
              </Link>
              <Link href="/demo">
                <Button variant="solid" size="default" className="!py-2 !px-6 !text-base">Request for Demo</Button>
              </Link>
            </div>
        </NavBody>

          <MobileNav isOpen={isMobileMenuOpen}>
            <MobileNavHeader isOpen={isMobileMenuOpen}>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-gray-400 hover:text-white text-xl font-medium font-heading py-2 block bg-[#0a0a0a]"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex w-full flex-col gap-4 pt-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <NavbarButton
                    variant="secondary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                </Link>
                <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                  <NavbarButton
                    variant="primary"
                    className="w-full"
                  >
                    Request for Demo
                  </NavbarButton>
                </Link>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Hero Section - Feeta AI style animations */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 overflow-hidden w-full">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
            <AnoAI />
          </div>

          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-30">
            <div className="w-full h-full">
              <Tiles rows={50} cols={7} tileSize="md" />
            </div>
          </div>

          <div className="relative z-50 max-w-7xl mx-auto w-full">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
              {/* Announcement Pill */}
              <HeroPill
                href="#features"
                label="AI-Powered Content Creation"
                announcement="New"
                className="mb-8"
              />

              {/* Hero headline - fade up */}
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: easings.smooth }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight break-words w-full"
              >
                Turn Your GitHub <span className="font-serif italic font-semibold text-white">commits</span> Into<br />
                <HeroWordReveal text="Social Stories That Matter" delay={0.7} />
              </motion.h1>

              {/* Subheading - fade up */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: easings.smooth }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mb-6 sm:mb-8 md:mb-10 text-center mx-auto px-2 break-words"
              >
                Stop choosing between coding and building your brand. Every commit becomes content—automatically.
              </motion.p>

              {/* CTA buttons - staggered */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 1.2
                    }
                  }
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-2"
              >
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="solid" size="lg" className="!px-6 !py-1.5 sm:!px-10 sm:!py-2.5 text-sm sm:text-base flex items-center gap-2">
                    Book a Demo
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 -rotate-45" />
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="#powerful-features">
                    <Button variant="hollow" size="lg" className="!px-6 !py-1.5 sm:!px-10 sm:!py-2.5 text-sm sm:text-base flex items-center gap-2">
                      View Services
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden w-full">
          <div className="max-w-5xl mx-auto text-center w-full">
            <FadeUp>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 md:mb-12">Integrated with your favorite platforms</p>
            </FadeUp>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center w-full overflow-hidden"
            >
              <div className="w-full overflow-hidden">
                <LogoLoop
                  logos={[
                    { node: <SocialIconBlock icon="GitHub" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "GitHub", useIconLogo: true, iconSrc: "/Logos/github.png" },
                    { node: <SocialIconBlock icon="X" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "X/Twitter", useIconLogo: true, iconSrc: "/Logos/twitter.png" },
                    { node: <SocialIconBlock icon="LinkedIn" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "LinkedIn", useIconLogo: true, iconSrc: "/Logos/linkedin.png" },
                    { node: <SocialIconBlock icon="Instagram" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "Instagram", useIconLogo: true, iconSrc: "/Logos/instagram.png" },
                    { node: <SocialIconBlock icon="Gemini" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "Gemini", useIconLogo: true, iconSrc: "/Logos/gemini-color.svg" },
                    { node: <SocialIconBlock icon="Vercel" containerSize={32} withShadow={false} hoverLift={false} openInNew={false} />, title: "Vercel", useIconLogo: true, iconSrc: "/Logos/vercel.svg" },
                  ]}
                  speed={50}
                  direction="left"
                  logoHeight={48}
                  gap={24}
                  fadeOut={true}
                  scaleOnHover={true}
                  fadeOutColor="#000000"
                  renderItem={(item) => (
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900/50 rounded-lg border border-gray-800">
                      {item.useIconLogo ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full flex-shrink-0">
                          <img
                            src={item.iconSrc}
                            alt={item.title}
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            style={{ filter: item.iconSrc?.includes('twitter') || item.iconSrc?.includes('vercel') ? 'brightness(0) invert(1)' : 'none' }}
                          />
                        </div>
                      ) : (
                        item.node
                      )}
                      <span className="text-white text-xs sm:text-sm md:text-base font-normal truncate max-w-full">{item.title}</span>
                    </div>
                  )}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workflow Steps - 01, 02, 03 */}
        <WorkflowSteps />

        {/* Feature Cards - CardSwap Animation */}
        <FeatureCards />

        {/* Content Output Types - Display Cards */}
        <ContentOutputTypes />

        {/* Watch DevSync AI in Action - Live Demo */}
        <section id="watch-devsync-ai-in-action" className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden w-full">
          <div className="max-w-5xl mx-auto w-full">
            <div className="relative z-20 text-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
              <SectionHeading className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-heading break-words">
                Watch DevSync AI in Action
              </SectionHeading>
              <SectionSubheading className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto break-words">
                See how your commits are transformed into engaging social content—automatically.
              </SectionSubheading>
            </div>

            <FadeUp delay={0.2} className="flex justify-center w-full">
              <div className="w-full max-w-4xl h-[450px] sm:h-[500px] md:h-[550px] border border-gray-800 rounded-2xl bg-black/20 p-4 sm:p-6 flex items-start justify-center overflow-hidden">
                <DevSyncOverviewCard />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Benefits/Results Section */}
        <section className="relative z-10 py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 px-2">
              <SectionHeading className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-heading break-words">
                DevSync AI Results
              </SectionHeading>
              <SectionSubheading className="text-base sm:text-lg md:text-xl text-white break-words">
                Transform your development workflow into a content engine
              </SectionSubheading>
            </div>

            <StaggerCards className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-h-[280px]">
              {[
                {
                  title: 'Consistent Presence Without the Hustle',
                  description: 'Build thought leadership while you code. Your audience sees regular updates about your work, and you never spend time drafting posts.',
                  icon: <Clock className="w-5 h-5" />,
                },
                {
                  title: 'Content That Actually Resonates',
                  description: 'No generic tech quotes. Share real progress, real challenges, real wins. Your followers get authentic insights into your development journey.',
                  icon: <TrendingUp className="w-5 h-5" />,
                },
                {
                  title: 'Multiply Your Impact',
                  description: 'One push to GitHub becomes posts across LinkedIn, X, and Instagram. Reach your entire audience without extra effort.',
                  icon: <Zap className="w-5 h-5" />,
                },
                {
                  title: 'Stay In Control',
                  description: 'Review every post before it goes live. Edit, customize, or schedule—your brand voice, always maintained.',
                  icon: <Shield className="w-5 h-5" />,
                },
              ].map((benefit, index) => (
                <StaggerCard key={index}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="rounded-2xl p-8 border border-gray-700/50 bg-gradient-to-br from-draftrPurple/30 via-gray-900/50 to-gray-900/80 hover:border-draftrPurple/40 transition-all duration-300 flex flex-col h-full"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 200 }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                    >
                      <span className="text-draftrPurple">{benefit.icon}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 font-heading">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed flex-1">{benefit.description}</p>
                  </motion.div>
                </StaggerCard>
              ))}
            </StaggerCards>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden w-full">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-12 sm:mb-16 px-2">
              <SectionHeading className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading break-words">
                Got Questions?
              </SectionHeading>
              <SectionSubheading className="text-base sm:text-lg md:text-xl text-white break-words">
                Quick answers about DevSync AI
              </SectionSubheading>
            </div>

            <StaggerCards staggerDelay={0.08} className="space-y-3">
              {[
                {
                  q: 'Does DevSync AI read my actual code?',
                  a: 'No. We only read commit metadata—messages, branch names, and PR descriptions. Your code stays private. Private repositories remain completely private.',
                },
                {
                  q: 'What platforms can I post to?',
                  a: 'Currently we support LinkedIn, X (Twitter), and Instagram. More platforms are coming soon based on user feedback.',
                },
                {
                  q: 'Can I edit the generated posts?',
                  a: 'Absolutely. Every post is fully customizable before publishing. You can also set up custom prompts to match your brand voice.',
                },
                {
                  q: 'How does the AI know what to write?',
                  a: 'We analyze your commit messages and context to generate relevant, engaging content. The more you push, the better it gets at understanding your style.',
                },
                {
                  q: 'What if I don\'t want to post every commit?',
                  a: 'You have full control. Set filters by repository, branch, or even specific commit patterns. Only generate posts for what matters.',
                },
              ].map((faq, index) => (
                <StaggerCard key={index}>
                  <motion.details
                    className="group bg-[#111111] rounded-2xl border border-white/5 hover:border-draftrPurple/30 transition-all"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer">
                      <h3 className="text-base sm:text-lg font-semibold text-white pr-2 sm:pr-4 font-heading break-words">{faq.q}</h3>
                      <motion.svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </summary>
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-sm sm:text-base text-white leading-relaxed break-words">{faq.a}</p>
                    </div>
                  </motion.details>
                </StaggerCard>
              ))}
            </StaggerCards>

            <FadeUp delay={0.4} className="mt-12">
              <AIInput />
            </FadeUp>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative z-10 py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <SectionHeading className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-heading break-words">
              Your commits have stories.<br />Let's tell them.
            </SectionHeading>
            <SectionSubheading delay={0.15} className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto break-words">
              Join thousands of developers building their brand while they code. Start your free trial today.
            </SectionSubheading>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-100px' }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-2"
            >
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/demo">
                  <Button variant="solid" size="lg" className="!px-6 !py-1.5 sm:!px-10 sm:!py-2.5 text-sm sm:text-base flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="ghost" size="lg" className="!px-6 !py-1.5 sm:!px-10 sm:!py-2.5 text-sm sm:text-base flex items-center gap-2">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  Connect GitHub
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <NeoMinimalFooter />
      </main>
    </>
  );
}
