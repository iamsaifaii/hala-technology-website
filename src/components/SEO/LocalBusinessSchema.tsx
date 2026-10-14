import JsonLd from './JsonLd';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hala Technologies",
    "alternateName": "Hala Smart Technologies",
    "image": "https://halatechnology.ae/hero-images/HomeHeroimage.png",
    "url": "https://halatechnology.ae",
    "telephone": "+971 58 613 9007",
    "email": "Contact@halatechnology.ae",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1803, Latifa Tower, Sheikh Zayed Road",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.21639,
      "longitude": 55.27891
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing & Technology Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services in Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PPC Management Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Identity Design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Editing Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Creation Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Agent Solutions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WhatsApp Automation Services" } }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/hala-smart-technologies/",
      "https://www.instagram.com/halatechnology/",
      "https://www.facebook.com/HalaSmartTechnology"
    ]
  };

  return (
    <JsonLd id="local-business-schema" data={schema} />
  );
}
