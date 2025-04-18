
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Import Badge
import { BookOpen, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input

const guideTopics = [
  { title: 'Ultimate Guide to Backpacking Southeast Asia', excerpt: 'Everything you need to know for an unforgettable adventure.', category: 'Adventure', image: 'https://images.unsplash.com/photo-1503220718398-8a546943e78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { title: 'Exploring Europe by Train: A Complete Guide', excerpt: 'Discover the charm of Europe with scenic train journeys.', category: 'Culture', image: 'https://images.unsplash.com/photo-1474487548417-781cb79410b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXVyb3BlJTIwdHJhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80' },
  { title: 'Food Lover\'s Guide to Italy', excerpt: 'Indulge in the culinary delights of Italy, from pasta to gelato.', category: 'Food', image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGl0YWx5fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { title: 'Hiking the National Parks of the USA', excerpt: 'Explore the breathtaking landscapes of America\'s best national parks.', category: 'Nature', image: 'https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0aW9uYWwlMjBwYXJrfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { title: 'Budget Travel Tips for Savvy Explorers', excerpt: 'See the world without breaking the bank with these tips.', category: 'Tips', image: 'https://images.unsplash.com/photo-1506840880797-a343c63c47a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVkZ2V0JTIwdHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { title: 'Family Vacation Planning Made Easy', excerpt: 'Tips and tricks for planning a stress-free family getaway.', category: 'Family', image: 'https://images.unsplash.com/photo-1511539900710-c0f7a4a0f06e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFtaWx5JTIwdHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { title: 'Solo Travel Safety Guide', excerpt: 'Stay safe and confident while exploring the world on your own.', category: 'Tips', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sbyUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  { title: 'Digital Nomad Guide: Working While Traveling', excerpt: 'Learn how to balance work and travel effectively.', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1522199670076-2852f8c89bb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMG5vbWFkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
];

const TravelGuides = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredGuides = guideTopics.filter(guide =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* Header Section */}
       <header className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Travel Guides & Insights</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fuel your wanderlust with expert tips, destination deep dives, and inspiring stories.
          </p>
          <div className="max-w-xl mx-auto relative">
             <Input
              type="text"
              placeholder="Search guides (e.g., budget, Europe, family...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-6 text-base rounded-full border-border focus-visible:ring-coral-500"
            />
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Guides Grid */}
      <main className="flex-grow container mx-auto px-4 py-12 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center mb-10 text-foreground">
            {searchTerm ? `Results for "${searchTerm}"` : "Explore Our Guides"}
        </h2>

        {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
                <Card key={guide.title} className="overflow-hidden flex flex-col group card-hover">
                <div className="overflow-hidden rounded-t-lg">
                    <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                </div>
                <CardHeader className="pb-2">
                    <Badge variant="secondary" className="mb-2 w-fit bg-coral-100 dark:bg-coral-900/50 text-coral-800 dark:text-coral-200 border-coral-200 dark:border-coral-800">{guide.category}</Badge>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {guide.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{guide.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2 mt-auto">
                    {/* In a real app, this would link to the actual guide page */}
                    <Button variant="link" className="p-0 h-auto text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        ) : (
            <div className="text-center py-16 text-muted-foreground">
                <p>No guides found matching "{searchTerm}".</p>
                <p>Try searching for different keywords or categories.</p>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TravelGuides;