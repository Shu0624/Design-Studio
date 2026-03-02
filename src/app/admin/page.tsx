'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
    totalProjects: number;
    totalServices: number;
    unreadMessages: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Projects', value: stats?.totalProjects ?? 0, icon: '🏗️', href: '/admin/projects' },
        { label: 'Services Listed', value: stats?.totalServices ?? 0, icon: '⚙️', href: '/admin/services' },
        { label: 'Unread Messages', value: stats?.unreadMessages ?? 0, icon: '✉️', href: '/admin/messages' },
    ];

    return (
        <div>
            <h1 className="font-serif text-3xl font-semibold text-charcoal mb-2">
                Dashboard
            </h1>
            <p className="text-warm-gray mb-8">Welcome to the DESIGN STUDIO admin panel.</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat) => (
                    <a
                        key={stat.label}
                        href={stat.href}
                        className="bg-white border border-light-border p-6 hover:border-accent-gold transition-colors duration-300 block"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{stat.icon}</span>
                            {loading ? (
                                <div className="w-10 h-8 bg-off-white animate-pulse rounded" />
                            ) : (
                                <span className="font-serif text-3xl font-bold text-charcoal">
                                    {stat.value}
                                </span>
                            )}
                        </div>
                        <p className="text-warm-gray text-sm">{stat.label}</p>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-light-border p-6">
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="/admin/projects/new"
                        className="px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent-gold transition-colors duration-300"
                    >
                        + Add Project
                    </a>
                    <a
                        href="/admin/services"
                        className="px-6 py-3 border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition-colors duration-300"
                    >
                        Manage Services
                    </a>
                    <a
                        href="/admin/messages"
                        className="px-6 py-3 border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition-colors duration-300"
                    >
                        View Messages
                    </a>
                </div>
            </div>
        </div>
    );
}
