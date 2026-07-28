import Script from "next/script";

export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Frima Technology",
    url: "https://www.frimatechnology.com",
    logo: "https://www.frimatechnology.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-706-048-2923",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://instagram.com/frimatechnology",
      "https://twitter.com/frimatechnology",
      "https://facebook.com/frimatechnology",
      "https://youtube.com/@frimatechnology",
      "https://linkedin.com/company/frimatechnology",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 Arala Street off Akenzuwa, Opposite Keystone Bank, Airport Road",
      addressLocality: "Benin City",
      addressCountry: "NG",
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}}
    />
  );
}

export function WebsiteJsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Frima Technology",
    url: "https://www.frimatechnology.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.frimatechnology.com/shop?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(website)}}
    />
  );
}
