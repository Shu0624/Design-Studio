import { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with 11:59 DESIGN STUDIO. Schedule a consultation for your architecture or interior design project in Nashik.',
};

export default function ContactPage() {
    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="Get In Touch"
                            subtitle="Ready to transform your space? Let's start a conversation."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <AnimatedSection>
                                <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-warm-gray text-sm mb-8">
                                    Tell us about your project and we&apos;ll get back to you within 24 hours.
                                </p>
                                <ContactForm />
                            </AnimatedSection>
                        </div>

                        {/* Info */}
                        <div className="lg:col-span-2">
                            <AnimatedSection delay={0.2}>
                                <div className="space-y-8">
                                    {/* Office Hours */}
                                    <div className="border border-light-border p-8">
                                        <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                                            Office Hours
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between text-warm-gray">
                                                <span>Monday – Friday</span>
                                                <span className="text-charcoal font-medium">10:00 AM – 6:00 PM</span>
                                            </div>
                                            <div className="flex justify-between text-warm-gray">
                                                <span>Saturday</span>
                                                <span className="text-charcoal font-medium">10:00 AM – 2:30 PM</span>
                                            </div>
                                            <div className="flex justify-between text-warm-gray">
                                                <span>Sunday</span>
                                                <span className="text-charcoal font-medium">Closed</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="border border-light-border p-8">
                                        <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                                            Visit Our Studio
                                        </h3>
                                        <p className="text-warm-gray text-sm leading-relaxed mb-4">
                                            Nashik, Maharashtra, India
                                        </p>
                                        <div className="aspect-[4/3] bg-off-white flex items-center justify-center text-warm-gray text-sm">
                                            <div className="text-center">
                                                <p className="text-2xl mb-2">📍</p>
                                                <p>Nashik, Maharashtra</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connect */}
                                    <div className="border border-light-border p-8">
                                        <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                                            Ways to Connect
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <p className="text-accent-gold font-medium mb-1">Email</p>
                                                <p className="text-warm-gray">11.59designstudio@gmail.com</p>
                                            </div>
                                            <div>
                                                <p className="text-accent-gold font-medium mb-1">Phone</p>
                                                <p className="text-warm-gray">+91 XXXXX XXXXX</p>
                                            </div>
                                            <div className="pt-3">
                                                <p className="text-accent-gold font-medium mb-3">Social</p>
                                                <div className="flex gap-3">
                                                    {['Instagram', 'LinkedIn', 'Pinterest'].map((social) => (
                                                        <a
                                                            key={social}
                                                            href="#"
                                                            className="px-4 py-2 border border-light-border text-warm-gray text-xs hover:border-accent-gold hover:text-accent-gold transition-colors duration-300"
                                                        >
                                                            {social}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
