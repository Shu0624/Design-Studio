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
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-500 flex items-end">
                    <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="px-3 py-1 bg-accent-gold text-white text-xs tracking-wider uppercase">
                            View Project
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-1.5">
                {category}
            </p>
            <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-accent-gold transition-colors duration-300">
                {title}
            </h3>
        </Link>
    );
}
