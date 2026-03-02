import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
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
        <section className="py-20 md:py-28 bg-off-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <SectionHeading
                        title="Featured Projects"
                        subtitle="A curated selection of our most distinguished work in architecture and interior design."
                    />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project._id} delay={index * 0.15}>
                            <Link href={`/projects/${project.slug}`} className="group block">
                                <div className="img-hover-zoom relative aspect-[4/5] mb-5">
                                    {project.images[0] ? (
                                        <Image
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-warm-gray text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
                                </div>
                                <p className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-2">
                                    {project.category}
                                </p>
                                <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-accent-gold transition-colors duration-300">
                                    {project.title}
                                </h3>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.4}>
                    <div className="text-center mt-14">
                        <Link
                            href="/projects"
                            className="inline-block px-10 py-4 border-2 border-charcoal text-charcoal text-sm font-medium tracking-wider hover:bg-charcoal hover:text-white transition-all duration-300 uppercase"
                        >
                            View All Projects
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
