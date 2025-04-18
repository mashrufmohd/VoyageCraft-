
// User preference types
export interface TravelPreferences {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: Budget;
  travelers: number;
  interests: Interest[];
  accommodation: AccommodationType[];
  transportation: TransportationType[];
  additionalInfo?: string;
}

export type Budget = 'budget' | 'moderate' | 'luxury';
export type Interest = 'nature' | 'culture' | 'history' | 'food' | 'adventure' | 'relax' | 'nightlife' | 'shopping';
export type AccommodationType = 'hotel' | 'hostel' | 'apartment' | 'resort' | 'camping';
export type TransportationType = 'walking' | 'public' | 'car' | 'bike' | 'taxi';

// Itinerary types
export interface Itinerary {
  id: string;
  destination: string;
  days: ItineraryDay[];
  budget: Budget;
  createdAt: Date;
  weatherForecast?: WeatherForecast[];
}

export interface ItineraryDay {
  day: number;
  date: Date;
  activities: Activity[];
  accommodation: Accommodation | null;
  meals: Meal[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  startTime?: string;
  endTime?: string;
  location: Location;
  cost: number;
  category: Interest;
  imageUrl?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  location: Location;
  cost: number;
  type: AccommodationType;
  amenities: string[];
  imageUrl?: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  time: string;
  location: Location;
  cost: number;
  cuisine: string;
  imageUrl?: string;
}

export interface Location {
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

// Weather forecast types
export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

// Form state types
export type FormStep = 'destination' | 'dates' | 'details' | 'interests' | 'review';

export interface MapPoint {
  id: string;
  name: string;
  location: Location;
  type: 'activity' | 'accommodation' | 'meal';
  day: number;
}
