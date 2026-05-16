'use client';

import { useState } from 'react';
import { AuthPage } from '@/components/ui/auth-page';

export default function LoginPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    return <AuthPage mode={mode} onModeChange={setMode} />;
}
