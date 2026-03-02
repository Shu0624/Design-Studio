'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppFloat() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPulse, setShowPulse] = useState(true);
    const [mounted, setMounted] = useState(false);

    // WhatsApp number — update this in .env.local as NEXT_PUBLIC_WHATSAPP_NUMBER
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
    const defaultMessage = encodeURIComponent(
        'Hi! I visited your website and I\'m interested in your architecture & interior design services. Can we discuss?'
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

    useEffect(() => {
        setMounted(true);
        // Auto-hide pulse after 10 seconds
        const timer = setTimeout(() => setShowPulse(false), 10000);
        // Show pulse again every 30 seconds
        const interval = setInterval(() => {
            setShowPulse(true);
            setTimeout(() => setShowPulse(false), 10000);
        }, 30000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Expanded Chat Card */}
            <div
                className={`transition-all duration-500 ease-out origin-bottom-right ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[320px] border border-gray-100">
                    {/* Header */}
                    <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.24-1.23A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.02 17.5c-1.58 0-3.13-.42-4.5-1.22l-.32-.19-3.33.78.84-3.18-.21-.34A7.96 7.96 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-7.98 8z" />
                                <path d="M16.53 14.34c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24 0-.37.1-.49.1-.11.22-.27.34-.41.11-.14.15-.24.23-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.4h-.45c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.33.98 2.49.12.16 1.7 2.59 4.12 3.63.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold text-sm">DESIGN STUDIO</p>
                            <p className="text-green-200 text-xs">Typically replies within minutes</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="bg-[#ECE5DD] px-4 py-5 min-h-[120px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8bfb0\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
                        <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%] relative">
                            <p className="text-gray-800 text-sm leading-relaxed">
                                Hello! 👋 Welcome to <strong>DESIGN STUDIO</strong>.
                            </p>
                            <p className="text-gray-800 text-sm leading-relaxed mt-1">
                                How can we help you with your dream space? Tap below to start a conversation!
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1 block text-right">
                                just now
                            </span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="p-4 bg-white">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
                        >
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.24-1.23A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.02 17.5c-1.58 0-3.13-.42-4.5-1.22l-.32-.19-3.33.78.84-3.18-.21-.34A7.96 7.96 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-7.98 8z" />
                                <path d="M16.53 14.34c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24 0-.37.1-.49.1-.11.22-.27.34-.41.11-.14.15-.24.23-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.4h-.45c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.33.98 2.49.12.16 1.7 2.59 4.12 3.63.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                            </svg>
                            Start Chat
                        </a>
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-[60px] h-[60px] rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                aria-label="Chat on WhatsApp"
            >
                {/* Pulse rings */}
                {showPulse && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                        <span
                            className="absolute inset-[-4px] rounded-full border-2 border-[#25D366] opacity-40"
                            style={{ animation: 'whatsapp-ring 2s ease-out infinite' }}
                        />
                    </>
                )}

                {/* Icon: WhatsApp or X */}
                <div className="relative z-10 transition-transform duration-300">
                    {isOpen ? (
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    ) : (
                        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.24-1.23A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.02 17.5c-1.58 0-3.13-.42-4.5-1.22l-.32-.19-3.33.78.84-3.18-.21-.34A7.96 7.96 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-7.98 8z" />
                            <path d="M16.53 14.34c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24 0-.37.1-.49.1-.11.22-.27.34-.41.11-.14.15-.24.23-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.4h-.45c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.33.98 2.49.12.16 1.7 2.59 4.12 3.63.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                        </svg>
                    )}
                </div>

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                        Chat with us!
                        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </span>
                )}
            </button>
        </div>
    );
}
