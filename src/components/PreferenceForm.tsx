
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { 
  CalendarIcon, 
  ArrowRight, 
  ArrowLeft, 
  Map, 
  Clock, 
  Users, 
  Wallet, 
  Heart, 
  Building, 
  Car 
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  TravelPreferences, 
  FormStep, 
  Interest, 
  AccommodationType, 
  TransportationType 
} from '@/types';
import { useItinerary } from '@/contexts/ItineraryContext';
import { formatDate, formatBudget, formatInterests } from '@/utils/helpers';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

// Define interest options
const interestOptions: { value: Interest; label: string; icon: React.ReactNode }[] = [
  { value: 'nature', label: 'Nature & Outdoors', icon: <TreePine className="h-5 w-5" /> },
  { value: 'culture', label: 'Culture & Arts', icon: <Palette className="h-5 w-5" /> },
  { value: 'history', label: 'History & Heritage', icon: <Landmark className="h-5 w-5" /> },
  { value: 'food', label: 'Food & Cuisine', icon: <Utensils className="h-5 w-5" /> },
  { value: 'adventure', label: 'Adventure & Sports', icon: <Mountain className="h-5 w-5" /> },
  { value: 'relax', label: 'Relaxation & Wellness', icon: <Waves className="h-5 w-5" /> },
  { value: 'nightlife', label: 'Nightlife & Entertainment', icon: <Music className="h-5 w-5" /> },
  { value: 'shopping', label: 'Shopping & Markets', icon: <ShoppingBag className="h-5 w-5" /> },
];

// Define accommodation options
const accommodationOptions: { value: AccommodationType; label: string }[] = [
  { value: 'hotel', label: 'Hotels' },
  { value: 'hostel', label: 'Hostels' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'resort', label: 'Resorts' },
  { value: 'camping', label: 'Camping' },
];

// Define transportation options
const transportationOptions: { value: TransportationType; label: string }[] = [
  { value: 'walking', label: 'Walking' },
  { value: 'public', label: 'Public Transport' },
  { value: 'car', label: 'Rental Car' },
  { value: 'bike', label: 'Bicycle' },
  { value: 'taxi', label: 'Taxi/Rideshare' },
];

// Import available icons from lucide-react
import { 
  Utensils, 
  ShoppingBag, 
  Music, 
  Mountain, 
  Palette, 
  Landmark, 
  TreePine, 
  Waves,
  Info 
} from 'lucide-react';

const PreferenceForm = () => {
  const { 
    preferences, 
    setPreferences, 
    currentStep, 
    setCurrentStep,
    generateItinerary,
    isGenerating
  } = useItinerary();

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleNext = () => {
    const steps: FormStep[] = ['destination', 'dates', 'details', 'interests', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      // We are at the review step, generate itinerary
      generateItinerary();
    }
  };

  const handleBack = () => {
    const steps: FormStep[] = ['destination', 'dates', 'details', 'interests', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | null) => {
    setPreferences(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const isDateStepValid = () => {
    return preferences.startDate !== null && preferences.endDate !== null;
  };

  const isDestinationStepValid = () => {
    return preferences.destination.trim() !== '';
  };

  const updateInterests = (interest: Interest, checked: boolean) => {
    setPreferences(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, interest] };
      } else {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      }
    });
  };

  const updateAccommodation = (type: AccommodationType, checked: boolean) => {
    setPreferences(prev => {
      if (checked) {
        return { ...prev, accommodation: [...prev.accommodation, type] };
      } else {
        return { ...prev, accommodation: prev.accommodation.filter(a => a !== type) };
      }
    });
  };

  const updateTransportation = (type: TransportationType, checked: boolean) => {
    setPreferences(prev => {
      if (checked) {
        return { ...prev, transportation: [...prev.transportation, type] };
      } else {
        return { ...prev, transportation: prev.transportation.filter(t => t !== type) };
      }
    });
  };

  const renderStepIndicator = () => {
    const steps: {step: FormStep; label: string}[] = [
      { step: 'destination', label: 'Destination' },
      { step: 'dates', label: 'Dates' },
      { step: 'details', label: 'Details' },
      { step: 'interests', label: 'Interests' },
      { step: 'review', label: 'Review' }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <div 
              key={step.step} 
              className="flex flex-col items-center"
            >
              <div 
                className={cn(
                  "rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium border z-10",
                  currentStep === step.step 
                    ? "bg-teal-500 text-white border-teal-500" 
                    : steps.indexOf(currentStep) > index
                      ? "bg-teal-100 text-teal-700 border-teal-200"
                      : "bg-white text-gray-400 border-gray-200"
                )}
              >
                {index + 1}
              </div>
              <span 
                className={cn(
                  "text-xs mt-1 hidden sm:block",
                  currentStep === step.step 
                    ? "text-teal-600 font-medium" 
                    : steps.indexOf(currentStep) > index
                      ? "text-teal-500"
                      : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
          
          {/* Progress line */}
          <div className="absolute top-4 h-[1px] w-full bg-gray-200 -z-0">
            <div 
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ 
                width: `${Math.max(0, (steps.findIndex(s => s.step === currentStep)) / (steps.length - 1) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderDestinationStep = () => (
    <form onSubmit={handleDestinationSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-base font-medium">
            Where would you like to travel?
          </Label>
          <Input
            id="destination"
            placeholder="e.g. Paris, Tokyo, New York..."
            value={preferences.destination}
            onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
            className="w-full text-lg py-6"
            required
          />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={!isDestinationStepValid()}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );

  const renderDatesStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">
          When are you planning to travel?
        </Label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !preferences.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferences.startDate ? (
                    format(preferences.startDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={preferences.startDate || undefined}
                  onSelect={(date) => handleDateChange('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !preferences.endDate && "text-muted-foreground"
                  )}
                  disabled={!preferences.startDate}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferences.endDate ? (
                    format(preferences.endDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={preferences.endDate || undefined}
                  onSelect={(date) => handleDateChange('endDate', date)}
                  disabled={
                    (date) => !preferences.startDate || date < preferences.startDate
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600 text-white"
          disabled={!isDateStepValid()}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">
            <Wallet className="h-4 w-4 inline mr-2" />
            What's your budget?
          </Label>
          <RadioGroup
            value={preferences.budget}
            onValueChange={(value) => setPreferences({...preferences, budget: value as any})}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div>
              <RadioGroupItem value="budget" id="budget" className="peer sr-only" />
              <Label
                htmlFor="budget"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <span>Budget</span>
                <span className="text-sm text-muted-foreground">Save money</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="moderate" id="moderate" className="peer sr-only" />
              <Label
                htmlFor="moderate"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <span>Moderate</span>
                <span className="text-sm text-muted-foreground">Mid-range</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="luxury" id="luxury" className="peer sr-only" />
              <Label
                htmlFor="luxury"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <span>Luxury</span>
                <span className="text-sm text-muted-foreground">Premium experience</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="travelers" className="text-base font-medium">
            <Users className="h-4 w-4 inline mr-2" />
            Number of travelers
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, '5+'].map((num, index) => (
              <Button
                key={index}
                type="button"
                variant={preferences.travelers === (typeof num === 'string' ? 5 : num) ? 'default' : 'outline'}
                className={preferences.travelers === (typeof num === 'string' ? 5 : num) ? 'bg-teal-500 hover:bg-teal-600' : ''}
                onClick={() => setPreferences({...preferences, travelers: typeof num === 'string' ? 5 : num})}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderInterestsStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base font-medium">
            <Heart className="h-4 w-4 inline mr-2" />
            What are your interests?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interestOptions.map((interest) => (
              <label
                key={interest.value}
                className={cn(
                  "flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors",
                  preferences.interests.includes(interest.value) && "border-teal-500 bg-teal-50"
                )}
              >
                <Checkbox
                  checked={preferences.interests.includes(interest.value)}
                  onCheckedChange={(checked) => 
                    updateInterests(interest.value, checked as boolean)
                  }
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <div className="flex items-center space-x-2 leading-none">
                  {interest.icon}
                  <span>{interest.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label className="text-base font-medium">
            <Building className="h-4 w-4 inline mr-2" />
            Preferred accommodation
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {accommodationOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors",
                  preferences.accommodation.includes(option.value) && "border-teal-500 bg-teal-50"
                )}
              >
                <Checkbox
                  checked={preferences.accommodation.includes(option.value)}
                  onCheckedChange={(checked) => 
                    updateAccommodation(option.value, checked as boolean)
                  }
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label className="text-base font-medium">
            <Car className="h-4 w-4 inline mr-2" />
            Preferred transportation
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {transportationOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors",
                  preferences.transportation.includes(option.value) && "border-teal-500 bg-teal-50"
                )}
              >
                <Checkbox
                  checked={preferences.transportation.includes(option.value)}
                  onCheckedChange={(checked) => 
                    updateTransportation(option.value, checked as boolean)
                  }
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="additionalInfo" className="text-base font-medium">
            Any additional preferences or requirements?
          </Label>
          <Textarea
            id="additionalInfo"
            placeholder="E.g., accessibility needs, dietary requirements, specific activities you want included..."
            value={preferences.additionalInfo || ''}
            onChange={(e) => setPreferences({...preferences, additionalInfo: e.target.value})}
            className="min-h-20"
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-4">Review Your Trip Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Map className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Destination</p>
              <p className="text-sm text-gray-700">{preferences.destination}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Dates</p>
              <p className="text-sm text-gray-700">
                {formatDate(preferences.startDate)} - {formatDate(preferences.endDate)}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Users className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Travelers</p>
              <p className="text-sm text-gray-700">{preferences.travelers}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Wallet className="h-5 w-5 text-teal-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Budget</p>
              <p className="text-sm text-gray-700">{formatBudget(preferences.budget)}</p>
            </div>
          </div>
          
          {preferences.interests.length > 0 && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Heart className="h-5 w-5 text-teal-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Interests</p>
                <p className="text-sm text-gray-700">{formatInterests(preferences.interests)}</p>
              </div>
            </div>
          )}
          
          {preferences.accommodation.length > 0 && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Building className="h-5 w-5 text-teal-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Accommodation</p>
                <p className="text-sm text-gray-700">{preferences.accommodation.map(item => 
                  item.charAt(0).toUpperCase() + item.slice(1)
                ).join(', ')}</p>
              </div>
            </div>
          )}
          
          {preferences.transportation.length > 0 && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Car className="h-5 w-5 text-teal-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Transportation</p>
                <p className="text-sm text-gray-700">{preferences.transportation.map(item => 
                  item.charAt(0).toUpperCase() + item.slice(1)
                ).join(', ')}</p>
              </div>
            </div>
          )}
          
          {preferences.additionalInfo && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-teal-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Additional Information</p>
                <p className="text-sm text-gray-700">{preferences.additionalInfo}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600 text-white"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="animate-pulse">Generating Itinerary...</span>
            </>
          ) : (
            <>
              Generate Itinerary <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'destination':
        return renderDestinationStep();
      case 'dates':
        return renderDatesStep();
      case 'details':
        return renderDetailsStep();
      case 'interests':
        return renderInterestsStep();
      case 'review':
        return renderReviewStep();
      default:
        return renderDestinationStep();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {renderStepIndicator()}
        {renderCurrentStep()}
      </CardContent>
    </Card>
  );
};

export default PreferenceForm;
