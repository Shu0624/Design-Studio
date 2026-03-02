'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative cursor-pointer img-hover-zoom ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                            }`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image
                            src={image}
                            alt={`${title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes={index === 0 ? '100vw' : '50vw'}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white text-3xl hover:text-accent-gold transition-colors z-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>

                        {/* Navigation */}
                        {selectedImage > 0 && (
                            <button
                                className="absolute left-4 md:left-8 text-white text-4xl hover:text-accent-gold transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(selectedImage - 1);
                                }}
                            >
                                ‹
                            </button>
                        )}
                        {selectedImage < images.length - 1 && (
                            <button
                                className="absolute right-4 md:right-8 text-white text-4xl hover:text-accent-gold transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(selectedImage + 1);
                                }}
                            >
                                ›
                            </button>
                        )}

                        <motion.div
                            key={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-[16/10]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[selectedImage]}
                                alt={`${title} - Image ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </motion.div>

                        <p className="absolute bottom-6 text-white/60 text-sm">
                            {selectedImage + 1} / {images.length}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
