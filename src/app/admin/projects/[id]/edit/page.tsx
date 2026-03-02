'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'residential',
        description: '',
        images: [] as string[],
        instagramUrl: '',
        featured: false,
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<string[]>(['residential', 'commercial', 'interior', 'architecture']);
    const [showCustomCategory, setShowCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        title: data.title,
                        category: data.category,
                        description: data.description,
                        images: data.images || [],
                        instagramUrl: data.instagramUrl || '',
                        featured: data.featured,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch project:', error);
            } finally {
                setFetching(false);
            }
        };
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchProject();
        fetchCategories();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const submitData = {
            ...formData,
            category: showCustomCategory ? customCategory.toLowerCase().trim() : formData.category,
        };

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                router.push('/admin/projects');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to update project');
            }
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="text-center py-12 text-warm-gray">Loading project...</div>;
    }

    return (
        <div>
            <h1 className="font-serif text-3xl font-semibold text-charcoal mb-8">
                Edit Project
            </h1>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="bg-white border border-light-border p-8">
                    <Input
                        label="Project Title"
                        placeholder="e.g., The Meridian Residence"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-charcoal mb-2 tracking-wide">
                            Category
                        </label>
                        <div className="space-y-3">
                            <select
                                value={categories.includes(formData.category) ? formData.category : 'custom'}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === 'custom') {
                                        setShowCustomCategory(true);
                                        setCustomCategory(formData.category); // Pre-fill with existing custom value if any
                                    } else {
                                        setShowCustomCategory(false);
                                        setFormData({ ...formData, category: val });
                                    }
                                }}
                                className="w-full px-4 py-3 border border-light-border bg-white text-charcoal focus:outline-none focus:border-accent-gold transition-colors capitalize appearance-none"
                            >
                                <optgroup label="Select Category">
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="capitalize">
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </optgroup>
                                <optgroup label="Or Type Your Own">
                                    <option value="custom">+ Add New Category...</option>
                                </optgroup>
                            </select>

                            {showCustomCategory && (
                                <div className="animate-fade-in-down">
                                    <input
                                        type="text"
                                        value={customCategory}
                                        onChange={(e) => setCustomCategory(e.target.value)}
                                        placeholder="Type new category name (e.g. Bungalow)"
                                        className="w-full px-4 py-3 border border-accent-gold bg-amber-50/30 text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors"
                                        autoFocus
                                    />
                                    <p className="text-xs text-accent-gold mt-1.5 ml-1">
                                        * This will be added as a new category tag
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Textarea
                        label="Description"
                        placeholder="Describe the project..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="mb-5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 accent-accent-gold"
                            />
                            <span className="text-sm font-medium text-charcoal">Featured Project</span>
                        </label>
                    </div>

                    <Input
                        label="Instagram URL (optional)"
                        placeholder="https://www.instagram.com/p/..."
                        value={formData.instagramUrl}
                        onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    />
                    <p className="text-xs text-warm-gray -mt-3 mb-2">
                        Link to the Instagram post for this project.
                    </p>
                </div>

                <div className="bg-white border border-light-border p-8">
                    <ImageUploader
                        images={formData.images}
                        onChange={(images) => setFormData({ ...formData, images })}
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-4">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
