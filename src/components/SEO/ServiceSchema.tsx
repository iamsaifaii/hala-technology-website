import JsonLd from './JsonLd';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  providerName?: string;
  providerUrl?: string;
  image?: string;
}

export default function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  providerName = 'Hala Technology',
  providerUrl = 'https://halatechnology.ae',
  image = 'https://halatechnology.ae/hero-images/HomeHeroimage.png',
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType,
    provider: {
      '@type': 'ProfessionalService',
      name: providerName,
      url: providerUrl,
      image,
      telephone: '+971 58 613 9007',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1803, Latifa Tower, Sheikh Zayed Road',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.21639,
        longitude: 55.27891,
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Dubai',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    ],
  };

  return (
    <JsonLd
      id={`service-schema-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      data={schema}
    />
  );
}
