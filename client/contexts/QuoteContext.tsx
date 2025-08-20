import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ProductCategory, FormErrors, SmartWallsFormData, QuoteFormData } from '@/types/quote';

interface QuoteState {
  currentStep: number;
  totalSteps: number;
  formData: QuoteFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
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
  | { type: 'RESET_FORM' };

const initialState: QuoteState = {
  currentStep: 1,
  totalSteps: 3, // Will be updated based on product category
  formData: {
    contact: {
      fullName: '',
      email: '',
      phone: '',
      installationAddress: '',
      additionalNotes: '',
    },
    productCategory: 'smart-walls',
    smartWalls: { // Initialize smartWalls data structure with all required fields
      dimensions: {
        width: 0,
        height: 2.1,
        depth: '180mm',
        calculatedMaxWidth: 0,
      },
      selectedStyle: {
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
      // Add the new optional fields here, initialized to undefined or default values
      style: undefined, // Will be set by StepSmartWalls
      skippedAccessories: false,
      skippedSmartDevices: false,
    },
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
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
      if (!smartWalls?.dimensions?.width || smartWalls.dimensions.width <= 0) {
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
    formData: state.formData, // Expose formData directly
    updateSmartWallsFormData, // Expose the specific update function
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


