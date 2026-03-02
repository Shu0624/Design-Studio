'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-charcoal">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-accent-gold text-sm tracking-[0.4em] uppercase mb-6 font-medium">
                        Architecture & Interior Design
                    </p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-8"
                >
                    Where Vision Meets
                    <span className="block mt-2">
                        <span className="text-accent-gold italic">Precision</span>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    We design spaces that inspire, endure, and elevate the way you live and work.
                    Based in Nashik, serving clients who demand excellence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/projects"
                        className="px-10 py-4 bg-accent-gold text-white text-sm font-medium tracking-wider hover:bg-accent-gold-light transition-all duration-300 uppercase"
                    >
                        View Our Work
                    </Link>
                    <Link
                        href="/contact"
                        className="px-10 py-4 border-2 border-white/30 text-white text-sm font-medium tracking-wider hover:bg-white/10 transition-all duration-300 uppercase"
                    >
                        Start a Project
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}
