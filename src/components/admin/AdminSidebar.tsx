'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
    { href: '/admin/services', label: 'Services', icon: '⚙️' },
    { href: '/admin/messages', label: 'Messages', icon: '✉️' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch('/api/auth/login', { method: 'DELETE' });
        document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/admin/login';
    };

    return (
        <aside className="w-64 min-h-screen bg-charcoal text-white flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-9 h-9 relative flex items-center justify-center">
                        <img
                            src="/Time Logo .svg"
                            alt="Design Studio"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <span className="font-serif text-base font-semibold">DESIGN STUDIO</span>
                        <span className="block text-[9px] text-gray-400 tracking-[0.2em] uppercase">
                            Admin Panel
                        </span>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${isActive
                                ? 'bg-accent-gold/20 text-accent-gold border-r-2 border-accent-gold'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-gray-700">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 text-sm hover:text-white transition-colors mb-2"
                >
                    ↗ View Site
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer"
                >
                    ← Logout
                </button>
            </div>
        </aside>
    );
}
