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
  tvIntegration: boolean;
  screenSize?: string;
  mountType?: string;
  avEquipment?: string;
  consoles?: string;
  speakers: boolean;
  speakerType?: string;
  speakerQuantity?: number;
  surroundSetup?: string;
  wirelessAudio?: boolean;
  lighting: boolean;
  lightingType?: string;
  colorControl?: boolean;
  dimmingControl?: boolean;
  additionalFeatures: string[];
  // Added for Smart Wall specific quoting
  projectDetails?: {
    propertyType: 'residential' | 'commercial' | 'other';
    purpose: 'partition' | 'decorative' | 'soundproof' | 'other';
    location?: string;
    installation: 'supply-only' | 'supply-install';
  };
  wallSpecifications?: {
    width: number;     // meters
    height: number;    // meters
    thickness: string; // free text or mm
    layout: 'straight' | 'l-shape' | 'u-shape' | 'custom';
  };
  technicalNeeds?: {
    soundproofing: boolean;
    fireRating: boolean;
    accessibility: boolean;
    ecoMaterials: boolean;
  };
}

export interface SmartDevicesFormData {
  controlPanels: boolean;
  panelModel?: string;
  panelRoom?: string;
  panelMountType?: string;
  securitySensors: boolean;
  motionDetection?: boolean;
  smokeDetection?: boolean;
  securityFeatures?: string[];
  homeAutomation: boolean;
  automationFeatures?: string[];
  selectedDevices?: { name: string; category?: string }[];
}

export interface WallPanelsFormData {
  panelType: 'fluted' | 'hd-printing' | 'textured' | 'smooth';
  flutedGrooveDepth?: string;
  flutedSpacing?: string;
  hdPrintingPattern?: string;
  textureType?: string;
  finish: string;
  dimensions: {
    width: number;
    height: number;
    area: number;
  };
  installation: 'diy' | 'professional';
}

export interface CarbonRockBoardsFormData {
  boardType: 'acoustic' | 'mirror' | 'standard';
  acousticNrcRating?: string;
  acousticFabricColor?: string;
  mirrorTint?: string;
  thickness: string;
  dimensions: {
    width: number;
    height: number;
    area: number;
  };
  installation: 'diy' | 'professional';
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

