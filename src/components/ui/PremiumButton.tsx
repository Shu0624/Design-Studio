'use client';

import Link from 'next/link';

interface PremiumButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    className?: string;
}

export default function PremiumButton({ href, children, variant = 'primary', className = '' }: PremiumButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center px-[24px] py-[14px] md:px-[32px] md:py-[16px] text-[16px] md:text-[18px] font-medium uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group";

    const variants = {
        primary: "bg-charcoal text-white hover:bg-accent-gold hover:text-white shadow-[0_8px_30px_rgba(17,17,17,0.12)] border border-transparent",
        outline: "bg-transparent text-charcoal border border-charcoal/20 hover:border-accent-gold hover:text-accent-gold",
        ghost: "bg-transparent text-charcoal hover:text-accent-gold"
    };

    return (
        <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
                {children}
            </span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.2,0,0.2,1)]" />
            )}
            {variant === 'outline' && (
                <div className="absolute inset-0 bg-accent-gold/5 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-[cubic-bezier(0.2,0,0.2,1)]" />
            )}
        </Link>
    );
}
