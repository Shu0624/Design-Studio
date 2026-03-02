import Image from 'next/image';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
    image?: string;
}

export default function ServiceCard({ title, description, icon, image }: ServiceCardProps) {
    return (
        <div className="border border-light-border hover:border-accent-gold group transition-all duration-300 h-full bg-white overflow-hidden">
            {image ? (
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
            ) : null}
            <div className="p-8 md:p-10">
                <span className="text-4xl mb-6 block">{icon}</span>
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4 group-hover:text-accent-gold transition-colors">
                    {title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                    {description}
                </p>
                <div className="mt-6 h-[2px] w-0 group-hover:w-12 bg-accent-gold transition-all duration-500" />
            </div>
        </div>
    );
}
