import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Menu, X, MapPin, Globe, Compass, Users, Info, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle'; // Import ThemeToggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center"> {/* Use Link */}
              <Globe className="h-8 w-auto text-teal-500" />
              <span className="ml-2 text-xl font-bold text-foreground">TripSage</span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            <NavItem to="/" icon={<Home className="h-4 w-4 mr-1" />}>
              Home
            </NavItem>
            <NavItem to="/destinations" icon={<Compass className="h-4 w-4 mr-1" />}>
              Destinations
            </NavItem>
            <NavItem to="/guides" icon={<MapPin className="h-4 w-4 mr-1" />}>
              Travel Guides
            </NavItem>
            <NavItem to="/about" icon={<Info className="h-4 w-4 mr-1" />}>
              About
            </NavItem>
            <NavItem to="/contact" icon={<Users className="h-4 w-4 mr-1" />}>
              Contact
            </NavItem>
          </div>

          <div className="flex items-center gap-2">
             <div className="hidden md:flex">
                <ThemeToggle />
             </div>
            <div className="md:hidden">
              <Button
                onClick={toggleMenu}
                variant="ghost"
                size="icon"
                className="inline-flex items-center justify-center rounded-md text-foreground/70 hover:text-foreground focus:outline-none"
                aria-label="Main menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn("md:hidden border-t border-border", isOpen ? "block animate-fade-in" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1 px-2">
           <MobileNavItem to="/" icon={<Home className="h-5 w-5 mr-2" />} onClick={toggleMenu}>
            Home
          </MobileNavItem>
          <MobileNavItem to="/destinations" icon={<Compass className="h-5 w-5 mr-2" />} onClick={toggleMenu}>
            Destinations
          </MobileNavItem>
          <MobileNavItem to="/guides" icon={<MapPin className="h-5 w-5 mr-2" />} onClick={toggleMenu}>
            Travel Guides
          </MobileNavItem>
          <MobileNavItem to="/about" icon={<Info className="h-5 w-5 mr-2" />} onClick={toggleMenu}>
            About
          </MobileNavItem>
          <MobileNavItem to="/contact" icon={<Users className="h-5 w-5 mr-2" />} onClick={toggleMenu}>
            Contact
          </MobileNavItem>
          <div className="pt-2 flex justify-end px-2">
             <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string; // Changed from href to 'to' for Link
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void; // Added onClick for mobile menu closure
}

const NavItem = ({ to, children, icon, onClick }: NavItemProps) => (
  <Link // Use Link
    to={to}
    onClick={onClick}
    className={cn(
      "text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center transition-colors",
      // Add active link styling (optional)
      // ({ isActive }) => isActive ? "bg-accent text-accent-foreground" : ""
    )}
  >
    {icon}
    {children}
  </Link>
);

const MobileNavItem = ({ to, children, icon, onClick }: NavItemProps) => (
  <Link // Use Link
    to={to}
    onClick={onClick}
    className="text-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-accent block px-3 py-3 text-base font-medium rounded-md flex items-center transition-colors"
  >
    {icon}
    {children}
  </Link>
);

export default Navbar;
