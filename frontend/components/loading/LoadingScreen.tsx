'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import DevSyncLogo from '../DevSyncLogo';

// Loading messages to display
const loadingMessages = [
  "Initializing...",
  "Loading resources...",
  "Preparing workspace...",
  "Almost there...",
];

// Easing functions
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messageOpacity, setMessageOpacity] = useState(1);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [textOpacity, setTextOpacity] = useState(0);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [screenOpacity, setScreenOpacity] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    // Message display timing
    const messageInterval = 1000; // ms per message
    const totalMessagesTime = loadingMessages.length * messageInterval;

    // Animation timing
    const logoAppearStart = 300;
    const logoAppearDuration = 500;
    const shrinkStart = totalMessagesTime + 200; // Start shrinking after messages
    const shrinkDuration = 500;
    const textAppearStart = shrinkStart + shrinkDuration;
    const textAppearDuration = 300;
    const slideToTopLeftStart = textAppearStart + textAppearDuration + 200;
    const slideToTopLeftDuration = 600;
    const fadeOutStart = slideToTopLeftStart + slideToTopLeftDuration;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Handle message transitions
      const messageIndex = Math.min(Math.floor(elapsed / messageInterval), loadingMessages.length - 1);
      const messageProgress = (elapsed % messageInterval) / messageInterval;

      setCurrentMessageIndex(messageIndex);
      setMessageOpacity(messageProgress < 0.2 ? messageProgress / 0.2 : (messageProgress > 0.8 ? (1 - messageProgress) / 0.2 : 1));

      // Logo appears smoothly
      if (elapsed >= logoAppearStart && elapsed < logoAppearStart + logoAppearDuration) {
        const t = (elapsed - logoAppearStart) / logoAppearDuration;
        const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setLogoOpacity(easeT);
      } else if (elapsed >= logoAppearStart + logoAppearDuration) {
        setLogoOpacity(1);
      }

      // Logo shrinks - stays centered
      if (elapsed >= shrinkStart && elapsed < shrinkStart + shrinkDuration) {
        const t = easeInOut((elapsed - shrinkStart) / shrinkDuration);
        setLogoScale(lerp(1, 0.5, t));
        setLogoPosition({ x: 0, y: 0 }); // Stay centered
      } else if (elapsed >= shrinkStart + shrinkDuration) {
        setLogoScale(0.5);
        setLogoPosition({ x: 0, y: 0 });
      }

      // Logo slides RIGHT to show text on LEFT
      // Text appears
      if (elapsed >= textAppearStart && elapsed < textAppearStart + textAppearDuration) {
        const t = easeOut((elapsed - textAppearStart) / textAppearDuration);
        setTextOpacity(t);
        // Move logo to right (positive X) so text appears on left
        setLogoPosition({ x: lerp(0, 15, t), y: 0 });
        setTextPosition({ x: 0, y: 0 });
      } else if (elapsed >= textAppearStart + textAppearDuration) {
        setTextOpacity(1);
        setLogoPosition({ x: 15, y: 0 });
        setTextPosition({ x: 0, y: 0 });
      }

      // Slide to top-left corner
      if (elapsed >= slideToTopLeftStart && elapsed < slideToTopLeftStart + slideToTopLeftDuration) {
        const t = easeInOut((elapsed - slideToTopLeftStart) / slideToTopLeftDuration);

        // Move from current position (logo right of center) to top-left
        const startX = 15; // Logo is 15% to the right
        const startY = 0;
        const endX = -42; // Top-left position X
        const endY = -42; // Top-left position Y

        setLogoPosition({ x: lerp(startX, endX, t), y: lerp(startY, endY, t) });
        setTextPosition({ x: lerp(0, endX + 25, t), y: lerp(0, endY + 2, t) });

        // Scale down more for top-left
        const finalScale = lerp(0.5, 0.35, t);
        setLogoScale(finalScale);

        // Fade out background
        if (t > 0.5) {
          const fadeT = (t - 0.5) / 0.5;
          setScreenOpacity(1 - fadeT * 0.9);
        }
      } else if (elapsed >= slideToTopLeftStart + slideToTopLeftDuration) {
        // Final positions
        setLogoPosition({ x: -42, y: -42 });
        setTextPosition({ x: -17, y: -40 });
        setLogoScale(0.35);
        setScreenOpacity(0.1);
      }

      // Complete loading animation
      if (elapsed >= fadeOutStart && elapsed < fadeOutStart + 200) {
        setScreenOpacity(0);
        setLoadingComplete(true);
        setShow(false);
        setTimeout(onComplete, 100);
      } else if (elapsed < fadeOutStart + 200) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <>
      {/* Permanent logo in top-left - stays after loading completes */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed top-6 left-6 z-40"
          >
            <DevSyncLogo size={180} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading screen */}
      <AnimatePresence mode="sync">
        {show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: '#0a1942ff', opacity: screenOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo and Text Container */}
            <div className="absolute" style={{ left: '50%', top: '50%', transition: 'none' }}>
              {/* DevPulse Logo Image with loading animation */}
              <div
                style={{
                  opacity: logoOpacity,
                  scale: logoScale,
                  transform: `translate(calc(${logoPosition.x}% - 50%), calc(${logoPosition.y}% - 50%))`,
                  transformOrigin: 'center center',
                  transition: 'none',
                }}
              >
                <img
                  src="/DevPulse_LOGO.png"
                  alt="DevPulse Logo"
                  width={200}
                  height={80}
                  style={{ display: 'block' }}
                />
              </div>

              {/* "DevSync AI" Text */}
              <div
                style={{
                  opacity: textOpacity,
                  transform: `translate(calc(${textPosition.x}% - 50%), calc(${textPosition.y + 12}%))`,
                  transformOrigin: 'left center',
                  transition: 'none',
                  position: 'absolute',
                  left: '120px', // Position text on RIGHT side of loader
                  top: '0',
                }}
              >
                <div
                  className="text-4xl font-bold text-white font-heading"
                  style={{ letterSpacing: '-1px' }}
                >
                  DevSync AI
                </div>
              </div>
            </div>

            {/* Loading messages */}
            <motion.div
              key={`message-${currentMessageIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: messageOpacity, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute text-2xl font-medium text-white/90 text-center font-body"
              style={{
                letterSpacing: '-0.3px',
                top: '65%',
                transition: 'none',
              }}
            >
              {loadingMessages[currentMessageIndex]}
            </motion.div>

            {/* Progress indicator dots */}
            <div className="absolute flex gap-2" style={{ top: '75%', transition: 'none' }}>
              {loadingMessages.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{
                    opacity: index === currentMessageIndex ? 1 : 0.3,
                    scale: index === currentMessageIndex ? 1.2 : 0.8,
                    backgroundColor: index === currentMessageIndex ? '#FF3B5C' : 'rgba(255,255,255,0.4)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
