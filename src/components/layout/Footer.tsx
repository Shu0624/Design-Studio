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
        <footer className="bg-charcoal text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main Footer */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 relative flex items-center justify-center">
                                <img
                                    src="/Time Logo .svg"
                                    alt="Design Studio"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <span className="font-serif text-xl font-semibold tracking-wide">
                                    DESIGN STUDIO
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Where vision meets precision. We design spaces that inspire, endure,
                            and elevate the way you live and work.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {['Instagram', 'LinkedIn', 'Pinterest'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 border border-gray-600 flex items-center justify-center text-gray-400 hover:border-accent-gold hover:text-accent-gold transition-colors duration-300 text-xs"
                                >
                                    {social[0] + social[1]}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-white">Navigation</h4>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent-gold text-sm transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-white">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((service) => (
                                <li key={service.label}>
                                    <span className="text-gray-400 text-sm">{service.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-white">Get In Touch</h4>
                        <div className="space-y-4 text-sm text-gray-400">
                            <div>
                                <p className="text-accent-gold font-medium mb-1">Visit Us</p>
                                <p>Nashik, Maharashtra, India</p>
                            </div>
                            <div>
                                <p className="text-accent-gold font-medium mb-1">Office Hours</p>
                                <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
                                <p>Sunday: By Appointment</p>
                            </div>
                            <div>
                                <p className="text-accent-gold font-medium mb-1">Email</p>
                                <p>hello@studioarc.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Studio Arc. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Architecture & Interior Design Studio — Nashik
                    </p>
                </div>
            </div>
        </footer>
    );
}
