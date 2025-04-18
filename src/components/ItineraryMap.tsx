
import React, { useEffect, useRef, useState } from 'react';
import { Itinerary, MapPoint } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Utensils, Bed } from 'lucide-react';

interface ItineraryMapProps {
  itinerary: Itinerary;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ itinerary }) => {
  // In a real app, we would use an actual map library (Google Maps, Mapbox, etc.)
  // For now, we'll create a simulated map UI
  
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  
  // Generate map points from itinerary
  useEffect(() => {
    const points: MapPoint[] = [];
    
    itinerary.days.forEach(day => {
      // Add activities
      day.activities.forEach(activity => {
        if (activity.location.latitude && activity.location.longitude) {
          points.push({
            id: activity.id,
            name: activity.name,
            location: activity.location,
            type: 'activity',
            day: day.day
          });
        }
      });
      
      // Add meals
      day.meals.forEach(meal => {
        if (meal.location.latitude && meal.location.longitude) {
          points.push({
            id: meal.id,
            name: meal.name,
            location: meal.location,
            type: 'meal',
            day: day.day
          });
        }
      });
      
      // Add accommodation
      if (day.accommodation && day.accommodation.location.latitude && day.accommodation.location.longitude) {
        points.push({
          id: day.accommodation.id,
          name: day.accommodation.name,
          location: day.accommodation.location,
          type: 'accommodation',
          day: day.day
        });
      }
    });
    
    setMapPoints(points);
  }, [itinerary]);
  
  const filteredPoints = selectedDay === 0 
    ? mapPoints 
    : mapPoints.filter(point => point.day === selectedDay);
  
  return (
    <div className="h-full relative">
      {/* This would be replaced with an actual map component */}
      <div className="w-full h-full bg-gray-100 relative">
        <div className="absolute inset-0 overflow-hidden">
          {/* Simulated map */}
          <div className="w-full h-full bg-[#EDF2F7] relative">
            {/* Simulate grid lines */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`col-${i}`} className="border-r border-gray-200"></div>
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`row-${i}`} className="border-b border-gray-200"></div>
              ))}
            </div>
            
            {/* Simulated map elements - in reality, these would be proper map markers */}
            {filteredPoints.map((point) => {
              // Generate x, y coordinates based on latitude/longitude
              const x = ((point.location.longitude || 0) + 180) / 360 * 100;
              const y = (90 - (point.location.latitude || 0)) / 180 * 100;
              
              return (
                <div 
                  key={point.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className={`
                    rounded-full p-2
                    ${point.type === 'activity' ? 'bg-teal-500' : 
                      point.type === 'meal' ? 'bg-coral-500' : 
                      'bg-blue-500'} 
                    text-white shadow-md hover:scale-110 transition-transform
                  `}>
                    {point.type === 'activity' ? (
                      <MapPin className="h-4 w-4" />
                    ) : point.type === 'meal' ? (
                      <Utensils className="h-4 w-4" />
                    ) : (
                      <Bed className="h-4 w-4" />
                    )}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
                    <Badge className="text-xs font-normal bg-white text-gray-900 border shadow-sm">
                      Day {point.day}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <Tabs 
            defaultValue="all" 
            className="bg-white rounded-md shadow-md"
            onValueChange={(value) => setSelectedDay(value === 'all' ? 0 : parseInt(value))}
          >
            <TabsList>
              <TabsTrigger value="all">All Days</TabsTrigger>
              {itinerary.days.map((day) => (
                <TabsTrigger key={day.day} value={day.day.toString()}>
                  Day {day.day}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="bg-white rounded-md shadow-md p-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Point details */}
        {selectedPoint && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-md shadow-md p-4 max-w-md mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium">
                  {selectedPoint.type === 'activity' ? (
                    <MapPin className="h-4 w-4 inline mr-1 text-teal-500" />
                  ) : selectedPoint.type === 'meal' ? (
                    <Utensils className="h-4 w-4 inline mr-1 text-coral-500" />
                  ) : (
                    <Bed className="h-4 w-4 inline mr-1 text-blue-500" />
                  )}
                  {selectedPoint.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPoint.location.address || selectedPoint.location.name}
                </p>
              </div>
              <Badge variant="outline">Day {selectedPoint.day}</Badge>
            </div>
            <div className="mt-3 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedPoint(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryMap;
