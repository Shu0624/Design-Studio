import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

// Fallback services for when database is empty
const fallbackServices = [
    {
        icon: '🏛️',
        title: 'Architecture Design',
        description: 'Visionary architectural solutions that balance aesthetics, functionality, and sustainability.',
    },
    {
        icon: '🎨',
        title: 'Interior Design',
        description: 'Crafting interiors that reflect your personality while maximizing comfort and elegance.',
    },
    {
        icon: '📐',
        title: 'Space Planning',
        description: 'Intelligent space utilization that enhances flow, functionality, and visual harmony.',
    },
    {
        icon: '🏗️',
        title: 'Project Management',
        description: 'End-to-end project oversight ensuring quality delivery on time and within budget.',
    },
    {
        icon: '💡',
        title: 'Design Consulting',
        description: 'Expert guidance and creative insights to help shape your architectural vision.',
    },
    {
        icon: '✨',
        title: 'Styling Solutions',
        description: 'The finishing touches that transform a designed space into a lived-in masterpiece.',
    },
];

export default async function ServicesOverview() {
    let services: { icon: string; title: string; description: string; image?: string }[] = [];

    try {
        await dbConnect();
        const docs = await Service.find().sort({ order: 1 }).lean();
        if (docs.length > 0) {
            services = docs.map((doc) => ({
                icon: doc.icon || '🏗️',
                title: doc.title,
                description: doc.description,
                image: doc.image || '',
            }));
        } else {
            services = fallbackServices;
        }
    } catch (error) {
        console.error('Failed to fetch services:', error);
        services = fallbackServices;
    }

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <SectionHeading
                        title="Our Services"
                        subtitle="From concept to completion, we offer end-to-end design solutions for clients who expect nothing less than exceptional."
                    />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <AnimatedSection key={service.title} delay={index * 0.1}>
                            <div className="border border-light-border hover:border-accent-gold group transition-all duration-300 h-full overflow-hidden">
                                {service.image && (
                                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-8">
                                    <span className="text-3xl mb-5 block">{service.icon}</span>
                                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-3 group-hover:text-accent-gold transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-warm-gray text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.5}>
                    <div className="text-center mt-14">
                        <Link
                            href="/services"
                            className="inline-block px-10 py-4 bg-charcoal text-white text-sm font-medium tracking-wider hover:bg-accent-gold transition-all duration-300 uppercase"
                        >
                            Explore Services
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
