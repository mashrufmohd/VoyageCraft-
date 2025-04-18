// =================================================
// FILE: src/pages/About.tsx (UPDATED)
// =================================================
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe, BrainCircuit, Target, Users, Zap, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-teal-100 via-cyan-50 to-sky-100 dark:from-teal-900/30 dark:via-cyan-900/30 dark:to-sky-900/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 animate-fade-in">
          <Globe className="h-16 w-16 md:h-20 md:w-20 text-teal-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About TripSage</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your intelligent partner for crafting personalized and unforgettable travel experiences.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Mission Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center animate-fade-in animation-delay-200">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-foreground mb-5 flex items-center">
                <Target className="h-8 w-8 mr-3 text-coral-500 flex-shrink-0" />
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                At TripSage, our mission is to revolutionize travel planning by leveraging the power of artificial intelligence. We believe everyone deserves a perfectly tailored trip that aligns with their unique interests, budget, and travel style. We aim to eliminate the stress of planning and empower travelers to discover the world more deeply and personally.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYXZlbCUyMHBsYW5uaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80"
                alt="Planning a trip"
                className="rounded-lg shadow-lg w-full max-w-md object-cover aspect-[4/3]"
             />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center animate-fade-in animation-delay-400">
             <div className="order-1 flex justify-center">
               <img
                 src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWklMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80"
                 alt="AI technology brain"
                 className="rounded-lg shadow-lg w-full max-w-md object-cover aspect-[4/3]"
              />
            </div>
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-foreground mb-5 flex items-center">
                <BrainCircuit className="h-8 w-8 mr-3 text-teal-500 flex-shrink-0" />
                How It Works
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                TripSage uses advanced AI algorithms to analyze your preferences – destination, dates, budget, interests, accommodation style, and more. Our system then intelligently curates a personalized, day-by-day itinerary complete with activity suggestions, meal recommendations, and logistical details. We process vast amounts of travel data to find hidden gems and optimize your schedule for the best possible experience.
              </p>
            </div>
          </section>

          {/* Values Section */}
           <section className="text-center animate-fade-in animation-delay-600">
             <h2 className="text-3xl font-semibold text-foreground mb-10">Our Core Values</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
               <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                 <CardHeader className="items-center">
                   <Zap className="h-10 w-10 text-teal-500 mb-3"/>
                   <CardTitle className="text-xl">Personalization</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm">Crafting unique journeys tailored to individual desires.</p>
                 </CardContent>
               </Card>
               <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                 <CardHeader className="items-center">
                   <BrainCircuit className="h-10 w-10 text-coral-500 mb-3"/>
                   <CardTitle className="text-xl">Intelligence</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm">Using AI to provide smarter, more efficient travel plans.</p>
                 </CardContent>
               </Card>
               <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                 <CardHeader className="items-center">
                   <Leaf className="h-10 w-10 text-green-500 mb-3"/>
                   <CardTitle className="text-xl">Simplicity</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-sm">Making complex travel planning effortless and enjoyable.</p>
                 </CardContent>
               </Card>
             </div>
           </section>

          {/* Team/Vision Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center animate-fade-in animation-delay-800">
             <div className="order-2 md:order-1">
               <h2 className="text-3xl font-semibold text-foreground mb-5 flex items-center">
                 <Users className="h-8 w-8 mr-3 text-coral-500 flex-shrink-0" />
                 Who We Are & Our Vision
               </h2>
               <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
                TripSage was born from a shared passion for exploration and technology. We are a dedicated team of developers, designers, and avid travelers committed to making trip planning seamless and inspiring.
               </p>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Our vision is to continuously enhance TripSage by integrating real-time data, expanding our AI capabilities, and building a community of informed travelers. We aim to be the ultimate tool for discovering the world, one personalized itinerary at a time.
               </p>
             </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <img
                     src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMGNv&auto=format&fit=crop&w=600&q=80"
                     alt="Team collaborating"
                     className="rounded-lg shadow-lg w-full max-w-md object-cover aspect-[4/3]"
                 />
             </div>
           </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;