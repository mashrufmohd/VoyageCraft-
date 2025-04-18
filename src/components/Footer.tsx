
import React from 'react';
import { Globe, Twitter, Facebook, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-teal-500" />
              <span className="ml-2 text-lg font-bold text-gray-900">TripSage</span>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered travel planning that understands your preferences and creates personalized itineraries.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Mail size={18} />} href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Destinations
            </h3>
            <ul className="space-y-2">
              <FooterLink href="#">Europe</FooterLink>
              <FooterLink href="#">Asia</FooterLink>
              <FooterLink href="#">North America</FooterLink>
              <FooterLink href="#">South America</FooterLink>
              <FooterLink href="#">Africa</FooterLink>
              <FooterLink href="#">Oceania</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Travel Resources
            </h3>
            <ul className="space-y-2">
              <FooterLink href="#">Travel Guides</FooterLink>
              <FooterLink href="#">City Breaks</FooterLink>
              <FooterLink href="#">Beach Destinations</FooterLink>
              <FooterLink href="#">Adventure Travel</FooterLink>
              <FooterLink href="#">Cultural Experiences</FooterLink>
              <FooterLink href="#">Travel Tips</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Our Team</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TripSage. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-1 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-coral-500" /> by AI
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <a href={href} className="text-gray-600 hover:text-teal-600 text-sm transition-colors">
      {children}
    </a>
  </li>
);

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
}

const SocialIcon = ({ href, icon }: SocialIconProps) => (
  <a 
    href={href} 
    className="text-gray-500 hover:text-teal-600 transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
