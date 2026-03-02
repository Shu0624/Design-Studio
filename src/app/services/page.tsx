import { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/services/ServiceCard';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export const metadata: Metadata = {
    title: 'Services',
    description:
        'Comprehensive architecture and interior design services in Nashik. From space planning and design consulting to full project management.',
};

// Fallback services shown when database has no services yet
const fallbackServices = [
    {
        icon: '🏛️',
        title: 'Architecture Design',
        description:
            'From concept sketches to construction documents, we create architectural designs that are both visionary and buildable. Our approach considers site context, sustainability, and the unique needs of each client to deliver spaces that stand the test of time.',
    },
    {
        icon: '🎨',
        title: 'Interior Design',
        description:
            'We craft interiors that tell your story. Our team carefully curates materials, furniture, lighting, and art to create cohesive environments that reflect your personality while maximizing comfort, elegance, and functionality.',
    },
    {
        icon: '📐',
        title: 'Space Planning',
        description:
            'Intelligent space utilization is the foundation of great design. We analyze traffic flow, functional requirements, and future needs to create layouts that feel intuitive, spacious, and purposeful — whether residential or commercial.',
    },
    {
        icon: '🏗️',
        title: 'Project Management',
        description:
            'Our end-to-end project management ensures seamless execution from design to handover. We coordinate contractors, manage timelines, oversee quality control, and handle budgets so you can focus on your vision.',
    },
    {
        icon: '💡',
        title: 'Design Consulting',
        description:
            'Need expert guidance without a full-service engagement? Our consulting services provide actionable insights on spatial planning, material selection, color strategies, and design direction for your project.',
    },
    {
        icon: '✨',
        title: 'Styling Solutions',
        description:
            'The art of styling transforms a designed space into a lived-in masterpiece. We source furnishings, accessories, artwork, and textiles that add warmth, personality, and that final layer of polish to your interiors.',
    },
];

export default async function ServicesPage() {
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
        <div className="pt-20">
            {/* Header */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="Our Services"
                            subtitle="From concept to completion, we offer end-to-end design solutions — architectural planning, interior styling, space consulting, and project management — for clients who expect nothing less than exceptional."
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <AnimatedSection key={service.title} delay={index * 0.1}>
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    image={service.image}
                                />
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24 bg-charcoal text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="Our Process"
                            subtitle="A structured yet flexible approach that ensures every project is delivered with precision and creativity."
                            light
                        />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                        {[
                            { step: '01', title: 'Discover', desc: 'Understanding your vision, needs, and aspirations through in-depth consultation.' },
                            { step: '02', title: 'Design', desc: 'Translating insights into creative concepts, plans, and detailed design proposals.' },
                            { step: '03', title: 'Develop', desc: 'Refining designs, selecting materials, and preparing for flawless execution.' },
                            { step: '04', title: 'Deliver', desc: 'Managing construction and installation to bring your space to life, on time.' },
                        ].map((item, index) => (
                            <AnimatedSection key={item.step} delay={index * 0.15}>
                                <div className="text-center md:text-left">
                                    <span className="text-accent-gold font-serif text-4xl font-bold">{item.step}</span>
                                    <h3 className="font-serif text-xl font-semibold mt-3 mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-off-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="font-serif text-2xl md:text-4xl font-semibold text-charcoal mb-4">
                            Book a Consultation
                        </h2>
                        <p className="text-warm-gray mb-8 max-w-xl mx-auto">
                            Discuss your project with our design team. We&apos;d love to hear about your vision and explore how we can help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-12 py-4 bg-accent-gold text-white text-sm font-medium tracking-wider hover:bg-accent-gold-light transition-all duration-300 uppercase"
                        >
                            Get in Touch
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
