import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 cursor-pointer';

    const variants = {
        primary:
            'bg-charcoal text-white hover:bg-accent-gold border border-charcoal hover:border-accent-gold',
        secondary:
            'bg-accent-gold text-white hover:bg-accent-gold-light border border-accent-gold hover:border-accent-gold-light',
        outline:
            'bg-transparent text-charcoal border-2 border-charcoal hover:bg-charcoal hover:text-white',
    };

    const sizes = {
        sm: 'px-5 py-2 text-sm',
        md: 'px-7 py-3 text-sm',
        lg: 'px-10 py-4 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
