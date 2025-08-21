import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  ProductCategory, 
  FormErrors, 
  SmartWallsFormData, 
  QuoteFormData,
  QuoteStep,
  QuoteContextState,
  WallDimensionsMm,
  SelectedStyle,
  SmartDevices
} from '@/types/quote';

interface QuoteState {
  currentStep: number;
  totalSteps: number;
  formData: QuoteFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  // New strict state for SmartWalls
  smartWallsStep: QuoteStep;
  smartWallsData: SmartWallsFormData;
}

type QuoteAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_PRODUCT_CATEGORY'; payload: ProductCategory }
  | { type: 'UPDATE_CONTACT'; payload: Partial<QuoteFormData['contact']> }
  | { type: 'UPDATE_PRODUCT_DATA'; payload: { category: ProductCategory; data: any } }
  | { type: 'SET_ERRORS'; payload: FormErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMITTED'; payload: boolean }
  | { type: 'RESET_FORM' }
  // New actions for strict SmartWalls typing
  | { type: 'SET_SMARTWALLS_STEP'; payload: QuoteStep }
  | { type: 'UPDATE_DIMENSIONS'; payload: Partial<WallDimensionsMm> }
  | { type: 'UPDATE_STYLE'; payload: Partial<SelectedStyle> }
  | { type: 'TOGGLE_DEVICE'; payload: keyof SmartDevices };

const initialSmartWallsData: SmartWallsFormData = {
  dimensions: {
    widthMm: null,
    heightMm: null,
  },
  selectedStyle: {
    category: null,
    styleId: null,
  },
  devices: {
    tv: false,
    fireplace: false,
    soundbar: false,
    shelving: false,
  },
  // Legacy compatibility fields
  legacyDimensions: {
    width: 0,
    height: 2.1,
    depth: '180mm',
    calculatedMaxWidth: 0,
  },
  legacySelectedStyle: {
    category: '',
    categoryId: '',
    finish: '',
    finishId: '',
    finishImage: '',
    finishDescription: '',
  },
  accessories: {
    tv: false,
    fireplace: false,
    soundbar: false,
    shelving: false,
  },
  smartDevices: {
    selectedDevices: [],
    controlPanels: false,
    securitySensors: false,
    homeAutomation: false,
  },
  gamingSystem: {
    type: null,
  },
  tvIntegration: false,
  speakers: false,
  lighting: false,
  additionalFeatures: [],
  style: undefined,
  skippedAccessories: false,
  skippedSmartDevices: false,
};

const initialState: QuoteState = {
  currentStep: 1,
  totalSteps: 3,
  formData: {
    contact: {
      fullName: '',
      email: '',
      phone: '',
      installationAddress: '',
      additionalNotes: '',
    },
    productCategory: 'smart-walls',
    smartWalls: initialSmartWallsData,
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  smartWallsStep: 'dimensions',
  smartWallsData: initialSmartWallsData,
};

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'SET_PRODUCT_CATEGORY':
      return {
        ...state,
        formData: {
          ...state.formData,
          productCategory: action.payload,
        },
        totalSteps: action.payload === 'smart-walls' ? 3 : 2,
      };
    
    case 'UPDATE_CONTACT':
      return {
        ...state,
        formData: {
          ...state.formData,
          contact: { ...state.formData.contact, ...action.payload },
        },
      };
    
    case 'UPDATE_PRODUCT_DATA': {
      const categoryKeyMap: Record<ProductCategory, keyof QuoteFormData> = {
        'smart-walls': 'smartWalls',
        'smart-devices': 'smartDevices',
        'wall-panels': 'wallPanels',
        'carbon-rock-boards': 'carbonRockBoards',
      };
      const key = categoryKeyMap[action.payload.category];
      return {
        ...state,
        formData: {
          ...state.formData,
          [key]: action.payload.data,
        },
      };
    }
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    
    case 'SET_SUBMITTED':
      return { ...state, isSubmitted: action.payload };
    
    case 'RESET_FORM':
      return initialState;

    // New strict SmartWalls actions
    case 'SET_SMARTWALLS_STEP':
      return { ...state, smartWallsStep: action.payload };

    case 'UPDATE_DIMENSIONS':
      return {
        ...state,
        smartWallsData: {
          ...state.smartWallsData,
          dimensions: { ...state.smartWallsData.dimensions, ...action.payload },
        },
      };

    case 'UPDATE_STYLE':
      return {
        ...state,
        smartWallsData: {
          ...state.smartWallsData,
          selectedStyle: { ...state.smartWallsData.selectedStyle, ...action.payload },
        },
      };

    case 'TOGGLE_DEVICE':
      return {
        ...state,
        smartWallsData: {
          ...state.smartWallsData,
          devices: {
            ...state.smartWallsData.devices,
            [action.payload]: !state.smartWallsData.devices[action.payload],
          },
        },
      };
    
    default:
      return state;
  }
}

interface QuoteContextType {
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
  nextStep: () => void;
  prevStep: () => void;
  updateContact: (data: Partial<QuoteFormData['contact']>) => void;
  updateProductData: (category: ProductCategory, data: any) => void;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
  validateCurrentStep: () => boolean;
  // Expose formData and a specific update function for smartWalls
  formData: QuoteFormData;
  updateSmartWallsFormData: (data: Partial<SmartWallsFormData>) => void;
  // New strict SmartWalls context API
  smartWallsContext: QuoteContextState;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  const nextStep = () => {
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  };

  const updateContact = (data: Partial<QuoteFormData['contact']>) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: data });
  };

  const updateProductData = (category: ProductCategory, data: any) => {
    dispatch({ type: 'UPDATE_PRODUCT_DATA', payload: { category, data } });
  };

  const setErrors = (errors: FormErrors) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const validateCurrentStep = (): boolean => {
    const errors: FormErrors = {};
    
    if (state.currentStep === 1) {
      const { contact } = state.formData;
      if (!contact.fullName.trim()) errors.fullName = 'Full name is required';
      if (!contact.email.trim()) errors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!contact.phone.trim()) errors.phone = 'Phone number is required';
      else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(contact.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    } else if (state.currentStep === 2 && state.formData.productCategory === 'smart-walls') {
      const smartWalls = state.formData.smartWalls;
      if (!smartWalls?.legacyDimensions?.width || smartWalls.legacyDimensions.width <= 0) {
        errors.smartWalls_dimensions_width = 'Wall width is required and must be greater than 0';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    
    clearErrors();
    return true;
  };

  // Specific update function for smartWalls data
  const updateSmartWallsFormData = (data: Partial<SmartWallsFormData>) => {
    dispatch({
      type: 'UPDATE_PRODUCT_DATA',
      payload: {
        category: 'smart-walls',
        data: { ...state.formData.smartWalls, ...data },
      },
    });
  };

  // Strict SmartWalls context implementation
  const smartWallsContext: QuoteContextState = {
    currentStep: state.smartWallsStep,
    data: state.smartWallsData,
    setStep: (step: QuoteStep) => {
      dispatch({ type: 'SET_SMARTWALLS_STEP', payload: step });
    },
    updateDimensions: (patch: Partial<WallDimensionsMm>) => {
      dispatch({ type: 'UPDATE_DIMENSIONS', payload: patch });
    },
    updateStyle: (patch: Partial<SelectedStyle>) => {
      dispatch({ type: 'UPDATE_STYLE', payload: patch });
    },
    toggleDevice: (key: keyof SmartDevices) => {
      dispatch({ type: 'TOGGLE_DEVICE', payload: key });
    },
  };

  const contextValue: QuoteContextType = {
    state,
    dispatch,
    nextStep,
    prevStep,
    updateContact,
    updateProductData,
    setErrors,
    clearErrors,
    validateCurrentStep,
    formData: state.formData,
    updateSmartWallsFormData,
    smartWallsContext,
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}

// New hook for strict SmartWalls context
export function useSmartWallsQuote(): QuoteContextState {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useSmartWallsQuote must be used within a QuoteProvider');
  }
  return context.smartWallsContext;
}

