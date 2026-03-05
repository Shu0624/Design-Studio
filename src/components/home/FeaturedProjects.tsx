import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import PremiumButton from '@/components/ui/PremiumButton';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export default async function FeaturedProjects() {
    let projects: { _id: string; title: string; slug: string; category: string; images: string[] }[] = [];

    try {
        await dbConnect();
        const docs = await Project.find({ featured: true }).sort({ createdAt: -1 }).limit(3).lean();
        projects = docs.map((doc) => ({
            _id: String(doc._id),
            title: doc.title,
            slug: doc.slug,
            category: doc.category,
            images: doc.images || [],
        }));
    } catch (error) {
        console.error('Failed to fetch featured projects:', error);
    }

    // If no featured projects, don't render the section
    if (projects.length === 0) return null;

    return (
        <section className="py-[80px] md:py-[120px] bg-off-white relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <SectionHeading
                        title="Featured Projects"
                        subtitle="A curated selection of our most distinguished work in architecture and interior design."
                    />
                </AnimatedSection>

                <div className="flex flex-col gap-[80px] md:gap-[120px] mt-12 md:mt-16">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project._id} delay={0.1}>
                            <Link href={`/projects/${project.slug}`} className={`group flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-[30px] md:gap-[60px] lg:gap-[80px] items-center`}>
                                <div className="w-full md:w-[55%]">
                                    <div className="img-hover-zoom relative aspect-[16/10] md:aspect-[4/3] shadow-[0_20px_60px_rgba(17,17,17,0.08)] bg-white p-3 md:p-4 border border-light-border/40 transition-shadow duration-700 group-hover:shadow-[0_30px_70px_rgba(17,17,17,0.12)]">
                                        <div className="relative w-full h-full overflow-hidden">
                                            {project.images[0] ? (
                                                <Image
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 60vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-off-white flex items-center justify-center">
                                                    <span className="text-warm-gray text-[10px] tracking-[0.2em] uppercase">No Image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[45%] flex flex-col justify-center px-4 md:px-0">
                                    <div className="flex items-center gap-4 mb-6 md:mb-8 opacity-80">
                                        <span className="w-10 h-[1px] bg-accent-gold" />
                                        <p className="text-accent-gold text-xs md:text-[14px] tracking-[0.3em] uppercase font-medium">
                                            {project.category}
                                        </p>
                                    </div>
                                    <h3 className="font-cormorant text-[28px] md:text-[48px] lg:text-[64px] font-normal leading-[1.1] text-charcoal mb-8 md:mb-14 group-hover:text-accent-gold transition-colors duration-700">
                                        {project.title}
                                    </h3>

                                    {/* Ultra-luxury 'View Project' Button */}
                                    <div className="relative inline-flex group/btn w-fit mt-2">
                                        {/* Breathing Glow */}
                                        <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl animate-breathe" />

                                        {/* Button body */}
                                        <div className="relative flex items-center justify-between gap-6 px-[24px] py-[14px] md:px-[32px] md:py-[16px] border border-accent-gold/40 bg-white/80 backdrop-blur-md rounded-full transition-all duration-700 group-hover/btn:bg-accent-gold group-hover/btn:border-accent-gold shadow-sm group-hover/btn:shadow-[0_0_30px_rgba(212,175,55,0.4)] overflow-hidden">

                                            {/* Shimmer sweep effect inside button on hover */}
                                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:animate-[shine-fast_1.5s_ease-out] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                                            <span className="relative z-10 text-[16px] md:text-[18px] font-medium tracking-[0.2em] uppercase text-charcoal transition-colors duration-700 group-hover/btn:text-white">
                                                View Project
                                            </span>
                                            <span className="relative z-10 flex items-center justify-center transform transition-transform duration-700 group-hover/btn:translate-x-3 text-accent-gold group-hover/btn:text-white text-[18px]">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.2}>
                    <div className="text-center mt-24">
                        <PremiumButton href="/projects" variant="outline">
                            Discover All Works
                        </PremiumButton>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
