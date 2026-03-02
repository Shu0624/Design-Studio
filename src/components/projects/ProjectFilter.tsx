'use client';

interface ProjectFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    categories?: string[];
}

export default function ProjectFilter({ activeCategory, onCategoryChange, categories = [] }: ProjectFilterProps) {
    const allCategories = ['all', ...categories];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allCategories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeCategory === cat
                        ? 'bg-charcoal text-white'
                        : 'bg-transparent text-warm-gray border border-light-border hover:border-charcoal hover:text-charcoal'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
