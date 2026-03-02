'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
    label?: string;
}

export default function ImageUploader({ images, onChange, maxImages, label = 'Images' }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            const newImages: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    newImages.push(data.url);
                }
            }

            onChange([...images, ...newImages]);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
                {label}
            </label>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-off-white group">
                            <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            {(!maxImages || images.length < maxImages) && (
                <div
                    className="border-2 border-dashed border-light-border hover:border-accent-gold p-8 text-center cursor-pointer transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <p className="text-warm-gray text-sm">Uploading...</p>
                    ) : (
                        <>
                            <p className="text-2xl mb-2">📸</p>
                            <p className="text-warm-gray text-sm">
                                Click to upload images
                            </p>
                            <p className="text-warm-gray text-xs mt-1">
                                PNG, JPG up to 10MB
                            </p>
                        </>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
