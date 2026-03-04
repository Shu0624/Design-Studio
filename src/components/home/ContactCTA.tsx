
import AnimatedSection from '@/components/ui/AnimatedSection';
import PremiumButton from '@/components/ui/PremiumButton';

export default function ContactCTA() {
    return (
        <section className="relative py-32 md:py-48 overflow-hidden bg-charcoal">
            {/* Background Image with refined overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 transform scale-105"
                    style={{
                        backgroundImage: 'url("/Contact CTA.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    }}
                />
                <div className="absolute inset-0 bg-charcoal/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <div className="flex flex-col items-center justify-center">
                        <span className="w-[1px] h-16 bg-accent-gold/50 mb-10 block" />

                        <p className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-5xl text-accent-gold mb-6 tracking-wide drop-shadow-md">
                            Let&apos;s Create Together
                        </p>

                        <h2 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight">
                            Ready to Transform <br />
                            <span className="italic font-light text-white/90">Your Space?</span>
                        </h2>

                        <p className="font-sans text-warm-gray text-[13px] md:text-sm tracking-[0.2em] uppercase max-w-xl mx-auto mb-16 leading-relaxed font-light">
                            Every great space begins with a thoughtful conversation.
                        </p>

                        <PremiumButton href="/contact" variant="primary">
                            Start a Conversation
                        </PremiumButton>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
