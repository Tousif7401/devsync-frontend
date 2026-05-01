'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  targetAngle: number;
}

interface AntigravityEffectProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  fieldStrength?: number;
}

export default function AntigravityEffect({
  count = 120, // Reduced from 210 for better performance
  magnetRadius = 10,
  ringRadius = 14,
  waveSpeed = 0.1,
  waveAmplitude = 0.6,
  particleSize = 0.5,
  lerpSpeed = 0.03,
  color = '#632cc9',
  particleVariance = 0.1,
  rotationSpeed = 0,
  depthFactor = 0.5,
  pulseSpeed = 0.5,
  fieldStrength = 30,
}: AntigravityEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Reduced DPR for performance
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeHandler = resizeCanvas;
    window.addEventListener('resize', resizeHandler, { passive: true });

    // Initialize particles
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const variance = 1 + (Math.random() - 0.5) * particleVariance;
      return {
        x: centerX + Math.cos(angle) * ringRadius * variance,
        y: centerY + Math.sin(angle) * ringRadius * variance,
        vx: 0,
        vy: 0,
        radius: particleSize * variance,
        angle,
        targetAngle: angle,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    let animationId: number;
    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = timestamp - lastTime;
      // Cap updates to ~60fps max, skip frames for performance
      if (deltaTime < 16) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      timeRef.current += waveSpeed;

      particlesRef.current.forEach((particle, i) => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction
        if (distToMouse < magnetRadius * 10) {
          const force = (1 - distToMouse / (magnetRadius * 10)) * fieldStrength;
          particle.vx += (dx / distToMouse) * force * 0.1;
          particle.vy += (dy / distToMouse) * force * 0.1;
        }

        // Return to center force
        const targetAngle = particle.angle + timeRef.current + rotationSpeed * i;
        const pulseRadius = ringRadius * (1 + Math.sin(timeRef.current * pulseSpeed + i * 0.1) * waveAmplitude);

        const targetX = centerX + Math.cos(targetAngle) * pulseRadius;
        const targetY = centerY + Math.sin(targetAngle) * pulseRadius;

        // Lerp towards target position
        particle.x += (targetX - particle.x) * lerpSpeed;
        particle.y += (targetY - particle.y) * lerpSpeed;

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Depth effect (scale by z-position simulated)
        const depth = 1 + Math.sin(timeRef.current + i * 0.05) * depthFactor;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * depth, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6 + depth * 0.4;
        ctx.fill();

        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * depth * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * depth * 2
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.2;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      canvas.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [count, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, particleVariance, rotationSpeed, depthFactor, pulseSpeed, fieldStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
