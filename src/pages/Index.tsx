import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PreferenceForm from '@/components/PreferenceForm';
import ItineraryView from '@/components/ItineraryView';
import { useItinerary } from '@/contexts/ItineraryContext'; // No need for ItineraryProvider here if it's in App.tsx
import { MapPin, Compass, Calendar, CreditCard, CheckCircle, Sun, Cloud, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added Card imports
import { Badge } from '@/components/ui/badge'; // Added Badge import

// IndexContent remains largely the same, but we get itinerary from context
const IndexContent = () => {
  const { itinerary, resetForm, setPreferences } = useItinerary();
  const [searchParams] = useSearchParams();
  const planSectionRef = React.useRef<HTMLDivElement>(null); // Ref for scrolling

  React.useEffect(() => {
    const destinationParam = searchParams.get('destination');
    if (destinationParam) {
      setPreferences(prev => ({ ...prev, destination: destinationParam }));
      // Scroll to the planning section
      planSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only run when searchParams change


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-grow">
        {!itinerary ? (
          <>
            <HeroSection />
            <FeaturesSection />
            {/* Planner Section */}
            <section id="plan" ref={planSectionRef} className="section-padding bg-gradient-to-b from-teal-50 to-background dark:from-teal-900/20 dark:to-background">
              <div className="container max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Plan Your Perfect Trip</h2>
                <p className="text-lg text-muted-foreground text-center mb-10">
                  Tell us your preferences, and let our AI craft your dream itinerary.
                </p>
                <PreferenceForm />
              </div>
            </section>
            <TestimonialsSection />
          </>
        ) : (
          <section className="section-padding container max-w-7xl mx-auto animate-fade-in">
             <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-foreground">Your Custom Itinerary</h2>
                <Button variant="outline" onClick={resetForm}>
                    Plan a New Trip
                </Button>
             </div>
            <ItineraryView />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

const HeroSection = () => {
  const scrollToPlan = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const planElement = document.getElementById('plan');
    planElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToHow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const howElement = document.getElementById('how-it-works');
    howElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-700 dark:to-cyan-800 text-white py-20 md:py-28">
       {/* Background elements (optional) */}
        <Sun className="absolute -top-10 -left-10 h-40 w-40 text-yellow-300/20 opacity-50 transform rotate-12" />
        <Cloud className="absolute bottom-5 right-5 h-32 w-32 text-white/20 opacity-60 transform -rotate-6" />
        <Wind className="absolute top-1/4 right-1/4 h-20 w-20 text-sky-200/20 opacity-40 transform rotate-45" />

      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">AI-Powered Travel Planning</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight shadow-sm">
          Your Journey, Intelligently Crafted
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-teal-50 font-light">
          Get hyper-personalized travel itineraries based on your unique preferences, budget, and interests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <a
            href="#plan"
            onClick={scrollToPlan}
            className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Plan Your Trip Now
          </a>
          <a
            href="#how-it-works"
            onClick={scrollToHow}
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-in-out backdrop-blur-sm"
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
      description: 'Uncover local treasures and experiences that typical tourists might miss.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-teal-500" />,
      title: 'Optimized Scheduling',
      description: 'Detailed daily schedules with timings for activities, meals, and rest.'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-teal-500" />,
      title: 'Budget-Conscious Planning',
      description: 'Tailor your trip to match your budget without compromising on experiences.'
    }
  ];

  return (
    <div id="how-it-works" className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          How TripSage Works
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Our AI-powered platform simplifies planning and creates the perfect itinerary for your next adventure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border text-center card-hover">
              <div className="mb-4 inline-block bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Steps Section */}
        <div className="bg-muted/50 border border-border rounded-xl p-6 md:p-10 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
            Generate your itinerary in 3 simple steps
          </h3>

          <div className="space-y-8">
            <Step
              number={1}
              title="Tell us about your trip"
              description="Enter your destination, travel dates, budget, and number of travelers."
            />
            <Step
              number={2}
              title="Share your preferences"
              description="Let us know what interests you - food, culture, adventure, relaxation, etc. Select preferred accommodation and transport styles."
            />
            <Step
              number={3}
              title="Get your personalized plan"
              description="Receive a detailed, day-by-day itinerary crafted by our AI, ready for your adventure."
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
    <div className="flex items-start sm:items-center gap-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-medium text-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};


const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "TripSage made planning our family vacation to Rome so easy! The personalized itinerary hit all our interests without overwhelming the kids. The map view was super helpful!",
      author: "Sarah J.",
      location: "Family trip to Rome"
    },
    {
      quote: "As a solo traveler, I was amazed at how well the AI understood my adventure preferences. Found amazing hiking spots in Costa Rica I wouldn't have discovered otherwise!",
      author: "Michael T.",
      location: "Adventure in Costa Rica"
    },
    {
      quote: "The budget-friendly options for our Tokyo trip were spot on. We got to experience the culture without breaking the bank. Loved the breakdown!",
      author: "Emma & David",
      location: "Budget tour of Tokyo"
    }
  ];

  const scrollToPlan = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const planElement = document.getElementById('plan');
    planElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="section-padding bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          What Our Travelers Say
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover how TripSage has transformed the travel planning experience for explorers like you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col card-hover">
              <div className="mb-4 text-coral-500">
                {/* SVG Quote Icon */}
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49999 18C7.27999 18 7.97999 17.82 8.59999 17.46C9.21999 17.1 9.67999 16.62 9.97999 16.02C10.28 15.42 10.43 14.76 10.43 14.04C10.43 13.32 10.27 12.66 9.95999 12.06C9.64999 11.46 9.17999 11.01 8.55999 10.71C7.93999 10.41 7.26999 10.26 6.54999 10.26C5.82999 10.26 5.16999 10.41 4.56999 10.71C3.96999 11.01 3.5 11.46 3.17 12.06C2.84 12.66 2.67 13.32 2.67 14.04C2.67 14.76 2.82 15.42 3.12 16.02C3.42 16.62 3.87 17.1 4.47 17.46C5.07 17.82 5.76999 18 6.49999 18ZM6.49999 15.39L6.89999 15.75C6.33999 16.27 6.04999 16.9 6.02999 17.64L6.02999 17.79H6.08999L6.49999 17.73V17.79H6.89999L6.49999 15.39ZM17.5 18C18.28 18 18.98 17.82 19.6 17.46C20.22 17.1 20.68 16.62 20.98 16.02C21.28 15.42 21.43 14.76 21.43 14.04C21.43 13.32 21.27 12.66 20.96 12.06C20.65 11.46 20.18 11.01 19.56 10.71C18.94 10.41 18.27 10.26 17.55 10.26C16.83 10.26 16.17 10.41 15.57 10.71C14.97 11.01 14.5 11.46 14.17 12.06C13.84 12.66 13.67 13.32 13.67 14.04C13.67 14.76 13.82 15.42 14.12 16.02C14.42 16.62 14.87 17.1 15.47 17.46C16.07 17.82 16.77 18 17.5 18ZM17.5 15.39L17.9 15.75C17.34 16.27 17.05 16.9 17.03 17.64L17.03 17.79H17.09L17.5 17.73V17.79H17.9L17.5 15.39Z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-5 text-base flex-grow italic">"{testimonial.quote}"</p>
              <div className="mt-auto pt-4 border-t border-border/50">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#plan"
            onClick={scrollToPlan}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 ease-in-out inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Start Planning Your Trip
          </a>
        </div>
      </div>
    </div>
  );
};

// Wrap the content with the ItineraryProvider in App.tsx
const Index = () => (
    <IndexContent />
);

export default Index;