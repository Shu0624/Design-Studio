
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';

export default function ContactCTA() {
    return (
        <section className="relative py-[100px] md:py-[160px] overflow-hidden bg-charcoal">
            {/* Background Image with refined cinematic overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-[-5%] w-[110%] h-[110%] luxury-zoom-bg"
                    style={{
                        backgroundImage: 'url("/Contact CTA.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 luxury-cta-overlay" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <div className="flex flex-col items-center justify-center">
                        <span className="w-[1px] h-16 bg-accent-gold/50 mb-10 block" />

                        <p className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-5xl text-accent-gold mb-6 tracking-wide drop-shadow-md">
                            Let&apos;s Create Together
                        </p>

                        <h2 className="font-cormorant text-[42px] md:text-[72px] lg:text-[80px] font-normal text-white mb-8 leading-tight">
                            Ready to Transform <br />
                            <span className="italic font-light text-white/90">Your Space?</span>
                        </h2>

                        <p className="font-sans text-warm-gray text-[14px] md:text-[16px] tracking-[0.2em] uppercase max-w-xl mx-auto mb-16 leading-relaxed font-light">
                            Every great space begins with a thoughtful conversation.
                        </p>

                        <Link href="/contact" className="relative inline-flex group/cta-btn">
                            <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl animate-breathe" />
                            <div className="relative flex items-center justify-between gap-6 px-[24px] py-[14px] md:px-[32px] md:py-[16px] border border-accent-gold/40 bg-white/10 backdrop-blur-md rounded-full transition-all duration-700 group-hover/cta-btn:bg-accent-gold group-hover/cta-btn:border-accent-gold shadow-sm group-hover/cta-btn:shadow-[0_0_30px_rgba(212,175,55,0.4)] overflow-hidden">
                                <div className="absolute inset-0 translate-x-[-100%] group-hover/cta-btn:animate-[shine-fast_1.5s_ease-out] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                <span className="relative z-10 text-[16px] md:text-[18px] font-medium tracking-[0.2em] uppercase text-white transition-colors duration-700">
                                    Start a Conversation
                                </span>
                                <span className="relative z-10 flex items-center justify-center transform transition-transform duration-700 group-hover/cta-btn:translate-x-3 text-accent-gold group-hover/cta-btn:text-white text-[18px]">
                                    →
                                </span>
                            </div>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
