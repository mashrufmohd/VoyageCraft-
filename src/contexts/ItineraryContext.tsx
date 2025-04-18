
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Itinerary, TravelPreferences, FormStep } from '@/types';

interface ItineraryContextType {
  preferences: TravelPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TravelPreferences>>;
  itinerary: Itinerary | null;
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary | null>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: FormStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<FormStep>>;
  resetForm: () => void;
  generateItinerary: () => Promise<void>;
}

const defaultPreferences: TravelPreferences = {
  destination: '',
  startDate: null,
  endDate: null,
  budget: 'moderate',
  travelers: 1,
  interests: [],
  accommodation: [],
  transportation: [],
  additionalInfo: '',
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<TravelPreferences>(defaultPreferences);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>('destination');

  const resetForm = () => {
    setPreferences(defaultPreferences);
    setItinerary(null);
    setCurrentStep('destination');
  };

  // This is a placeholder function that would be replaced with actual AI integration
  const generateItinerary = async () => {
    try {
      setIsGenerating(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, this would be an API call to the AI service
      // For now, we'll just generate a dummy itinerary based on preferences
      // This function would be replaced with an actual API call
      
      const dummyItinerary = await import('@/utils/helpers').then(
        module => module.generateDummyItinerary(preferences)
      );
      
      setItinerary(dummyItinerary);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setIsGenerating(false);
    }
  };

  return (
    <ItineraryContext.Provider
      value={{
        preferences,
        setPreferences,
        itinerary,
        setItinerary,
        isGenerating,
        setIsGenerating,
        currentStep,
        setCurrentStep,
        resetForm,
        generateItinerary,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
