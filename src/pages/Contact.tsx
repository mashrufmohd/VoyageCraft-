import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // Use Shadcn toast

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' }); // Reset form
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default", // or "success" if you add that variant
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 py-16 md:py-20 text-center">
            <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions, feedback, or partnership inquiries? We'd love to hear from you!
            </p>
            </div>
        </header>

      <main className="flex-grow container mx-auto px-4 py-16 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
             <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
             <p className="text-muted-foreground">
                Reach out to us through any of the following methods. We strive to respond within 24 business hours.
             </p>
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full">
                        <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400"/>
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Email</h3>
                        <a href="mailto:info@tripsage.dev" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">info@tripsage.dev</a>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="bg-coral-100 dark:bg-coral-900/50 p-3 rounded-full">
                        <Phone className="h-5 w-5 text-coral-600 dark:text-coral-400"/>
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Phone</h3>
                        <span className="text-muted-foreground">(+1) 555-TRIP-SGE</span> {/* Placeholder */}
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Address</h3>
                        <span className="text-muted-foreground">123 Wanderlust Way, Travel City, TC 98765</span> {/* Placeholder */}
                    </div>
                </div>
             </div>
          </div>

          {/* Contact Form Card */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-teal-500"
                 />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-teal-500"
                  />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                     <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2"/> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
