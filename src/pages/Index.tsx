
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PreferenceForm from '@/components/PreferenceForm';
import ItineraryView from '@/components/ItineraryView';
import { ItineraryProvider, useItinerary } from '@/contexts/ItineraryContext';
import { MapPin, Compass, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const IndexContent = () => {
  const { itinerary } = useItinerary();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {!itinerary ? (
          <>
            <HeroSection />
            <FeaturesSection />
            <div className="container-padding max-w-7xl mx-auto py-12">
              <h2 className="text-2xl font-bold text-center mb-8">Start Planning Your Trip</h2>
              <PreferenceForm />
            </div>
            <TestimonialsSection />
          </>
        ) : (
          <div className="container-padding max-w-7xl mx-auto py-12">
            <ItineraryView />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16 md:py-24">
      <div className="container-padding max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
          Your AI Travel Planner
        </h1>
        <p className="text-xl md:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto text-teal-50">
          Get personalized travel itineraries based on your preferences, budget, and interests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <a 
            href="#plan" 
            className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
          >
            Plan Your Trip
          </a>
          <a 
            href="#how-it-works" 
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-teal-500" />,
      title: 'Customized Itineraries',
      description: 'Get personalized travel plans based on your unique preferences and interests.'
    },
    {
      icon: <Compass className="h-10 w-10 text-teal-500" />,
      title: 'Discover Hidden Gems',
      description: 'Uncover local treasures that typical tourists might miss.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-teal-500" />,
      title: 'Day-by-Day Planning',
      description: 'Detailed daily schedules with timings for activities, meals, and rest.'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-teal-500" />,
      title: 'Budget-Friendly Options',
      description: 'Tailor your trip to match your budget without compromising on experiences.'
    }
  ];
  
  return (
    <div id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          How TripSage Works
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our AI-powered platform creates the perfect itinerary for your next adventure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white border border-gray-100 rounded-xl p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Generate your itinerary in 3 simple steps
          </h3>
          
          <div className="space-y-6">
            <Step 
              number={1} 
              title="Tell us about your trip" 
              description="Enter your destination, travel dates, budget, and party size." 
            />
            <Step 
              number={2} 
              title="Share your preferences" 
              description="Let us know what interests you - food, culture, adventure, relaxation, etc." 
            />
            <Step 
              number={3} 
              title="Get your personalized itinerary" 
              description="Receive a detailed day-by-day plan tailored to your preferences." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="flex items-start lg:items-center">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "TripSage made planning our family vacation to Rome so easy! The personalized itinerary hit all our interests without overwhelming the kids.",
      author: "Sarah J.",
      location: "Family trip to Rome"
    },
    {
      quote: "As a solo traveler, I was amazed at how well the AI understood my adventure preferences. Found amazing hiking spots in Costa Rica I wouldn't have discovered otherwise!",
      author: "Michael T.",
      location: "Adventure in Costa Rica"
    },
    {
      quote: "The budget-friendly options for our Tokyo trip were spot on. We got to experience the culture without breaking the bank.",
      author: "Emma & David",
      location: "Budget tour of Tokyo"
    }
  ];
  
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover how TripSage has transformed the travel planning experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4 text-coral-500">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.667 13.333H5.33366C5.33366 8.88 8.88033 5.333 13.3337 5.333V8C10.387 8 8.00033 10.387 8.00033 13.333H10.667C11.403 13.333 12 13.93 12 14.667V25.333C12 26.07 11.403 26.667 10.667 26.667H2.66699C1.93033 26.667 1.33366 26.07 1.33366 25.333V14.667C1.33366 13.93 1.93033 13.333 2.66699 13.333H5.33366H10.667ZM26.667 13.333H21.3337C21.3337 8.88 24.8803 5.333 29.3337 5.333V8C26.387 8 24.0003 10.387 24.0003 13.333H26.667C27.403 13.333 28.0003 13.93 28.0003 14.667V25.333C28.0003 26.07 27.403 26.667 26.667 26.667H18.667C17.9303 26.667 17.3337 26.07 17.3337 25.333V14.667C17.3337 13.93 17.9303 13.333 18.667 13.333H21.3337H26.667Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#plan" 
            id="plan"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Start Planning Your Trip
          </a>
        </div>
      </div>
    </div>
  );
};

// Wrap the content with the ItineraryProvider
const Index = () => (
  <ItineraryProvider>
    <IndexContent />
  </ItineraryProvider>
);

export default Index;
