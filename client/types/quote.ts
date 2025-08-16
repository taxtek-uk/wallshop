// Types for the Quote Modal system
export type ProductCategory = 'smart-walls' | 'smart-devices' | 'wall-panels' | 'carbon-rock-boards';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  installationAddress: string;
  additionalNotes: string;
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
  lighting: boolean;
  lightingType?: string;
  colorControl?: boolean;
  additionalFeatures: string[];
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
}

export interface StepProps {
  data: any;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
  onValidate: () => boolean;
}

