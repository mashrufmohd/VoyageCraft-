import { 
  Itinerary, 
  TravelPreferences, 
  ItineraryDay, 
  Activity, 
  Accommodation, 
  Meal, 
  WeatherForecast,
  Interest,
  Location
} from '@/types';
import { format, addDays, differenceInDays } from 'date-fns';

// Format date to display format
export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'MMM dd, yyyy');
};

// Format time for display
export const formatTime = (time: string): string => {
  return time;
};

// Calculate trip duration in days
export const calculateTripDuration = (startDate: Date | null, endDate: Date | null): number => {
  if (!startDate || !endDate) return 0;
  return differenceInDays(endDate, startDate) + 1;
};

// Generate a string representation of a budget
export const formatBudget = (budget: string): string => {
  switch (budget) {
    case 'budget':
      return 'Budget-friendly';
    case 'moderate':
      return 'Mid-range';
    case 'luxury':
      return 'Luxury';
    default:
      return budget;
  }
};

// Format interests for display
export const formatInterests = (interests: Interest[]): string => {
  return interests.map(interest => 
    interest.charAt(0).toUpperCase() + interest.slice(1)
  ).join(', ');
};

// Generate a dummy weather forecast
export const generateDummyWeatherForecast = (
  startDate: Date | null, 
  days: number
): WeatherForecast[] => {
  if (!startDate) return [];
  
  const weatherConditions = [
    'Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorm', 'Clear'
  ];
  
  const weatherIcons = [
    'sun', 'cloud-sun', 'cloud', 'cloud-rain', 'cloud-lightning', 'moon'
  ];
  
  return Array.from({ length: days }).map((_, index) => {
    const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
    return {
      date: addDays(startDate, index),
      temperature: {
        min: Math.floor(Math.random() * 10) + 15,
        max: Math.floor(Math.random() * 10) + 25,
      },
      condition: weatherConditions[conditionIndex],
      icon: weatherIcons[conditionIndex],
      precipitation: Math.floor(Math.random() * 100),
      humidity: Math.floor(Math.random() * 50) + 30,
      windSpeed: Math.floor(Math.random() * 30),
    };
  });
};

// Generate random coordinates near a center point
export const generateNearbyCoordinates = (
  centerLat: number, 
  centerLng: number, 
  radiusKm: number = 5
): { latitude: number; longitude: number } => {
  // Earth's radius in kilometers
  const earthRadius = 6371;
  
  // Convert radius from kilometers to radians
  const radiusRadians = radiusKm / earthRadius;
  
  // Generate a random angle in radians
  const randomAngle = Math.random() * Math.PI * 2;
  
  // Generate a random distance within the radius
  const randomDistance = Math.random() * radiusRadians;
  
  // Convert center coordinates to radians
  const centerLatRadians = (centerLat * Math.PI) / 180;
  const centerLngRadians = (centerLng * Math.PI) / 180;
  
  // Calculate new latitude
  const newLatRadians = Math.asin(
    Math.sin(centerLatRadians) * Math.cos(randomDistance) +
    Math.cos(centerLatRadians) * Math.sin(randomDistance) * Math.cos(randomAngle)
  );
  
  // Calculate new longitude
  const newLngRadians = centerLngRadians + Math.atan2(
    Math.sin(randomAngle) * Math.sin(randomDistance) * Math.cos(centerLatRadians),
    Math.cos(randomDistance) - Math.sin(centerLatRadians) * Math.sin(newLatRadians)
  );
  
  // Convert back to degrees
  const newLat = (newLatRadians * 180) / Math.PI;
  const newLng = (newLngRadians * 180) / Math.PI;
  
  return { latitude: newLat, longitude: newLng };
};

// This is a dummy function to generate itineraries before connecting to an AI model
export const generateDummyItinerary = (preferences: TravelPreferences): Itinerary => {
  const { destination, startDate, endDate, budget, interests } = preferences;
  
  if (!startDate || !endDate) {
    throw new Error('Start and end dates are required');
  }
  
  // Generate some coordinates for the destination
  // In a real app, we would use geocoding APIs
  const destinationCoordinates: Record<string, { lat: number; lng: number }> = {
    'Paris': { lat: 48.8566, lng: 2.3522 },
    'Tokyo': { lat: 35.6762, lng: 139.6503 },
    'New York': { lat: 40.7128, lng: -74.0060 },
    'London': { lat: 51.5074, lng: -0.1278 },
    'Rome': { lat: 41.9028, lng: 12.4964 },
  };
  
  // Default coordinates if destination is not in our list
  const defaultCoords = { lat: 0, lng: 0 };
  const coords = destinationCoordinates[destination] || defaultCoords;
  
  // Generate days for the itinerary
  const durationDays = calculateTripDuration(startDate, endDate);
  
  // Generate activities based on interests
  const activityTypes: Record<Interest, string[]> = {
    'nature': [
      'Hiking in the local park',
      'Visit the botanical gardens',
      'Explore the nature reserve',
      'Take a river cruise',
      'Visit the local beach'
    ],
    'culture': [
      'Visit the art museum',
      'Attend a local festival',
      'Take a cultural workshop',
      'Visit the historical theater',
      'Explore the cultural district'
    ],
    'history': [
      'Tour the ancient castle',
      'Visit the historical museum',
      'Explore the old town district',
      'Take a historical walking tour',
      'Visit the archaeological site'
    ],
    'food': [
      'Food tour of local specialties',
      'Cooking class with local chef',
      'Visit the farmers market',
      'Wine tasting at local vineyard',
      'Visit a traditional restaurant'
    ],
    'adventure': [
      'Go zip-lining',
      'Try rock climbing',
      'Take a hot air balloon ride',
      'Go on a kayaking expedition',
      'Try paragliding'
    ],
    'relax': [
      'Day at the spa',
      'Yoga session in the park',
      'Relax at the beach',
      'Meditation retreat',
      'Take a leisurely boat ride'
    ],
    'nightlife': [
      'Visit a jazz club',
      'Tour the city\'s best bars',
      'Attend a local concert',
      'Experience the nightclub scene',
      'Evening harbor cruise'
    ],
    'shopping': [
      'Visit the local market',
      'Shop at the main shopping district',
      'Explore boutique shops',
      'Visit the antique district',
      'Check out local designer shops'
    ]
  };
  
  // Get activities for selected interests
  const selectedActivities: string[] = [];
  interests.forEach(interest => {
    const activities = activityTypes[interest] || [];
    selectedActivities.push(...activities);
  });
  
  // If no interests were selected, add some default activities
  if (selectedActivities.length === 0) {
    selectedActivities.push(
      'Explore the city center',
      'Visit the main square',
      'Check out local restaurants',
      'Take a walking tour',
      'Visit the main attractions'
    );
  }
  
  // Generate accommodation options based on budget
  const accommodationsByBudget: Record<string, string[]> = {
    'budget': ['Budget Hostel', 'Affordable Inn', 'Economic Hotel', 'Budget B&B', 'Youth Hostel'],
    'moderate': ['Comfort Inn', 'Mid-range Hotel', 'Boutique Hotel', 'Standard Apartment', 'Guest House'],
    'luxury': ['Grand Hotel', 'Luxury Resort', 'Five-Star Hotel', 'Exclusive Villa', 'Premium Apartment']
  };
  
  const accommodationOptions = accommodationsByBudget[budget] || accommodationsByBudget.moderate;
  
  // Generate restaurant options based on budget
  const restaurantsByBudget: Record<string, string[]> = {
    'budget': ['Local Food Stall', 'Street Food Market', 'Casual Eatery', 'Food Court', 'Budget Café'],
    'moderate': ['Bistro', 'Family Restaurant', 'Local Favorite', 'Trendy Café', 'Casual Dining'],
    'luxury': ['Fine Dining Restaurant', 'Michelin Star Restaurant', 'Gourmet Experience', 'Exclusive Chef\'s Table', 'Premium Steakhouse']
  };
  
  const restaurantOptions = restaurantsByBudget[budget] || restaurantsByBudget.moderate;
  
  // Generate cuisines
  const cuisines = [
    'Local', 'Italian', 'Asian Fusion', 'Mediterranean', 'French', 
    'Mexican', 'Japanese', 'Indian', 'American', 'Middle Eastern'
  ];
  
  // Shuffle and select a random accommodation
  const randomAccommodation = accommodationOptions[Math.floor(Math.random() * accommodationOptions.length)];
  
  const accommodationLocation = generateNearbyCoordinates(coords.lat, coords.lng, 1);
  
  // Create the accommodation object
  const accommodation: Accommodation = {
    id: `acc-${Date.now()}`,
    name: randomAccommodation,
    description: `A wonderful ${budget} accommodation in ${destination}`,
    location: {
      name: destination,
      address: `123 Main St, ${destination}`,
      latitude: accommodationLocation.latitude,
      longitude: accommodationLocation.longitude
    },
    cost: budget === 'budget' ? 50 : budget === 'moderate' ? 150 : 300,
    type: budget === 'budget' ? 'hostel' : budget === 'moderate' ? 'hotel' : 'resort',
    amenities: ['WiFi', 'Air Conditioning', 'TV', budget !== 'budget' ? 'Pool' : '', budget === 'luxury' ? 'Spa' : ''].filter(Boolean),
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
  };
  
  // Generate days for the itinerary
  const days: ItineraryDay[] = Array.from({ length: durationDays }).map((_, dayIndex) => {
    const date = addDays(startDate, dayIndex);
    
    // Generate 2-4 activities for the day
    const numActivities = Math.floor(Math.random() * 3) + 2;
    const dayActivities: Activity[] = Array.from({ length: numActivities }).map((_, actIndex) => {
      // Shuffle and select random activities for the day
      const activityName = selectedActivities[Math.floor(Math.random() * selectedActivities.length)];
      const activityLocation = generateNearbyCoordinates(coords.lat, coords.lng, 5);
      
      // Set start and end times
      const hours = [9, 11, 14, 16, 19];
      const startHour = hours[actIndex % hours.length];
      const endHour = startHour + 2;
      
      return {
        id: `act-${dayIndex}-${actIndex}`,
        name: activityName,
        description: `Enjoy this amazing activity in ${destination}`,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        location: {
          name: `${activityName} location`,
          address: `${Math.floor(Math.random() * 100) + 100} ${['Main St', 'Park Ave', 'Broadway', 'River Rd'][Math.floor(Math.random() * 4)]}, ${destination}`,
          latitude: activityLocation.latitude,
          longitude: activityLocation.longitude
        },
        cost: budget === 'budget' ? 
              Math.floor(Math.random() * 20) + 10 : 
              budget === 'moderate' ? 
              Math.floor(Math.random() * 50) + 30 : 
              Math.floor(Math.random() * 100) + 80,
        category: interests[Math.floor(Math.random() * interests.length)] || 'culture',
        imageUrl: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      };
    });
    
    // Generate 3 meals for the day
    const meals: Meal[] = ['Breakfast', 'Lunch', 'Dinner'].map((mealType, mealIndex) => {
      const restaurantName = restaurantOptions[Math.floor(Math.random() * restaurantOptions.length)];
      const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
      const mealLocation = generateNearbyCoordinates(coords.lat, coords.lng, 4);
      
      // Set meal times
      const mealTimes = ['8:00', '13:00', '19:00'];
      
      return {
        id: `meal-${dayIndex}-${mealIndex}`,
        name: `${mealType} at ${restaurantName}`,
        description: `Enjoy ${cuisine} cuisine for ${mealType.toLowerCase()}`,
        time: mealTimes[mealIndex],
        location: {
          name: restaurantName,
          address: `${Math.floor(Math.random() * 100) + 100} ${['Food St', 'Gourmet Ave', 'Cuisine Blvd', 'Eatery Ln'][Math.floor(Math.random() * 4)]}, ${destination}`,
          latitude: mealLocation.latitude,
          longitude: mealLocation.longitude
        },
        cost: budget === 'budget' ? 
              Math.floor(Math.random() * 15) + 5 : 
              budget === 'moderate' ? 
              Math.floor(Math.random() * 30) + 20 : 
              Math.floor(Math.random() * 80) + 50,
        cuisine,
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      };
    });
    
    return {
      day: dayIndex + 1,
      date,
      activities: dayActivities,
      accommodation,
      meals
    };
  });
  
  // Generate weather forecast for the trip
  const weatherForecast = generateDummyWeatherForecast(startDate, durationDays);
  
  return {
    id: `itin-${Date.now()}`,
    destination,
    days,
    budget: budget,
    createdAt: new Date(),
    weatherForecast
  };
};
