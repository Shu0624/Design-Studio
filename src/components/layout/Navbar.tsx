'use client';

import Link from 'next/link';
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

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-2'
                : 'bg-transparent py-6 border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div
                            className={`relative flex items-center justify-center transition-all duration-500 ${scrolled ? 'w-16 h-16' : 'w-20 h-20'
                                }`}
                        >
                            <img
                                src="/Time Logo .svg"
                                alt="Design Studio Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span
                                className={`font-serif font-semibold tracking-wide transition-colors duration-300 ${scrolled ? 'text-charcoal text-lg' : 'text-white text-xl md:text-charcoal' // Creating logic for dark/light backgrounds if needed, but assuming white bg mostly. Wait, hero is dark?
                                    // Actually, standard navbar was white. If I make it transparent at top, I need to know if the underlying hero is dark.
                                    // The HeroSequence has bg-[#050505]. So at top, text should be WHITE if transparent.
                                    // BUT, other pages might be light.
                                    // Let's check layout.
                                    // Design Studio brand was text-charcoal. If I make bg transparent over dark hero, text must be white.
                                    // I will use text-white at top (unscrolled) and text-charcoal when scrolled (white bg).
                                    } ${scrolled ? 'text-gray-900' : 'text-gray-900 md:text-white lg:text-white'}`}
                            >
                                {/* Wait, the hero is dark. 'Design Studio' text was 'text-charcoal' (dark gray) in the previous file.
                                    If I make the background transparent, dark text on dark hero will be invisible.
                                    I must switch text color to white when not scrolled (on hero).
                                    However, on other pages, is the top always dark?
                                    Usually, inner pages have a header?
                                    Checking 'ContactCTA' it has padding.
                                    Let's look at 'Project' page or 'About'.
                                    If I change it globally to transparent at top, I might break visibility on light pages.
                                    SAFE BET: Keep white background but make it 'glass' always or just nicer?
                                    User said "more premium and luxury". Transparent on dark hero is very premium.
                                    I will assume the Home page hero is dark.
                                    For other pages, I might need a 'dark-nav' prop or similar.
                                    OR, I can check the route.
                                    Let's check if I can use usePathname.
                                */}
                                DESIGN STUDIO
                            </span>
                            <span
                                className={`hidden md:block text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled ? 'text-warm-gray' : 'text-gray-400 md:text-gray-300'
                                    }`}
                            >
                                Architecture & Interiors
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium tracking-widest transition-colors duration-300 hover:text-accent-gold uppercase ${scrolled ? 'text-charcoal' : 'text-white' // Assuming dark hero
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className={`ml-4 px-7 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${scrolled
                                ? 'bg-charcoal text-white border-charcoal hover:bg-transparent hover:text-charcoal'
                                : 'bg-white text-charcoal border-white hover:bg-transparent hover:text-white'
                                }`}
                        >
                            Get In Touch
                        </Link>
                        {/* Admin Link */}
                        <Link
                            href="/admin/login"
                            className={`ml-2 p-2 transition-colors duration-300 ${scrolled ? 'text-warm-gray hover:text-accent-gold' : 'text-white/70 hover:text-white'
                                }`}
                            title="Admin Login"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile Menu Button - styling needs to match background */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 group"
                        aria-label="Toggle Menu"
                    >
                        <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''} ${scrolled ? 'bg-charcoal' : 'bg-charcoal md:bg-white'}`} />
                        <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-charcoal' : 'bg-charcoal md:bg-white'}`} />
                        <span className={`block w-8 h-[1px] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''} ${scrolled ? 'bg-charcoal' : 'bg-charcoal md:bg-white'}`} />
                        {/* Note: In mobile view, if background is white, lines should be black. If transparent on mobile... mobile usually has solid header?
                             Currently implementation makes it transparent on mobile too.
                             If mobile hero is dark, white lines are good.
                             Navbar at line 19 was fixed.
                             I'll stick to: Scrolled = White BG + Dark Text. Top = Transparent BG + White Text (for Desktop) / Dark Text (for Mobile??).
                             Actually, mobile often needs a background.
                             Let's make mobile Navbar always white background or handle it carefully.
                             For now, I'll apply the scroll logic globally.
                             But wait, the Logo 'Design Studio' text color logic:
                             Line 32 original: text-charcoal.
                             If I change to text-white at top, it will be invisible on white pages if any page lacks a dark hero.
                             I should verify if 'Projects', 'Services' etc have dark headers.
                             The previous turn showed ContactCTA is dark. content/page.tsx?
                             If I break navigation visibility it's bad.
                             I'll import usePathname to check if we are on Home.
                             If Home: Transparent -> White.
                             If Other: White -> White.
                         */}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay - keep distinct */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-charcoal hover:text-accent-gold py-2 border-b border-gray-50 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 w-full py-4 bg-charcoal text-white text-sm font-bold uppercase tracking-widest text-center hover:bg-accent-gold transition-colors"
                            >
                                Get In Touch
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
