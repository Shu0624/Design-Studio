'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AboutData {
    founderName: string;
    founderBio: string;
    founderImages: string[];
    projectsCompleted: string;
    yearsOfExperience: string;
    happyClients: string;
    designAwards: string;
}

export default function AdminAboutPage() {
    const [data, setData] = useState<AboutData>({
        founderName: '',
        founderBio: '',
        founderImages: [],
        projectsCompleted: '',
        yearsOfExperience: '',
        happyClients: '',
        designAwards: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        try {
            const res = await fetch('/api/about');
            if (res.ok) {
                const fetchedData = await res.json();
                setData({
                    founderName: fetchedData.founderName || '',
                    founderBio: fetchedData.founderBio || '',
                    founderImages: fetchedData.founderImages || [],
                    projectsCompleted: fetchedData.projectsCompleted || '50+',
                    yearsOfExperience: fetchedData.yearsOfExperience || '8+',
                    happyClients: fetchedData.happyClients || '30+',
                    designAwards: fetchedData.designAwards || '5',
                });
            }
        } catch (error) {
            console.error('Failed to fetch about data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', files[0]);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const { url } = await res.json();

            // Allow multiple images or just replace the first one. Let's allow replacing or adding.
            // For simplicity, let's just make it a single array of images, and replace the whole array with 1 image for now,
            // or append if we want a gallery. Based on user "info about founder and thier images", plural. So we append.
            setData(prev => ({
                ...prev,
                founderImages: [...prev.founderImages, url],
            }));
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ text: 'Failed to upload image', type: 'error' });
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setData(prev => ({
            ...prev,
            founderImages: prev.founderImages.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to save');

            setMessage({ text: 'About page information saved successfully', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            setMessage({ text: 'Failed to save changes', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-warm-gray">Loading about page data...</div>;
    }

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    Manage About Page
                </h1>
                <p className="text-warm-gray text-sm">
                    Update the founder information and images displayed on the About page.
                </p>
            </div>

            {message.text && (
                <div
                    className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-gray-100 shadow-sm rounded-lg">
                <div className="space-y-4">
                    <h2 className="text-lg font-serif font-medium text-charcoal border-b pb-2">Founder Information</h2>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">
                            Founder Name
                        </label>
                        <input
                            type="text"
                            value={data.founderName}
                            onChange={(e) => setData({ ...data, founderName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-accent-gold transition-colors"
                            placeholder="e.g. Ar. Namrata Pawar"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">
                            Founder Bio / Title / Subtitle
                        </label>
                        <textarea
                            value={data.founderBio}
                            onChange={(e) => setData({ ...data, founderBio: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded h-32 resize-y focus:outline-none focus:border-accent-gold transition-colors"
                            placeholder="e.g. Architecture & Interior Design..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-serif font-medium text-charcoal border-b pb-2">Founder Images</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.founderImages.map((url, index) => (
                            <div key={index} className="relative aspect-square group">
                                <Image
                                    src={url}
                                    alt={`Founder image ${index + 1}`}
                                    fill
                                    className="object-cover rounded border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <label className="relative aspect-square border-2 border-dashed border-gray-300 rounded hover:border-accent-gold transition-colors cursor-pointer flex flex-col items-center justify-center text-warm-gray">
                            {isUploading ? (
                                <span>Uploading...</span>
                            ) : (
                                <>
                                    <span className="text-2xl mb-1">+</span>
                                    <span className="text-xs">Add Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                </>
                            )}
                        </label>
                    </div>
                    <p className="text-xs text-warm-gray">Note: Highly recommend uploading portrait-oriented, professional images.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-serif font-medium text-charcoal border-b pb-2">Studio Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                                Projects Completed
                            </label>
                            <input
                                type="text"
                                value={data.projectsCompleted}
                                onChange={(e) => setData({ ...data, projectsCompleted: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-accent-gold transition-colors"
                                placeholder="e.g. 50+"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                                Years of Experience
                            </label>
                            <input
                                type="text"
                                value={data.yearsOfExperience}
                                onChange={(e) => setData({ ...data, yearsOfExperience: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-accent-gold transition-colors"
                                placeholder="e.g. 8+"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                                Happy Clients
                            </label>
                            <input
                                type="text"
                                value={data.happyClients}
                                onChange={(e) => setData({ ...data, happyClients: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-accent-gold transition-colors"
                                placeholder="e.g. 30+"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                                Design Awards
                            </label>
                            <input
                                type="text"
                                value={data.designAwards}
                                onChange={(e) => setData({ ...data, designAwards: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-accent-gold transition-colors"
                                placeholder="e.g. 5"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-8 py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-wider hover:bg-accent-gold transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
