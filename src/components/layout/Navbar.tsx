'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isDarkHero = pathname === '/';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // If we're not on the home page, the navbar should almost always be "solid" (white) 
    // because internal pages have a light background.
    const isSolid = scrolled || !isDarkHero;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isOpen
                    ? 'bg-transparent py-4 border-b border-transparent'
                    : isSolid
                        ? 'bg-white/80 backdrop-blur-xl border-b border-accent-gold/10 py-3 md:py-4 shadow-[0_4px_30px_rgba(17,17,17,0.03)]'
                        : 'bg-transparent py-6 border-b border-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div
                                className={`relative flex items-center justify-start transition-all duration-300 ${isSolid ? 'h-10 md:h-12' : 'h-12 md:h-14'
                                    }`}
                            >
                                <img
                                    src="/Time Logo .svg"
                                    alt="11:59 Design Studio Logo"
                                    className="w-auto h-full object-contain rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-[11px] font-medium tracking-[0.2em] transition-colors duration-500 uppercase group ${isSolid ? 'text-charcoal hover:text-accent-gold' : 'text-white/90 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1.5 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${isSolid ? 'bg-accent-gold' : 'bg-white'}`}></span>
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className={`ml-4 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 border ${isSolid
                                    ? 'bg-charcoal text-white border-charcoal hover:bg-accent-gold hover:border-accent-gold shadow-[0_4px_20px_rgba(17,17,17,0.1)]'
                                    : 'bg-transparent text-white border-white/60 hover:bg-white hover:text-charcoal'
                                    }`}
                            >
                                Get In Touch
                            </Link>
                            {/* Admin Link */}
                            <Link
                                href="/admin/login"
                                className={`ml-2 p-2 transition-colors duration-300 ${isSolid ? 'text-warm-gray hover:text-charcoal' : 'text-white/70 hover:text-white'
                                    }`}
                                title="Admin Login"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </Link>
                        </div>

                        {/* Mobile Menu Button  */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden relative z-50 flex flex-col gap-1.5 p-2 group`}
                            aria-label="Toggle Menu"
                        >
                            <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5 bg-charcoal' : isSolid ? 'bg-charcoal' : 'bg-white'}`} />
                            <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? 'opacity-0 bg-charcoal' : isSolid ? 'bg-charcoal' : 'bg-white'}`} />
                            <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5 bg-charcoal' : isSolid ? 'bg-charcoal' : 'bg-white'}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-10%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-10%' }}
                        transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col min-h-[100dvh] px-8 pt-32 pb-12 justify-between">
                            <div className="flex flex-col px-6 py-4 gap-4 mt-20">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1), duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-xl font-cormorant italic tracking-wide text-charcoal hover:text-accent-gold py-5 border-b border-light-border/60 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
                                className="mt-8 px-6 pb-8"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-4 bg-charcoal text-white text-[11px] font-semibold uppercase tracking-[0.2em] text-center hover:bg-accent-gold transition-colors duration-500 shadow-[0_4px_20px_rgba(17,17,17,0.1)]"
                                >
                                    GET IN TOUCH
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
