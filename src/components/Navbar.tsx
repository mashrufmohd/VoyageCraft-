
import React, { useState } from 'react';
import { Menu, X, MapPin, Globe, Compass, Users, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <Globe className="h-8 w-auto text-teal-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">TripSage</span>
            </a>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NavItem href="/" icon={<Compass className="h-4 w-4 mr-1" />}>
              Destinations
            </NavItem>
            <NavItem href="/" icon={<MapPin className="h-4 w-4 mr-1" />}>
              Travel Guides
            </NavItem>
            <NavItem href="/" icon={<Info className="h-4 w-4 mr-1" />}>
              About
            </NavItem>
            <NavItem href="/" icon={<Users className="h-4 w-4 mr-1" />}>
              Contact
            </NavItem>
          </div>
          
          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
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

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavItem href="/" icon={<Compass className="h-5 w-5 mr-2" />}>
            Destinations
          </MobileNavItem>
          <MobileNavItem href="/" icon={<MapPin className="h-5 w-5 mr-2" />}>
            Travel Guides
          </MobileNavItem>
          <MobileNavItem href="/" icon={<Info className="h-5 w-5 mr-2" />}>
            About
          </MobileNavItem>
          <MobileNavItem href="/" icon={<Users className="h-5 w-5 mr-2" />}>
            Contact
          </MobileNavItem>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const NavItem = ({ href, children, icon }: NavItemProps) => (
  <a
    href={href}
    className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center transition-colors"
  >
    {icon}
    {children}
  </a>
);

const MobileNavItem = ({ href, children, icon }: NavItemProps) => (
  <a
    href={href}
    className="text-gray-800 hover:text-teal-600 hover:bg-gray-50 block px-4 py-3 text-base font-medium rounded-md flex items-center transition-colors"
  >
    {icon}
    {children}
  </a>
);

export default Navbar;
