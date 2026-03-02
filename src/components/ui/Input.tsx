import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2 tracking-wide">
                {label}
            </label>
            <input
                className={`w-full px-4 py-3 border border-light-border bg-white text-charcoal placeholder-warm-gray focus:outline-none focus:border-accent-gold transition-colors duration-300 ${error ? 'border-red-400' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2 tracking-wide">
                {label}
            </label>
            <textarea
                className={`w-full px-4 py-3 border border-light-border bg-white text-charcoal placeholder-warm-gray focus:outline-none focus:border-accent-gold transition-colors duration-300 resize-none ${error ? 'border-red-400' : ''
                    } ${className}`}
                rows={5}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
