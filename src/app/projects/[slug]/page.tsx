import Link from 'next/link';
import ProjectGallery from '@/components/projects/ProjectGallery';
import AnimatedSection from '@/components/ui/AnimatedSection';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    await dbConnect();
    const project = await Project.findOne({ slug }).lean();

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const projectData = project as { title: string; description: string; images: string[] };

    return {
        title: projectData.title,
        description: projectData.description?.slice(0, 160),
        openGraph: {
            title: `${projectData.title} | DESIGN STUDIO`,
            description: projectData.description?.slice(0, 160),
            images: projectData.images?.[0] ? [projectData.images[0]] : [],
        },
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    await dbConnect();
    const projectDoc = await Project.findOne({ slug }).lean();

    if (!projectDoc) {
        return (
            <div className="pt-20">
                <section className="py-20 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="font-serif text-3xl font-semibold text-charcoal mb-4">
                            Project Not Found
                        </h1>
                        <p className="text-warm-gray mb-8">
                            The project you&apos;re looking for doesn&apos;t exist or has been removed.
                        </p>
                        <Link
                            href="/projects"
                            className="inline-block px-8 py-3 bg-charcoal text-white text-sm font-medium tracking-wider hover:bg-accent-gold transition-all duration-300 uppercase"
                        >
                            View All Projects
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const project = projectDoc as unknown as {
        title: string;
        slug: string;
        category: string;
        description: string;
        images: string[];
        instagramUrl?: string;
    };

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-12 md:py-16 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <Link
                            href="/projects"
                            className="text-warm-gray text-sm hover:text-charcoal transition-colors mb-6 inline-flex items-center gap-2"
                        >
                            ← Back to Projects
                        </Link>
                        <p className="text-accent-gold text-xs tracking-[0.3em] uppercase mb-3 mt-4">
                            {project.category}
                        </p>
                        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal">
                            {project.title}
                        </h1>
                    </AnimatedSection>
                </div>
            </section>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
                <section className="py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <AnimatedSection delay={0.2}>
                            <ProjectGallery images={project.images} title={project.title} />
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* View More on Instagram */}
            {project.instagramUrl && (
                <section className="pb-8 md:pb-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <AnimatedSection delay={0.25}>
                            <a
                                href={project.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block relative overflow-hidden rounded-[2rem] min-h-[200px] md:min-h-[240px]"
                            >
                                {/* Blurred Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={project.images?.[0] || ''}
                                        alt=""
                                        className="w-full h-full object-cover scale-125 blur-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/70" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-950/80 via-pink-950/60 to-orange-950/70" />
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                                <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
                                    {/* Left: Icon + Text */}
                                    <div className="flex items-center gap-6 text-center md:text-left">
                                        {/* Instagram Icon */}
                                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[3px] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-pink-500/25">
                                            <div className="w-full h-full rounded-[13px] bg-black/30 backdrop-blur-md flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-pink-300 text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Follow the Journey</p>
                                            <h3 className="instagram-shine text-2xl md:text-3xl font-extrabold">
                                                View More on Instagram
                                            </h3>
                                            <p className="text-gray-200 text-sm md:text-base mt-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                                See behind-the-scenes, progress photos &amp; more
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Arrow */}
                                    <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-125 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom gradient accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                            </a>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* Description */}
            <section className="py-12 md:py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <AnimatedSection delay={0.3}>
                        <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
                            About This Project
                        </h2>
                        <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                            {project.description}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-off-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4">
                            Inspired by This Project?
                        </h2>
                        <p className="text-warm-gray mb-8">
                            Let&apos;s discuss how we can create something exceptional for you.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 bg-charcoal text-white text-sm font-medium tracking-wider hover:bg-accent-gold transition-all duration-300 uppercase"
                        >
                            Start Your Project
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
