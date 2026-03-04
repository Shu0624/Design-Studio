import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import dbConnect from '@/lib/db';
import AboutInfo from '@/models/About';

export const metadata: Metadata = {
    title: 'About | 11:59 Design Studio',
    description:
        'Learn about 11:59 DESIGN STUDIO — a Nashik-based architecture and interior design studio committed to creating spaces that inspire and endure.',
};

export default async function AboutPage() {
    // Fetch dynamic founder info
    await dbConnect();
    let aboutInfo = null;
    try {
        aboutInfo = await AboutInfo.findOne();
    } catch (e) {
        console.error('Error fetching about info:', e);
    }

    const founderName = aboutInfo?.founderName || 'Ar. Namrata Pawar';
    const founderBio = aboutInfo?.founderBio || 'Designing at the Moment Before Transformation\n\n11:59 Design Studio was founded by young architects and designers driven by a shared passion for creating meaningful spaces.\n\nWe believe interiors are more than beautiful environments — they are experiences that shape how you live, work, and feel. Every space holds the power to influence emotion, productivity, and well-being.\n\nRooted in creativity and guided by purpose, we design with intention — balancing form and function so that every corner serves a reason while telling a story.\n\nBased in Nashik, Maharashtra, our studio brings together a team committed to excellence, precision, and timeless design.';
    const founderImages = aboutInfo?.founderImages || [];

    const stats = [
        { number: aboutInfo?.projectsCompleted || '50+', label: 'Projects Completed' },
        { number: aboutInfo?.yearsOfExperience || '8+', label: 'Years of Experience' },
        { number: aboutInfo?.happyClients || '30+', label: 'Happy Clients' },
        { number: aboutInfo?.designAwards || '5', label: 'Design Awards' },
    ];

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="About 11:59 Design Studio"
                            subtitle="Architecture & Interior Design"
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <AnimatedSection>
                            <div className="relative aspect-[4/5] bg-gray-100 flex items-center justify-center overflow-hidden">
                                {founderImages.length > 0 ? (
                                    <Image
                                        src={founderImages[0]}
                                        alt={founderName}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="text-gray-400 font-serif">A Design Initiative</div>
                                )}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4">
                                A Design Initiative by
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-6">
                                {founderName}
                            </h2>
                            <div className="space-y-5 text-warm-gray leading-relaxed whitespace-pre-wrap">
                                {founderBio}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <AnimatedSection delay={0.2}>
                            <p className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-4">
                                Our Story
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-6">
                                Shaping Spaces,
                                <span className="italic text-accent-gold"> Shaping Lives.</span>
                            </h2>
                            <div className="space-y-5 text-warm-gray leading-relaxed">
                                <p>
                                    11:59 was born from a simple yet powerful idea: the spaces we inhabit profoundly shape how we think, experience, and connect with the world around us.
                                </p>
                                <p>
                                    Our studio blends timeless architectural principles with contemporary innovation. Every project begins with listening — understanding how you move through space, what inspires you, and what legacy you wish to create.
                                </p>
                                <p>
                                    From that foundation, we craft environments that are as functional as they are refined.
                                </p>
                                <p>
                                    Whether designing a bespoke residence, a commercial landmark, or an intimate interior, we approach every project with the same level of care, creativity, and attention to detail that our clients trust and value.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection>
                            <div className="relative aspect-[4/5] bg-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                                    alt="11:59 Design Studio - Architecture Studio"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
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
                            subtitle="The Principles That Guide Every Decision"
                            light
                        />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                        {[
                            {
                                title: 'Context Matters',
                                description:
                                    'Great design respects its surroundings. We consider climate, culture, and landscape to ensure every structure belongs naturally to its environment.',
                            },
                            {
                                title: 'Form Follows Function',
                                description:
                                    'True beauty emerges when design serves purpose. Our spaces are not only visually compelling — they work effortlessly for the people who inhabit them.',
                            },
                            {
                                title: 'Details Define Quality',
                                description:
                                    'The difference between good and exceptional lies in the details. From material transitions to lighting precision, we refine what others might overlook.',
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
                            {stats.map((stat) => (
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

            {/* Ultra-Luxury CTA */}
            <section className="py-24 md:py-32 bg-[#F9F8F6] border-t border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 tracking-wide" style={{ letterSpacing: '0.02em' }}>
                            Let&apos;s Work Together
                        </h2>
                        <p className="font-sans font-light text-base md:text-lg text-[#4A4A4A] mb-12 max-w-2xl mx-auto leading-relaxed" style={{ letterSpacing: '0.03em' }}>
                            Whether you come with a defined vision or a quiet idea waiting to take form, we would be honored to shape it into something enduring.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-14 py-4 md:py-5 bg-charcoal text-white text-xs md:text-sm font-medium tracking-[0.2em] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:bg-[#2A2A2A] transition-all duration-500 uppercase rounded-sm border border-transparent hover:border-accent-gold/30"
                        >
                            Start a Conversation
                        </Link>

                        <div className="mt-28 max-w-2xl mx-auto text-center">
                            <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-10 opacity-70"></div>

                            <p className="font-serif italic text-xl md:text-2xl text-charcoal mb-4">
                                11:59 Design Studio
                            </p>
                            <p className="font-sans text-xs text-accent-gold mb-2 tracking-[0.25em] uppercase font-semibold">
                                Where vision meets precision.
                            </p>
                            <p className="font-sans font-light text-sm md:text-base text-[#4A4A4A] leading-relaxed tracking-wide mb-16 max-w-md mx-auto">
                                We design spaces that inspire, endure, and elevate the way you live and work.
                            </p>

                            <p className="font-sans text-[9px] md:text-[10px] text-gray-400 tracking-widest uppercase mt-4 mb-4 leading-relaxed max-w-lg mx-auto">
                                Inspired by luxury brands like Bottega Veneta, Aesop, and high-end architectural firms — restrained, intentional, and globally sophisticated.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
