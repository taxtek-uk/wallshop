// SEO Data Configuration for ORVIBO Product Pages

export interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  structuredData: object;
  hreflang?: { [key: string]: string };
}

const baseUrl = 'https://thewallshop.co.uk';

// Smart Control Panels SEO Data
export const smartControlPanelsSEO: SEOPageData = {
  title: 'ORVIBO Smart Central Control Panels - MixPad Series | Smart Home Gateways',
  description: 'Discover ORVIBO MixPad smart control panels - the ultimate smart home command center. Voice control, touchscreen interface, and seamless device integration. Professional installation available.',
  keywords: 'ORVIBO MixPad, smart control panel, smart home gateway, home automation hub, voice control panel, touchscreen controller, smart wall panel, home automation system, smart home control, MixPad M5, MixPad X, MixPad 7 Ultra',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/control-panels`,
  ogImage: `${baseUrl}/images/mixpad_m5.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Smart Central Control Panels",
    "description": "Professional smart home control panels and gateways for comprehensive home automation",
    "url": `${baseUrl}/smart-devices/orvibo/control-panels`,
    "image": `${baseUrl}/images/mixpad_m5.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "149",
      "highPrice": "599",
      "offerCount": "7"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247"
    }
  }
};

// Smart Switches SEO Data
export const smartSwitchesSEO: SEOPageData = {
  title: 'ORVIBO Smart Switches - Defy, Bach & Super Series | Intelligent Wall Switches',
  description: 'Premium ORVIBO smart switches with dual-screen technology, scene control, and voice integration. Transform your walls into smart control surfaces. Free consultation available.',
  keywords: 'ORVIBO smart switches, Defy series switch, Bach series switch, Super smart switch, intelligent wall switch, smart lighting control, scene control switch, voice control switch, ZigBee switch, smart home switch',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/switches`,
  ogImage: `${baseUrl}/images/defy_series_smart_switch.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Smart Switches",
    "description": "Intelligent wall switches with advanced scene control and voice integration",
    "url": `${baseUrl}/smart-devices/orvibo/switches`,
    "image": `${baseUrl}/images/defy_series_smart_switch.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "69",
      "highPrice": "199",
      "offerCount": "6"
    }
  }
};

// Smart Lighting SEO Data
export const smartLightingSEO: SEOPageData = {
  title: 'ORVIBO Smart Lighting - Sky Dome Pro, SOPRO & S Series | Intelligent LED Lights',
  description: 'Revolutionary ORVIBO smart lighting with circadian rhythm support, natural daylight simulation, and mood control. Energy-efficient LED technology with app control.',
  keywords: 'ORVIBO smart lighting, Sky Dome Pro ceiling light, SOPRO decorative lights, S series smart lights, smart LED bulbs, circadian lighting, mood lighting, smart home lighting, energy efficient lighting, app controlled lights',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/lighting`,
  ogImage: `${baseUrl}/images/sky_dome_pro_ceiling_light.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Smart Lighting",
    "description": "Advanced smart lighting solutions with circadian rhythm support and energy efficiency",
    "url": `${baseUrl}/smart-devices/orvibo/lighting`,
    "image": `${baseUrl}/images/sky_dome_pro_ceiling_light.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "29",
      "highPrice": "299",
      "offerCount": "6"
    }
  }
};

// Security & Sensors SEO Data
export const securitySensorsSEO: SEOPageData = {
  title: 'ORVIBO Home Security & Sensors - Smart Locks, Cameras & Safety Sensors',
  description: 'Comprehensive ORVIBO security solutions with AI-powered smart locks, 2K cameras, and environmental sensors. Professional monitoring available. Protect what matters most.',
  keywords: 'ORVIBO security system, smart door lock, AI face recognition lock, smart IP camera, home security sensors, door window sensor, smoke detector, water leak sensor, emergency button, home safety',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/security-sensors`,
  ogImage: `${baseUrl}/images/smart_lock_v5_face.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Home Security & Sensors",
    "description": "Comprehensive smart security solutions with AI-powered locks and environmental monitoring",
    "url": `${baseUrl}/smart-devices/orvibo/security-sensors`,
    "image": `${baseUrl}/images/smart_lock_v5_face.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "25",
      "highPrice": "599",
      "offerCount": "10"
    }
  }
};

// Smart Shading SEO Data
export const smartShadingSEO: SEOPageData = {
  title: 'ORVIBO Smart Shading - Automated Curtains & Blinds | Energy Efficient Window Treatments',
  description: 'ORVIBO smart curtain motors and automated blinds for energy savings and convenience. Quiet operation, solar tracking, and voice control. Reduce energy costs by up to 30%.',
  keywords: 'ORVIBO smart curtains, automated curtain motor, smart blinds, motorized window treatments, energy efficient shading, smart curtain kit, automated blinds, voice controlled curtains, solar tracking blinds',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/shading`,
  ogImage: `${baseUrl}/images/smart_curtain_motor_kit.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Smart Shading",
    "description": "Automated window treatments for energy efficiency and convenience",
    "url": `${baseUrl}/smart-devices/orvibo/shading`,
    "image": `${baseUrl}/images/smart_curtain_motor_kit.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "79",
      "highPrice": "299",
      "offerCount": "6"
    }
  }
};

// Smart HVAC SEO Data
export const smartHVACSEO: SEOPageData = {
  title: 'ORVIBO Smart HVAC - Intelligent Climate Control | Energy Efficient Heating & Cooling',
  description: 'Advanced ORVIBO HVAC control systems with AI learning, multi-zone management, and energy optimization. Reduce heating costs by up to 30% with smart climate control.',
  keywords: 'ORVIBO smart HVAC, intelligent climate control, smart thermostat, multi-zone heating, energy efficient HVAC, smart air conditioning, automated climate control, smart heating system, HVAC optimization',
  canonicalUrl: `${baseUrl}/smart-devices/orvibo/hvac`,
  ogImage: `${baseUrl}/images/central_ac_control_panel.webp`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "ORVIBO Smart HVAC",
    "description": "Intelligent climate control systems with AI learning and energy optimization",
    "url": `${baseUrl}/smart-devices/orvibo/hvac`,
    "image": `${baseUrl}/images/central_ac_control_panel.webp`,
    "brand": {
      "@type": "Brand",
      "name": "ORVIBO"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "89",
      "highPrice": "499",
      "offerCount": "6"
    }
  }
};

// Common hreflang configuration for international SEO
export const commonHreflang = {
  'en-GB': `${baseUrl}`,
  'en-US': `${baseUrl}/us`,
  'en-AU': `${baseUrl}/au`,
  'en-CA': `${baseUrl}/ca`
};

// Voice Search Optimized FAQ Data
export const voiceSearchFAQs = {
  controlPanels: [
    {
      question: "What is the best smart home control panel?",
      answer: "The ORVIBO MixPad series offers the most advanced smart home control with voice integration, touchscreen interface, and support for multiple protocols including ZigBee and WiFi."
    },
    {
      question: "How much does a smart home control panel cost?",
      answer: "ORVIBO smart control panels range from £149 to £599, depending on features and screen size. Professional installation is available for £99."
    }
  ],
  lighting: [
    {
      question: "What are the benefits of smart lighting?",
      answer: "Smart lighting offers energy savings up to 80%, circadian rhythm support, voice control, and automated scheduling. ORVIBO smart lights also provide natural daylight simulation."
    },
    {
      question: "How much can I save with smart lighting?",
      answer: "Smart lighting can reduce energy costs by 60-80% compared to traditional bulbs, saving the average household £200-400 annually on electricity bills."
    }
  ]
};

// Local SEO Data for "Near Me" Searches
export const localSEOData = {
  businessName: "The Wall Shop",
  address: "123 Smart Home Street, London, UK",
  phone: "+44 20 1234 5678",
  email: "info@thewallshop.co.uk",
  serviceAreas: [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", 
    "Sheffield", "Bristol", "Newcastle", "Nottingham", "Leicester"
  ],
  services: [
    "Smart Home Installation",
    "ORVIBO Product Sales",
    "Home Automation Consultation",
    "Smart Device Setup",
    "Technical Support"
  ]
};

