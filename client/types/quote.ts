// Types for the Quote Modal system
export type ProductCategory = 'smart-walls' | 'smart-devices' | 'wall-panels' | 'carbon-rock-boards';

export interface ContactFormData {
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  installationAddress: string;
  additionalNotes: string;
  projectType?: string;
  budget?: string;
}

export interface SmartWallsFormData {
  // Dimensional specifications
  dimensions?: {
    width?: number;
    height?: number;
    depth?: '120mm' | '150mm' | '180mm' | 'custom';
    customDepth?: number;
    calculatedMaxWidth?: number;
  };
  
  // Legacy style selection (kept for compatibility across the app)
  selectedStyle?: {
    category?: string;
    categoryId?: string;
    finish?: string;
    finishId?: string;
    finishImage?: string;
    finishDescription?: string;
  };

  // New optional style model used by StepSmartWalls (non-breaking)
  style?: {
    category?: string; // category id
    categoryName?: string; // category display name
    finish?: {
      id: number;
      name: string;
      img: string;
      desc: string;
    };
  };
  
  // Accessories
  accessories?: {
    tv?: boolean;
    fireplace?: boolean;
    soundbar?: boolean;
    shelving?: boolean;
  };
  
  // Smart devices (original object shape with nested selectedDevices)
  smartDevices?: {
    selectedDevices?: Array<{
      name: string;
      category: string;
    }>;
    controlPanels?: boolean;
    securitySensors?: boolean;
    homeAutomation?: boolean;
  };
  
  // Gaming system
  gamingSystem?: {
    type?: 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC Setup' | 'Custom' | null;
    specifications?: string;
  };
  
  // Explicit skip flags recorded by StepSmartWalls (optional to remain non-breaking)
  skippedAccessories?: boolean;
  skippedSmartDevices?: boolean;

  // Existing fields for backward compatibility
  tvIntegration?: boolean;
  speakers?: boolean;
  lighting?: boolean;
  additionalFeatures?: string[];
  projectDetails?: {
    propertyType?: 'residential' | 'commercial';
    purpose?: 'decorative' | 'functional' | 'both';
    installation?: 'supply-only' | 'supply-install';
  };
  wallSpecifications?: {
    width?: number;
    height?: number;
    thickness?: string;
    layout?: 'straight' | 'curved' | 'angled';
  };
  technicalNeeds?: {
    soundproofing?: boolean;
    fireRating?: boolean;
    accessibility?: boolean;
    ecoMaterials?: boolean;
  };
}

// Dimensional calculation interfaces
export interface DimensionalCalculation {
  maxWidth: number;
  modules: Array<{
    size: number;
    count: number;
  }>;
  warnings: string[];
  isValid: boolean;
}

// Device catalog interface
export interface SmartDevice {
  name: string;
  category: string;
  description: string;
  icon: any;
  features: string[];
  popular?: boolean;
}

// Texture category interface
export interface TextureCategory {
  id: string;
  name: string;
  desc: string;
  icon: any;
  color: string;
  img: string;
  accent: string;
  panels: Array<{
    id: number;
    name: string;
    img: string;
    desc: string;
  }>;
}

// Email data structure for enhanced smart walls
export interface SmartWallsEmailData {
  dimensions: {
    width: number;
    height: number;
    depth: string;
    calculatedMaxWidth: number;
    warnings: string[];
  };
  style: {
    category: string;
    finish: string;
    description: string;
  };
  accessories: string[];
  smartDevices: Array<{
    name: string;
    category: string;
  }>;
  gamingSystem: {
    type: string;
    specifications?: string;
  };
}

export interface SmartDevicesFormData {
  controlPanels?: boolean;
  panelModel?: string;
  panelRoom?: string;
  panelMountType?: string;
  securitySensors?: boolean;
  motionDetection?: boolean;
  smokeDetection?: boolean;
  securityFeatures?: string[];
  homeAutomation?: boolean;
  automationFeatures?: string[];
  selectedDevices?: { name: string; category?: string }[];
}

export interface WallPanelsFormData {
  panelType?: 'fluted' | 'hd-printing' | 'textured' | 'smooth';
  flutedGrooveDepth?: string;
  flutedSpacing?: string;
  hdPrintingPattern?: string;
  textureType?: string;
  finish?: string;
  dimensions?: {
    width?: number;
    height?: number;
    area?: number;
  };
  installation?: 'diy' | 'professional';
}

export interface CarbonRockBoardsFormData {
  boardType?: 'acoustic' | 'mirror' | 'standard';
  acousticNrcRating?: string;
  acousticFabricColor?: string;
  mirrorTint?: string;
  thickness?: string;
  dimensions?: {
    width?: number;
    height?: number;
    area?: number;
  };
  installation?: 'diy' | 'professional';
}

export interface QuoteFormData {
  contact: ContactFormData;
  productCategory: ProductCategory;
  smartWalls?: SmartWallsFormData;
  smartDevices?: SmartDevicesFormData;
  wallPanels?: WallPanelsFormData;
  carbonRockBoards?: CarbonRockBoardsFormData;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategory?: ProductCategory;
  // Optional: some pages pass a selected product to prefill context or email
  // Keeping it as loose type to avoid breaking pages that already pass it
  selectedProduct?: any;
}

export interface StepProps {
  data: any;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
  onValidate: () => boolean;
}

