import Link from 'next/link';

const footerLinks = {
    navigation: [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ],
    services: [
        { label: 'Architecture Design' },
        { label: 'Interior Design' },
        { label: 'Project Management' },
        { label: 'Consulting' },
        { label: 'Space Planning' },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#111111] overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Main Footer */}
                <div className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="relative h-14 flex items-center justify-start overflow-hidden rounded-xl ring-1 ring-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                                <img
                                    src="/Time Logo .svg"
                                    alt="11:59 Design Studio"
                                    className="w-auto h-full object-contain"
                                />
                            </div>
                        </div>
                        <p className="font-cormorant italic text-xl text-[#D4AF37] mb-4">
                            Where vision meets precision.
                        </p>
                        <p className="font-sans font-light text-[13px] text-[#A8A8A8] tracking-wide leading-relaxed mb-10">
                            We design spaces that inspire, endure, and elevate the way you live and work.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {['In', 'Li', 'Pi'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#A8A8A8] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_4px_15px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-1 font-sans text-xs tracking-widest"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-cormorant text-2xl tracking-wide mb-8 text-[#D4AF37]">Navigation</h4>
                        <ul className="space-y-4">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-sans font-light text-[#A8A8A8] hover:text-[#D4AF37] hover:pl-2 text-[13px] tracking-wide transition-all duration-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-cormorant text-2xl tracking-wide mb-8 text-[#D4AF37]">Services</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((service) => (
                                <li key={service.label} className="group cursor-default">
                                    <span className="font-sans font-light text-[#A8A8A8] group-hover:text-[#D4AF37] transition-colors duration-400 text-[13px] tracking-wide">{service.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-cormorant text-2xl tracking-wide mb-8 text-[#D4AF37]">Get In Touch</h4>
                        <div className="space-y-6 text-[13px] font-sans font-light text-[#A8A8A8] tracking-wide">
                            <div>
                                <p className="text-[#D4AF37] font-medium mb-1 tracking-widest uppercase text-[10px]">Visit Us</p>
                                <p>Nashik, Maharashtra, India</p>
                            </div>
                            <div>
                                <p className="text-[#D4AF37] font-medium mb-1 tracking-widest uppercase text-[10px]">Office Hours</p>
                                <p className="mb-0.5">Mon – Fri: 10:00 AM – 6:00 PM</p>
                                <p className="mb-0.5">Saturday: 10:00 AM – 2:30 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                            <div>
                                <p className="text-[#D4AF37] font-medium mb-1 tracking-widest uppercase text-[10px]">Email</p>
                                <a href="mailto:11.59designstudio@gmail.com" className="hover:text-[#D4AF37] transition-colors duration-400">
                                    11.59designstudio@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-10 border-t border-[#D4AF37]/15 flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 text-center">
                        <p className="font-sans font-light text-[#8A8A8A] text-xs tracking-wide">
                            © {new Date().getFullYear()} 11:59 Design Studio. All rights reserved.
                        </p>
                        <p className="font-sans font-light text-[#8A8A8A] text-xs tracking-wide">
                            Architecture & Interior Design Studio — Nashik
                        </p>
                    </div>

                    <p className="font-sans text-[9px] md:text-[10px] text-[#666666] tracking-[0.2em] uppercase text-center max-w-2xl mx-auto leading-relaxed mt-2">
                        Inspired by Aesop, Bottega Veneta, and globally renowned architectural firms — restrained, intentional, and quietly confident.
                    </p>
                </div>
            </div>
        </footer>
    );
}
