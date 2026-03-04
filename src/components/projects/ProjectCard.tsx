import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    slug: string;
}

export default function ProjectCard({ title, category, image, slug }: ProjectCardProps) {
    return (
        <Link href={`/projects/${slug}`} className="group block">
            <div className="img-hover-zoom relative aspect-[4/5] mb-4 bg-off-white">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-700 flex items-center justify-center">
                    <div className="relative inline-flex opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 scale-90">
                        {/* Breathing Glow */}
                        <div className="absolute inset-0 bg-accent-gold/40 rounded-full blur-lg animate-breathe" />

                        {/* Button body */}
                        <div className="relative flex items-center justify-between gap-4 px-6 py-3 border border-accent-gold/40 bg-white/95 backdrop-blur-md rounded-full shadow-xl overflow-hidden group/btn">
                            {/* Shimmer sweep effect */}
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:animate-[shine-fast_1.5s_ease-out] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                            <span className="relative z-10 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal">
                                View Project
                            </span>
                            <span className="relative z-10 flex items-center justify-center transform transition-transform duration-700 group-hover/btn:translate-x-1 text-accent-gold text-sm">
                                →
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-accent-gold text-xs tracking-[0.25em] uppercase mb-2 font-medium">
                {category}
            </p>
            <h3 className="font-cormorant text-2xl md:text-3xl font-medium text-charcoal group-hover:text-accent-gold transition-colors duration-500">
                {title}
            </h3>
        </Link>
    );
}
