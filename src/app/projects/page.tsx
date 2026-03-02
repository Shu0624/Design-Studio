'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

interface Project {
    _id: string;
    title: string;
    slug: string;
    category: string;
    images: string[];
}

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, categoriesRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/categories')
                ]);

                if (projectsRes.ok) {
                    const data = await projectsRes.json();
                    setProjects(data);
                }

                if (categoriesRes.ok) {
                    const data = await categoriesRes.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProjects =
        activeCategory === 'all'
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-16 md:py-24 bg-off-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimatedSection>
                        <SectionHeading
                            title="Our Projects"
                            subtitle="Explore our portfolio of distinguished architectural and interior design projects across Nashik and beyond."
                        />
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <ProjectFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            categories={categories}
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 aspect-[4/5] mb-4" />
                                    <div className="h-3 bg-gray-200 w-20 mb-2" />
                                    <div className="h-5 bg-gray-200 w-40" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <AnimatedSection key={project._id} delay={index * 0.1}>
                                    <ProjectCard
                                        title={project.title}
                                        category={project.category}
                                        image={project.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'}
                                        slug={project.slug}
                                    />
                                </AnimatedSection>
                            ))}
                        </div>
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-warm-gray text-lg">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
