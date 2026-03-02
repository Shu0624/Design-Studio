'use client';

import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useImageSequence } from '@/hooks/useImageSequence';

export default function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use custom hook for sequence logic
    const { canvasRef, drawFrame, isLoading } = useImageSequence({
        totalFrames: 153, // 176 - 23 skipped frames
        folderPath: '/hero animation', // Images are in hero animation folder
        fileNamePrefix: 'ezgif-frame-',
        extension: 'jpg',
        padLength: 3,
        startFrame: 24, // Start from frame 24
        objectFit: 'contain', // Ensure full image is visible
    });

    // Scroll progress for the entire 400vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });



    // Draw frame on scroll change
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        drawFrame(latest);
    });

    // Initial draw when loading completes
    useEffect(() => {
        if (!isLoading) {
            drawFrame(0);
        }
    }, [isLoading, drawFrame]);

    // Handle window resize to ensure canvas fits correctly
    useEffect(() => {
        const handleResize = () => {
            drawFrame(scrollYProgress.get());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                />





                {/* Loading Indicator */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
                            <p className="text-white/50 text-xs tracking-widest uppercase">Loading Experience</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
