'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeftIcon,
    GithubIcon,
    AtSignIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AuthPageProps {
    mode?: 'login' | 'signup';
    onModeChange?: (mode: 'login' | 'signup') => void;
}

export function AuthPage({ mode = 'login', onModeChange }: AuthPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
            const body = mode === 'login'
                ? { email, password }
                : { name, email, password };

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

    // const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
    //     <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         fill="currentColor"
    //         {...props}
    //     >
    //         <g>
    //             <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    //         </g>
    //     </svg>
    // );

    // const AppleIcon = (props: React.ComponentProps<'svg'>) => (
    //     <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         fill="currentColor"
    //         {...props}
    //     >
    //         <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-1.67-.73-2.78-.78-1.42-.26-3.38.56-4.48 2.01-1.22-1.55-3.17-2.24-4.71-2.34-.94-.06-2.02.29-3.03.67-1.01.38-1.77.26-2.54-.09-.8-.35-1.44-1.28-1.44-.98 0-1.38.72-1.56 1.52-1.31.74.08 1.78.42 2.85.63 1.76.32 3.32-.38 4.92-.73.95-.21 2.33-.53 3.5.36 1.37 1.04 1.88 2.6 2.03 4.64.18 2.43-1.78 4.78-3.58 4.78-2.92 0-4.39-2.75-5.72-4.55-1.58-2.15-2.7-3.52-5.72-3.52-3.12 0-5.74 2.16-5.74 5.01 0 2.67 2.34 4.98 5.74 5.43z"/>
    //     </svg>
    // );

    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-black">
            {/* Left Panel - Brand & Quote */}
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
                            &ldquo;This Platform has helped me to save time and serve my
                            clients faster than ever before.&rdquo;
                        </p>
                        <footer className="font-mono text-sm font-semibold text-neutral-400">
                            ~ Mohammed Tousif
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            {/* Right Panel - Auth Form */}
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
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                            <Image src="/DevPulse_LOGO_clean.png" alt="DevSync AI" width={24} height={24} />
                        </div>
                        <p className="text-xl font-semibold text-white font-geist">DevSync AI</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <h1 className="font-heading text-2xl font-bold tracking-wide text-white font-geist">
                            Sign In or Join Now!
                        </h1>
                        <p className="text-neutral-400 text-base">
                            Login or create your DevSync AI account.
                        </p>
                    </div>

                    {/* Google Button - Commented out */}
                    {/* <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md px-4 py-2.5 transition-all text-white text-sm font-medium font-geist shadow-sm"
                    >
                        <GoogleIcon className="w-4 h-4" />
                        Continue with Google
                    </button> */}

                    {/* Apple Button - Commented out */}
                    {/* <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md px-4 py-2.5 transition-all text-white text-sm font-medium font-geist shadow-sm"
                    >
                        <AppleIcon className="w-4 h-4" />
                        Continue with Apple
                    </button> */}

                    {/* GitHub Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md px-4 py-2.5 transition-all text-white text-sm font-medium font-geist shadow-sm"
                    >
                        <GithubIcon className="w-4 h-4" />
                        Continue with GitHub
                    </button>

                    <div className="flex w-full items-center justify-center">
                        <div className="bg-neutral-800 h-px w-full" />
                        <span className="text-neutral-400 px-2 text-xs font-geist">OR</span>
                        <div className="bg-neutral-800 h-px w-full" />
                    </div>

                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <p className="text-neutral-400 text-start text-xs font-geist">
                            Enter your email address to sign in or create an account
                        </p>
                        <div className="relative h-max">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-9 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                required
                            />
                            <div className="text-neutral-500 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center px-3">
                                <AtSignIcon className="w-4 h-4" aria-hidden="true" />
                            </div>
                        </div>

                        {mode === 'signup' && (
                            <div className="relative h-max">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        <div className="relative h-max">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                className="w-full h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white hover:bg-neutral-100 text-black rounded-md px-4 py-2.5 text-sm font-medium font-geist transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                mode === 'login' ? 'Signing in...' : 'Creating account...'
                            ) : (
                                <span>Continue With Email</span>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-neutral-400 text-sm font-geist">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => onModeChange?.(mode === 'login' ? 'signup' : 'login')}
                                className="text-white hover:underline font-medium font-geist ml-1"
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    <p className="text-neutral-400 mt-8 text-sm">
                        By clicking continue, you agree to our{' '}
                        <a href="#" className="text-white hover:underline underline-offset-4">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-white hover:underline underline-offset-4">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}

function FloatingPaths({ position }: { position: number }) {
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
