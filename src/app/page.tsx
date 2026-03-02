import HeroSequence from '@/components/home/HeroSequence';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ServicesOverview from '@/components/home/ServicesOverview';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSequence />
      <FeaturedProjects />
      <ServicesOverview />
      <ContactCTA />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'DESIGN STUDIO',
            description:
              'Premium architecture and interior design studio in Nashik.',
            url: 'https://designstudio.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Nashik',
              addressRegion: 'Maharashtra',
              addressCountry: 'IN',
            },
            openingHours: ['Mo-Sa 10:00-19:00'],
            priceRange: '$$$$',
            image: 'https://designstudio.com/og-image.jpg',
            sameAs: [],
          }),
        }}
      />
    </>
  );
}
