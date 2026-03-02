'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-off-white px-6">
            <div className="w-full max-w-md">
                <div className="bg-white p-10 border border-light-border">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 relative flex items-center justify-center mx-auto mb-4">
                            <img
                                src="/Time Logo .svg"
                                alt="Design Studio"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="font-serif text-2xl font-semibold text-charcoal">
                            Admin Login
                        </h1>
                        <p className="text-warm-gray text-sm mt-2">
                            DESIGN STUDIO Dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="admin@studioarc.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
