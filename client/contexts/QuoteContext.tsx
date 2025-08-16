import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuoteFormData, ProductCategory, FormErrors } from '@/types/quote';

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
        totalSteps: 3, // Contact + Product Category + Product Specific
      };
    
    case 'UPDATE_CONTACT':
      return {
        ...state,
        formData: {
          ...state.formData,
          contact: { ...state.formData.contact, ...action.payload },
        },
      };
    
    case 'UPDATE_PRODUCT_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.category]: action.payload.data,
        },
      };
    
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
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  const nextStep = () => {
    if (state.currentStep < state.totalSteps) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    }
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
      // Validate contact form
      const { contact } = state.formData;
      if (!contact.fullName.trim()) errors.fullName = 'Full name is required';
      if (!contact.email.trim()) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!contact.phone.trim()) errors.phone = 'Phone number is required';
      else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(contact.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    
    clearErrors();
    return true;
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

