import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const popularDestinations = [
  { name: 'Paris, France', description: 'The city of lights, love, and art.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80' },
  { name: 'Tokyo, Japan', description: 'A vibrant mix of modern and traditional culture.', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80' },
  { name: 'Rome, Italy', description: 'Explore ancient history and delicious cuisine.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  { name: 'New York, USA', description: 'The city that never sleeps, full of iconic landmarks.', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  { name: 'Kyoto, Japan', description: 'Experience traditional Japanese culture and beauty.', image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lvdG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80' },
  { name: 'Barcelona, Spain', description: 'Unique architecture, vibrant street life, and beaches.', image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { name: 'London, UK', description: 'A global hub of history, finance, and culture.', image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9uZG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80' },
  { name: 'Bali, Indonesia', description: 'Island paradise known for forests, beaches, and spirituality.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80' },
];

const Destinations = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredDestinations = popularDestinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* Header Section */}
      <header className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Your Next Destination</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore breathtaking locations around the world and get inspired for your next journey.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search destinations (e.g., Paris, beach, adventure...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-6 text-base rounded-full border-border focus-visible:ring-teal-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Destinations Grid */}
      <main className="flex-grow container mx-auto px-4 py-12 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center mb-10 text-foreground">
          {searchTerm ? `Results for "${searchTerm}"` : "Popular Destinations"}
        </h2>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <Card key={dest.name} className="overflow-hidden group card-hover flex flex-col">
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                 />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-teal-500 flex-shrink-0" />
                    {dest.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-4">
                  <p className="text-muted-foreground text-sm">{dest.description}</p>
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                   <Link to={`/?destination=${encodeURIComponent(dest.name.split(',')[0])}`}>
                    <Button variant="outline" size="sm" className="w-full hover:bg-teal-50 dark:hover:bg-teal-900/50 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-300">
                        Plan a Trip Here
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No destinations found matching "{searchTerm}".</p>
            <p>Try searching for a city, country, or type of trip.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
