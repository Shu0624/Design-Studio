'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageSequenceProps {
    totalFrames: number;
    folderPath: string; // e.g. "/hero-sequence"
    fileNamePrefix: string; // e.g. "frame_"
    extension?: string; // e.g. "jpg"
    startFrame?: number; // e.g. 1 to start from frame_0001
    padLength?: number; // e.g. 4 for frame_0001
    objectFit?: 'cover' | 'contain';
}

export function useImageSequence({
    totalFrames,
    folderPath,
    fileNamePrefix,
    extension = 'jpg',
    padLength = 4,
    startFrame = 1,
    objectFit = 'cover',
}: UseImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];
        const promises: Promise<void>[] = [];

        for (let i = 0; i < totalFrames; i++) {
            const promise = new Promise<void>((resolve) => {
                const img = new Image();
                const currentFrame = startFrame + i;
                const frameNumber = currentFrame.toString().padStart(padLength, '0');
                img.src = `${folderPath}/${fileNamePrefix}${frameNumber}.${extension}`;

                img.onload = () => {
                    loadedCount++;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load frame: ${img.src}`);
                    resolve(); // Resolve anyway to avoid hanging
                };
                imgArray.push(img);
            });
            promises.push(promise);
        }

        Promise.all(promises).then(() => {
            setImages(imgArray);
            setIsLoading(false);
            console.log(`Sequence loaded: ${loadedCount}/${totalFrames} frames`);
        });

    }, [totalFrames, folderPath, fileNamePrefix, extension, padLength, startFrame]);

    // Draw frame on canvas based on progress (0 to 1)
    const drawFrame = useCallback((scrollProgress: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Map scroll (0-1) to frame index (0 to totalFrames-1)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
        );

        const img = images[frameIndex];
        if (!img || !img.complete) return;

        // High-DPI scaling
        const dpr = window.devicePixelRatio || 1;

        // Ensure canvas matches window size
        if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        }

        // Logic for object-fit
        // Default is 'cover' to fill execution context instructions
        const fit = objectFit || 'cover';

        const canvasRatio = window.innerWidth / window.innerHeight;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (fit === 'contain') {
            // Contain logic: fit image within canvas
            if (canvasRatio > imgRatio) {
                // Window is wider than image -> fit to height
                drawHeight = window.innerHeight;
                drawWidth = window.innerHeight * imgRatio;
                offsetX = (window.innerWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Window is taller than image -> fit to width
                drawWidth = window.innerWidth;
                drawHeight = window.innerWidth / imgRatio;
                offsetX = 0;
                offsetY = (window.innerHeight - drawHeight) / 2;
            }
        } else {
            // Cover logic (default)
            if (canvasRatio > imgRatio) {
                drawWidth = window.innerWidth;
                drawHeight = window.innerWidth / imgRatio;
                offsetX = 0;
                offsetY = (window.innerHeight - drawHeight) / 2;
            } else {
                drawWidth = window.innerHeight * imgRatio;
                drawHeight = window.innerHeight;
                offsetX = (window.innerWidth - drawWidth) / 2;
                offsetY = 0;
            }
        }

        // Clear and draw
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    }, [images, totalFrames, objectFit]);

    return { canvasRef, drawFrame, isLoading };
}
