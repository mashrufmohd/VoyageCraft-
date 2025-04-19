// =================================================
// FILE: src/contexts/ItineraryContext.tsx (UPDATED for Backend Call)
// =================================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Itinerary, TravelPreferences, FormStep } from '@/types';
// You can remove the dummy generator import if it's no longer needed elsewhere
// import { generateDummyItinerary } from '@/utils/helpers';

// Define the structure of the context
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
  generateItinerary: () => Promise<void>; // Function to trigger generation
  error: string | null; // Add state to hold potential errors
  setError: React.Dispatch<React.SetStateAction<string | null>>; // Function to set errors
}

// Default initial state for travel preferences
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

// Create the context
const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

// Create the provider component
export const ItineraryProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<TravelPreferences>(defaultPreferences);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>('destination');
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Function to reset the form and itinerary state
  const resetForm = () => {
    setPreferences(defaultPreferences);
    setItinerary(null);
    setCurrentStep('destination');
    setError(null); // Reset error on form reset
  };

  /**
   * Fetches the itinerary from the backend API.
   * Assumes a backend endpoint exists at `/api/generate-itinerary` (or similar)
   * that accepts preferences via POST and returns an Itinerary object.
   * The backend is responsible for securely handling the API key (e.g., Gemini).
   */
  const generateItinerary = async () => {
    setIsGenerating(true);
    setError(null); // Clear previous errors
    setItinerary(null); // Clear previous itinerary while generating

    // Basic validation before sending to backend
    if (!preferences.destination) {
        setError("Please enter a destination.");
        setIsGenerating(false);
        return;
    }
    if (!preferences.startDate || !preferences.endDate) {
      setError("Please select valid start and end dates.");
      setIsGenerating(false);
      return;
    }
     if (preferences.endDate < preferences.startDate) {
        setError("End date cannot be before start date.");
        setIsGenerating(false);
        return;
    }

    // Define the URL for your backend endpoint
    // Adjust if your backend runs on a different port/domain during development
    const backendUrl = '/api/generate-itinerary';

    try {
      // Make the POST request to your backend
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           // Add any other headers if needed (e.g., Authorization for user sessions)
        },
        // Send the current preferences state to the backend
        body: JSON.stringify({ preferences }),
      });

      // Check if the backend responded successfully
      if (!response.ok) {
        let errorMsg = `HTTP error ${response.status}: ${response.statusText}`;
        try {
            // Try to get a more specific error message from the backend response body
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg; // Use backend error message if available
        } catch (parseError) {
            // Ignore if the error response wasn't valid JSON
            console.warn("Could not parse error response JSON.");
        }
        console.error('Backend error response:', response.status, errorMsg);
        throw new Error(errorMsg);
      }

      // Parse the itinerary data received from the backend
      const generatedItinerary: Itinerary = await response.json();

      // --- IMPORTANT: Convert Date Strings from JSON back to Date Objects ---
      // JSON cannot store Date objects directly, they are typically stringified.
      if (generatedItinerary) {
           generatedItinerary.createdAt = new Date(generatedItinerary.createdAt); // Assuming backend sends ISO string
           generatedItinerary.days = generatedItinerary.days.map(day => ({
               ...day,
               date: new Date(day.date), // Convert day date string
           }));
           if (generatedItinerary.weatherForecast) {
               generatedItinerary.weatherForecast = generatedItinerary.weatherForecast.map(wf => ({
                   ...wf,
                   date: new Date(wf.date), // Convert weather forecast date string
               }));
           }
           // Add similar conversions for any other date fields if necessary
      }
      // --- End Date Conversion ---

      // Update the state with the received itinerary
      setItinerary(generatedItinerary);

    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Update the error state to display feedback to the user
      setError(error instanceof Error ? error.message : 'An unknown error occurred while generating the itinerary.');
      setItinerary(null); // Ensure itinerary is cleared on error
    } finally {
      // Always stop the loading indicator
      setIsGenerating(false);
    }
  };

  // Provide the state and functions to consuming components
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
        error,       // Expose error state
        setError     // Expose error setter (might be useful for clearing manually)
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};