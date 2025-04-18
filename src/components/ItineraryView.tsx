
import React from 'react';
import { useItinerary } from '@/contexts/ItineraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, MapPin, Clock, DollarSign, UtensilsCrossed } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/helpers';
import WeatherForecast from './WeatherForecast';
import ItineraryMap from './ItineraryMap';

const ItineraryView: React.FC = () => {
  const { itinerary } = useItinerary();
  
  if (!itinerary) {
    return <div>No itinerary found</div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold">{itinerary.destination}</h1>
          <p className="text-gray-500">
            {formatDate(itinerary.days[0]?.date)} - {formatDate(itinerary.days[itinerary.days.length - 1]?.date)}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
            {itinerary.days.length} days
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm capitalize">
            {itinerary.budget}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
            </TabsList>
            <TabsContent value="itinerary" className="space-y-6">
              {itinerary.days.map((day) => (
                <Card key={day.day} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>Day {day.day} - {formatDate(day.date)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Activities */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Activities</h3>
                        <div className="space-y-3">
                          {day.activities.map((activity) => (
                            <div key={activity.id} className="flex bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                              <div className="flex-grow">
                                <h4 className="font-medium">{activity.name}</h4>
                                <p className="text-sm text-gray-500">{activity.description}</p>
                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{activity.startTime} - {activity.endTime}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{activity.location.name}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    <span>${activity.cost}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Meals */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Meals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {day.meals.map((meal) => (
                            <div key={meal.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                              <div className="flex items-center mb-2">
                                <UtensilsCrossed className="h-4 w-4 text-amber-500 mr-2" />
                                <h4 className="font-medium">{meal.name}</h4>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {meal.cuisine} cuisine
                              </p>
                              <div className="text-sm text-gray-600">
                                <div className="flex items-center mb-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{meal.time}</span>
                                </div>
                                <div className="flex items-center mb-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{meal.location.name}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  <span>${meal.cost}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="accommodation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{itinerary.days[0]?.accommodation.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{itinerary.days[0]?.accommodation.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{itinerary.days[0]?.accommodation.location.address}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            <span>${itinerary.days[0]?.accommodation.cost} per night</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            <span>{itinerary.days.length} nights</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {itinerary.days[0]?.accommodation.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <WeatherForecast forecast={itinerary.weatherForecast} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[300px] rounded-md overflow-hidden">
                <ItineraryMap itinerary={itinerary} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;
