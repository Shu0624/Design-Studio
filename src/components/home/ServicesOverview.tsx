
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import PremiumButton from '@/components/ui/PremiumButton';
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
        <section className="py-24 md:py-32 bg-[url('/noise.png')] bg-white relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <SectionHeading
                        title="Our Services"
                        subtitle="From concept to completion, we offer end-to-end design solutions for clients who expect nothing less than exceptional."
                    />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
                    {services.map((service, index) => (
                        <AnimatedSection key={service.title} delay={index * 0.1}>
                            <div className="glass-card group h-full flex flex-col relative overflow-hidden bg-white/40">
                                {service.image && (
                                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                                        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-500 z-10" />
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0.2,1)]"
                                        />
                                    </div>
                                )}
                                <div className="p-8 md:p-10 flex-grow flex flex-col relative z-20">
                                    <span className="text-accent-gold text-2xl mb-8 block opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">{service.icon}</span>
                                    <h3 className="font-cormorant text-2xl font-normal text-charcoal mb-4 group-hover:text-accent-gold transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                    <p className="font-sans font-light text-[13px] text-warm-gray leading-relaxed tracking-wide opacity-90">
                                        {service.description}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-accent-gold/10 flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-charcoal group-hover:text-accent-gold transition-colors duration-500 mt-auto">
                                        Learn More
                                        <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.4}>
                    <div className="text-center mt-20">
                        <PremiumButton href="/services" variant="primary">
                            Explore All Services
                        </PremiumButton>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
