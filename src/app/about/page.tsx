import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn about DESIGN STUDIO — a Nashik-based architecture and interior design studio committed to creating spaces that inspire and endure.',
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="About DESIGN STUDIO"
                            subtitle="Founded on the belief that architecture is the art of shaping experience."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Story */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <AnimatedSection>
                            <div className="relative aspect-[4/5]">
                                <Image
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                                    alt="DESIGN STUDIO - Architecture Studio"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4">
                                Our Story
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-6">
                                Shaping Spaces,
                                <span className="italic text-accent-gold"> Shaping Lives</span>
                            </h2>
                            <div className="space-y-5 text-warm-gray leading-relaxed">
                                <p>
                                    DESIGN STUDIO was born from a simple yet powerful idea: that the spaces we inhabit
                                    profoundly shape how we feel, think, and live. Based in the heart of Nashik, our
                                    studio brings together a passionate team of architects and designers who share a
                                    commitment to excellence.
                                </p>
                                <p>
                                    Our studio blends timeless design principles with contemporary innovation. Every
                                    project begins with listening — understanding how you move through space, what
                                    inspires you, and what legacy you wish to leave. From that foundation, we craft
                                    environments that are as functional as they are beautiful.
                                </p>
                                <p>
                                    Whether designing a family home, a commercial landmark, or an intimate interior,
                                    we approach every project with the same level of care, creativity, and attention
                                    to detail that our clients have come to expect.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-16 md:py-24 bg-charcoal text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="Design Philosophy"
                            subtitle="The principles that guide every decision we make."
                            light
                        />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                        {[
                            {
                                title: 'Context Matters',
                                description:
                                    'Great design respects its surroundings. We consider climate, culture, and landscape in every decision, creating buildings that belong to their place.',
                            },
                            {
                                title: 'Form Follows Function',
                                description:
                                    'Beauty emerges when design serves purpose. Our spaces are not just visually striking — they work effortlessly for the people who use them.',
                            },
                            {
                                title: 'Details Define Quality',
                                description:
                                    'The difference between good and exceptional lies in the details. From material joints to lighting angles, we obsess over the elements that others might overlook.',
                            },
                        ].map((item, index) => (
                            <AnimatedSection key={item.title} delay={index * 0.15}>
                                <div className="border border-gray-700 p-8 h-full hover:border-accent-gold transition-colors duration-300">
                                    <h3 className="font-serif text-xl font-semibold mb-4 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 md:py-20 bg-off-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: '50+', label: 'Projects Completed' },
                                { number: '8+', label: 'Years Experience' },
                                { number: '30+', label: 'Happy Clients' },
                                { number: '5', label: 'Design Awards' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <p className="font-serif text-3xl md:text-4xl font-bold text-accent-gold">
                                        {stat.number}
                                    </p>
                                    <p className="text-warm-gray text-sm mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="font-serif text-2xl md:text-4xl font-semibold text-charcoal mb-4">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-warm-gray mb-8 max-w-xl mx-auto">
                            Whether you have a clear vision or just an idea, we&apos;d love to hear from you.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-12 py-4 bg-charcoal text-white text-sm font-medium tracking-wider hover:bg-accent-gold transition-all duration-300 uppercase"
                        >
                            Start a Conversation
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
