import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Globe, Twitter, Facebook, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border text-muted-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand and Social */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center group">
              <Globe className="h-6 w-6 text-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
              <span className="ml-2 text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">TripSage</span>
            </Link>
            <p className="text-sm">
              AI-powered travel planning that understands your preferences and creates personalized itineraries.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} href="#" aria-label="Twitter" />
              <SocialIcon icon={<Facebook size={18} />} href="#" aria-label="Facebook" />
              <SocialIcon icon={<Instagram size={18} />} href="#" aria-label="Instagram" />
              <SocialIcon icon={<Mail size={18} />} href="mailto:info@tripsage.dev" aria-label="Email" />
            </div>
          </div>

          {/* Column 2: Destinations */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Destinations
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/destinations">Europe</FooterLink> {/* Use Link */}
              <FooterLink to="/destinations">Asia</FooterLink> {/* Use Link */}
              <FooterLink to="/destinations">North America</FooterLink> {/* Use Link */}
              <FooterLink to="/destinations">South America</FooterLink> {/* Use Link */}
              <FooterLink to="/destinations">Africa</FooterLink> {/* Use Link */}
              <FooterLink to="/destinations">Oceania</FooterLink> {/* Use Link */}
            </ul>
          </div>

          {/* Column 3: Travel Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Travel Resources
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/guides">Travel Guides</FooterLink> {/* Use Link */}
              <FooterLink to="/guides">City Breaks</FooterLink> {/* Use Link */}
              <FooterLink to="/guides">Beach Destinations</FooterLink> {/* Use Link */}
              <FooterLink to="/guides">Adventure Travel</FooterLink> {/* Use Link */}
              <FooterLink to="/guides">Cultural Experiences</FooterLink> {/* Use Link */}
              <FooterLink to="/guides">Travel Tips</FooterLink> {/* Use Link */}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink> {/* Use Link */}
              {/* <FooterLink to="/team">Our Team</FooterLink> */}
              {/* <FooterLink to="/careers">Careers</FooterLink> */}
              <FooterLink to="/contact">Contact</FooterLink> {/* Use Link */}
              <FooterLink to="/privacy">Privacy Policy</FooterLink> {/* Example for external/future page */}
              <FooterLink to="/terms">Terms of Service</FooterLink> {/* Example for external/future page */}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} TripSage. All rights reserved.
          </p>
          <p className="text-xs mt-2 sm:mt-0 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-coral-500" /> by AI & Humans
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string; // Changed to 'to' for Link
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <li>
    {/* Check if it's an internal or external link */}
    {to.startsWith('/') ? (
      <Link to={to} className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
        {children}
      </Link>
    ) : (
      <a href={to} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
        {children}
      </a>
    )}
  </li>
);

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  'aria-label': string; // Add aria-label for accessibility
}

const SocialIcon = ({ href, icon, ...props }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
    {...props} // Pass aria-label
  >
    {icon}
  </a>
);

export default Footer;