// types.ts - Shared types for API endpoints
// This file contains shared types to avoid circular dependencies

export enum ModalQuotePriority {
  STANDARD = "standard",
  URGENT = "urgent",
  PREMIUM = "premium",
}

export interface QuoteModalData {
  fullName: string;
  email: string;
  phone: string;
  installationAddress?: string;
  additionalNotes?: string;

  entryPoint: "home" | "smart-walls" | "smart-devices" | "wall-panels" | "carbon-rock-boards";
  productCategory?: string;

  smartWalls?: any;
  smartDevices?: any;
  wallPanels?: any;
  carbonRockBoards?: any;

  clientMeta?: {
    urlPath?: string;
    userAgent?: string;
    submittedAt?: string;
  };
}

export interface QuoteModalAnalysis {
  priority: ModalQuotePriority;
  estimatedValue: number;
  productCount: number;
  complexity: string;
  specialRequirements: string[];
}

export interface ValidationResult {
  isValid: boolean;
  data?: QuoteModalData;
  errors?: Record<string, string>;
}

export interface EmailContent {
  adminHtml: string;
  adminText: string;
  customerHtml: string;
  customerText: string;
}

export interface EmailResults {
  success: boolean;
  error?: string;
  quoteId: string;
  emailIds?: {
    admin?: string;
    customer?: string;
  };
}

// Brand configuration types
export interface BrandConfig {
  primaryColor: string;
  accentColor: string;
  neutralBg: string;
  textColor: string;
  logoUrl: string;
  companyName: string;
  tagline: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export interface CTALinks {
  viewLink: string;
  pdfLink: string;
  approveLink: string;
  requestChangesLink: string;
  requestCallbackLink: string;
  forwardLink: string;
  scheduleConsultationLink: string;
  exploreSmartWallsLink: string;
  contactLink: string;
}

export interface ThemeVariant {
  name: string;
  primaryColor: string;
  accentColor: string;
  neutralBg: string;
  textColor: string;
  description: string;
}

export interface EmailTemplateOptions {
  variant?: 'external' | 'internal';
  theme?: string;
  language?: 'en' | 'fr' | 'es' | 'ar' | 'ur';
  brandConfig?: BrandConfig;
  ctaLinks?: CTALinks;
  trackingPixel?: string;
}