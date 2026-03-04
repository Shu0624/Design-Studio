'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false }: SectionHeadingProps) {
    return (
        <div className={`mb-16 md:mb-24 ${centered ? 'flex flex-col items-center text-center' : ''}`}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.8, ease: [0.2, 0, 0.2, 1] }}
                className={`font-cormorant text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 ${light ? 'text-white' : 'text-charcoal'
                    }`}
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0, 0.2, 1] }}
                    className={`font-sans font-light text-[11px] tracking-[0.2em] uppercase max-w-2xl leading-relaxed mb-8 ${light ? 'text-white/60' : 'text-warm-gray'}`}
                >
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0.2, 1] }}
                className={`h-[1px] bg-accent-gold ${centered ? '' : ''}`}
            />
        </div>
    );
}
