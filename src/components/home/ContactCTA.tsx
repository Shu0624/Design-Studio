import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ContactCTA() {
    return (
        <section className="relative py-32 md:py-52 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-black/50">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'url("/Contact CTA.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <p className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-6xl text-[#E5C558] mb-6 tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        Let&apos;s Create Together
                    </p>
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#fcfcfc] mb-10 leading-tight drop-shadow-lg">
                        <span className="bg-gradient-to-br from-[#D4AF37] via-[#F1D06E] to-[#C5A028] bg-clip-text text-transparent">
                            Ready to Transform
                        </span>
                        <span className="block italic font-light text-[#D4AF37] mt-2">
                            Your Space?
                        </span>
                    </h2>
                    <p className="font-sans text-gray-100 text-xl md:text-2xl max-w-2xl mx-auto mb-14 leading-relaxed tracking-wide font-light drop-shadow-md">
                        Every great space begins with a conversation...
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-12 py-6 bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white text-base font-bold tracking-[0.2em] rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 uppercase transform hover:-translate-y-1 border border-[#F1D06E]/30"
                    >
                        Start a Conversation
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
}
