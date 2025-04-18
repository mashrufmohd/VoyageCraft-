import React from 'react';
import { useItinerary } from '@/contexts/ItineraryContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, MapPin, Clock, DollarSign, Utensils, Bed, BarChart3, PieChart } from 'lucide-react'; // Added chart icons
import { formatDate } from '@/utils/helpers'; // Removed formatTime as it's simple
import WeatherForecast from './WeatherForecast';
import ItineraryMap from './ItineraryMap';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'; // Import Separator
import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea

// Placeholder Chart Components (Replace with actual implementation e.g., Recharts)
const PlaceholderBudgetChart = () => (
    <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
        <PieChart className="h-6 w-6 mr-2" /> Budget Breakdown Chart Placeholder
    </div>
);

const PlaceholderActivityChart = () => (
    <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
        <BarChart3 className="h-6 w-6 mr-2" /> Activity Type Distribution Chart Placeholder
    </div>
);


const ItineraryView: React.FC = () => {
  const { itinerary } = useItinerary();

  if (!itinerary) {
    // You might want a more specific loading or error state here
    return (
        <div className="text-center py-10 text-muted-foreground">
            No itinerary available. Please generate one first.
        </div>
    );
  }

  // Calculate total estimated cost
  const totalCost = itinerary.days.reduce((total, day) => {
    const dayActivityCost = day.activities.reduce((sum, act) => sum + act.cost, 0);
    const dayMealCost = day.meals.reduce((sum, meal) => sum + meal.cost, 0);
    const accommodationCost = day.accommodation?.cost || 0; // Assuming cost is per night
    // Adjust accommodation cost calculation if it's stored differently (e.g., total cost for the stay)
    return total + dayActivityCost + dayMealCost + (day.day === 1 ? accommodationCost * (itinerary.days.length) : 0); // Simple calculation, adjust as needed
  }, 0);


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start border-b border-border pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{itinerary.destination}</h1>
          <p className="text-lg text-muted-foreground flex items-center gap-2 mt-1">
             <CalendarDays className="h-5 w-5" />
            {formatDate(itinerary.days[0]?.date)} - {formatDate(itinerary.days[itinerary.days.length - 1]?.date)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="text-sm py-1 px-3">{itinerary.days.length} days</Badge>
          <Badge variant="secondary" className="capitalize text-sm py-1 px-3">{itinerary.budget}</Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
             Est. Cost: ${totalCost.toFixed(0)} {/* Display estimated cost */}
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Itinerary Details & Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger> {/* Added Overview Tab */}
            </TabsList>

            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="space-y-6">
              <ScrollArea className="h-[70vh] pr-4"> {/* Added ScrollArea */}
                <div className="space-y-6">
                    {itinerary.days.map((day) => (
                    <Card key={day.day} className="overflow-hidden border-border shadow-sm">
                        <CardHeader className="bg-muted/50 p-4 border-b border-border">
                        <CardTitle className="text-xl flex justify-between items-center font-semibold">
                            <span>Day {day.day}</span>
                            <span className="text-sm font-medium text-muted-foreground">{formatDate(day.date)}</span>
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 space-y-6">
                        {/* Activities */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center"><MapPin className="h-5 w-5 mr-2 text-teal-500" /> Activities</h3>
                            {day.activities.length > 0 ? (
                                <div className="space-y-4">
                                {day.activities.map((activity) => (
                                    <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors duration-150">
                                        {activity.imageUrl && (
                                            <img src={activity.imageUrl} alt={activity.name} className="h-16 w-16 rounded-md object-cover flex-shrink-0 hidden sm:block"/>
                                        )}
                                        <div className="flex-grow">
                                            <h4 className="font-medium text-foreground">{activity.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2">{activity.description}</p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground items-center">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                <span>{activity.startTime} - {activity.endTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                <span className="truncate max-w-[150px]">{activity.location.name}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="h-3 w-3 mr-1" />
                                                <span>${activity.cost}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs capitalize py-0 px-1.5 border-dashed">{activity.category}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground pl-4">No activities planned for today.</p>
                            )}
                        </div>

                        <Separator />

                        {/* Meals */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center"><Utensils className="h-5 w-5 mr-2 text-coral-500"/> Meals</h3>
                            {day.meals.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {day.meals.map((meal) => (
                                    <div key={meal.id} className="bg-background p-4 rounded-lg border border-border hover:shadow-sm transition-shadow">
                                    <div className="flex items-center mb-1">
                                        <h4 className="font-medium text-foreground text-sm line-clamp-1">{meal.name}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 capitalize">
                                        {meal.cuisine} cuisine
                                    </p>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1.5 flex-shrink-0" />
                                            <span>{meal.time}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" />
                                            <span className="truncate">{meal.location.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="h-3 w-3 mr-1.5 flex-shrink-0" />
                                            <span>${meal.cost}</span>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                                </div>
                             ) : (
                                <p className="text-sm text-muted-foreground pl-4">No specific meals planned.</p>
                             )}
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                 </div>
              </ScrollArea>
            </TabsContent>

            {/* Accommodation Tab */}
            <TabsContent value="accommodation">
                {itinerary.days[0]?.accommodation ? (
                    <Card className="border-border shadow-sm">
                        <CardHeader>
                        <CardTitle className="text-xl flex items-center">
                            <Bed className="h-6 w-6 mr-3 text-blue-500"/>
                            {itinerary.days[0].accommodation.name}
                        </CardTitle>
                        <CardDescription>Type: <Badge variant="outline" className="capitalize">{itinerary.days[0].accommodation.type}</Badge></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                         {itinerary.days[0].accommodation.imageUrl && (
                             <img src={itinerary.days[0].accommodation.imageUrl} alt={itinerary.days[0].accommodation.name} className="w-full h-64 object-cover rounded-lg mb-4"/>
                         )}
                        <p className="text-muted-foreground">{itinerary.days[0].accommodation.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <h4 className="font-medium mb-3 text-foreground">Details</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground/80" />
                                    <span>{itinerary.days[0].accommodation.location.address || itinerary.days[0].accommodation.location.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 flex-shrink-0 text-muted-foreground/80" />
                                    <span>${itinerary.days[0].accommodation.cost} per night (Est.)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 flex-shrink-0 text-muted-foreground/80" />
                                    <span>{itinerary.days.length} nights</span>
                                </div>
                            </div>
                            </div>
                            <div>
                            <h4 className="font-medium mb-3 text-foreground">Amenities</h4>
                            {itinerary.days[0].accommodation.amenities.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                {itinerary.days[0].accommodation.amenities.map((amenity, index) => (
                                    <Badge key={index} variant="secondary" className="font-normal">
                                    {amenity}
                                    </Badge>
                                ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No specific amenities listed.</p>
                            )}
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                ) : (
                     <Card className="border-border shadow-sm flex items-center justify-center h-40">
                        <p className="text-muted-foreground">No accommodation details available.</p>
                     </Card>
                )}
            </TabsContent>

             {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Trip Overview & Insights</CardTitle>
                         <CardDescription>Visual summary of your planned trip.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Budget Breakdown</h3>
                            <PlaceholderBudgetChart />
                            <p className="text-xs text-muted-foreground mt-2 text-center">Note: This is a placeholder. Actual chart requires data processing.</p>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-3 text-lg">Activity Focus</h3>
                            <PlaceholderActivityChart />
                             <p className="text-xs text-muted-foreground mt-2 text-center">Note: This is a placeholder. Actual chart requires data processing.</p>
                        </div>
                    </CardContent>
                 </Card>
            </TabsContent>

          </Tabs>
        </div>

        {/* Right Column: Map & Weather */}
        <div className="space-y-6 lg:sticky lg:top-20 self-start"> {/* Sticky positioning for map/weather */}
           <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="p-4 border-b border-border">
              <CardTitle className="text-lg flex items-center">
                 <MapPin className="h-5 w-5 mr-2 text-blue-500"/> Location Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Ensure map has a defined height */}
              <div className="h-[350px] w-full">
                <ItineraryMap itinerary={itinerary} />
              </div>
              <p className="text-xs text-muted-foreground p-3 text-center">Simulated map view. Real map integration needed.</p>
            </CardContent>
          </Card>
          <WeatherForecast forecast={itinerary.weatherForecast || []} />
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;
