// =================================================
// FILE: src/components/ItineraryMap.tsx (Corrected)
// =================================================
import React, { useEffect, useRef, useState } from 'react';
import { Itinerary, MapPoint } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Removed TabsContent import as it's not used here
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Utensils, Bed, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ItineraryMapProps {
  itinerary: Itinerary;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ itinerary }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0 for all days
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const mapRef = useRef<HTMLDivElement>(null); // Ref for map container

  // Generate map points from itinerary
  useEffect(() => {
    const points: MapPoint[] = [];
    itinerary.days.forEach(day => {
      day.activities.forEach(activity => {
        if (activity.location.latitude != null && activity.location.longitude != null) { // Check for non-null/undefined explicitly
          points.push({ id: activity.id, name: activity.name, location: activity.location, type: 'activity', day: day.day });
        }
      });
      day.meals.forEach(meal => {
        if (meal.location.latitude != null && meal.location.longitude != null) { // Check for non-null/undefined explicitly
          points.push({ id: meal.id, name: meal.name, location: meal.location, type: 'meal', day: day.day });
        }
      });
      if (day.accommodation && day.accommodation.location.latitude != null && day.accommodation.location.longitude != null) { // Check for non-null/undefined explicitly
        // Add accommodation only once
        if (!points.some(p => p.type === 'accommodation' && p.id === day.accommodation?.id)) {
             points.push({ id: day.accommodation.id, name: day.accommodation.name, location: day.accommodation.location, type: 'accommodation', day: 1 }); // Assign to day 1
        }
      }
    });
    setMapPoints(points);
  }, [itinerary]);

  const filteredPoints = selectedDay === 0
    ? mapPoints
    : mapPoints.filter(point => point.day === selectedDay);

  // Function to calculate pseudo-random but stable position based on coordinates AND ID
  // **** FIX: Added `id` as a parameter ****
  const getPosition = (lat: number, lng: number, id: string): { left: string; top: string } => {
      // Simple hashing/scaling - replace with better projection if needed
      const x = ((lng + 180) % 360) / 360 * 100;
      const y = ((90 - lat) % 180) / 180 * 100;

      // Add small offsets based on ID to prevent perfect overlap
      // **** FIX: Use the `id` parameter passed into the function ****
      const idHash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const offsetX = (idHash % 10 - 5) * 0.1; // Small horizontal offset +/- 0.5%
      const offsetY = ((idHash * 3) % 10 - 5) * 0.1; // Small vertical offset +/- 0.5%

      return {
          left: `clamp(2%, ${x + offsetX}%, 98%)`, // Clamp within bounds
          top: `clamp(2%, ${y + offsetY}%, 98%)`,
      };
  };


  return (
    <div className="h-full w-full relative bg-muted/30">
      {/* This would be replaced with an actual map component */}
      <div ref={mapRef} className="w-full h-full relative overflow-hidden rounded-b-lg">
        {/* Simulated map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-emerald-50 to-teal-50 dark:from-blue-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
          {/* Optional: Add subtle grid lines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-30 dark:opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`col-${i}`} className="border-r border-border/50"></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`row-${i}`} className="border-b border-border/50"></div>
            ))}
          </div>
            {/* Placeholder text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-muted-foreground/50 text-sm italic">Simulated Map Area</span>
            </div>
        </div>

        {/* Map Markers */}
        {filteredPoints.map((point) => {
          // **** FIX: Pass `point.id` to the getPosition function ****
          const { left, top } = getPosition(point.location.latitude || 0, point.location.longitude || 0, point.id);

          return (
            <div
              key={point.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:z-10"
              style={{ left, top }}
              onClick={() => setSelectedPoint(point)}
              title={point.name}
            >
              <div
                className={cn(`
                  rounded-full p-1.5 shadow-md border-2 border-background
                  flex items-center justify-center
                  hover:scale-110 hover:shadow-lg transition-transform duration-200`,
                  point.type === 'activity' ? 'bg-teal-500 text-teal-50' :
                  point.type === 'meal' ? 'bg-coral-500 text-coral-50' :
                  'bg-blue-500 text-blue-50',
                  selectedPoint?.id === point.id ? 'scale-110 ring-2 ring-offset-1 ring-primary z-10' : ''
                )}
              >
                {point.type === 'activity' ? <MapPin className="h-4 w-4" /> :
                 point.type === 'meal' ? <Utensils className="h-4 w-4" /> :
                 <Bed className="h-4 w-4" />}
              </div>
               {/* Optional: Label below marker
               <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-[10px] bg-background/80 px-1 rounded whitespace-nowrap shadow-sm">{point.name}</span> */}
            </div>
          );
        })}

        {/* Map Controls - Top */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-center md:justify-start">
          <Tabs
            defaultValue="all"
            className="bg-background rounded-md shadow-md border border-border"
            onValueChange={(value) => setSelectedDay(value === 'all' ? 0 : parseInt(value))}
          >
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs px-2.5 h-7">All</TabsTrigger>
              {itinerary.days.map((day) => (
                <TabsTrigger key={day.day} value={day.day.toString()} className="text-xs px-2.5 h-7">
                  Day {day.day}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Simulated Navigation Control - Top Right */}
         <div className="absolute top-3 right-3 z-20 bg-background rounded-full shadow-md p-1 border border-border">
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full">
              <Navigation className="h-4 w-4 text-muted-foreground" />
            </Button>
         </div>

        {/* Point Details Popover - Bottom */}
        {selectedPoint && (
          // Added key to force re-render on point change for smoother animation
          <div key={selectedPoint.id} className="absolute bottom-3 left-3 right-3 z-20 max-w-sm mx-auto animate-slide-in-up">
             <div className="bg-background rounded-lg shadow-xl border border-border p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-grow min-w-0"> {/* Added min-w-0 for proper truncation */}
                    <h3 className="text-base font-medium text-foreground flex items-center gap-2 mb-1 truncate">
                      {selectedPoint.type === 'activity' ? <MapPin className="h-4 w-4 text-teal-500 flex-shrink-0" /> :
                       selectedPoint.type === 'meal' ? <Utensils className="h-4 w-4 text-coral-500 flex-shrink-0" /> :
                       <Bed className="h-4 w-4 text-blue-500 flex-shrink-0" />}
                      <span className="truncate">{selectedPoint.name}</span> {/* Added truncate */}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {selectedPoint.location.address || selectedPoint.location.name}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">Day {selectedPoint.day}</Badge>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPoint(null)}
                    className="h-7 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1"/> Close
                  </Button>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryMap;