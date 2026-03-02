interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false }: SectionHeadingProps) {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            <h2
                className={`font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${light ? 'text-white' : 'text-charcoal'
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`text-base md:text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''
                        } ${light ? 'text-gray-300' : 'text-warm-gray'}`}
                >
                    {subtitle}
                </p>
            )}
            <div
                className={`mt-6 h-[2px] w-16 bg-accent-gold ${centered ? 'mx-auto' : ''
                    }`}
            />
        </div>
    );
}
