import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, PhoneCall, MessageSquare, Send, 
  Facebook as FacebookIcon, Twitter as XIcon, Instagram as InstagramIcon, Github as GithubIcon
} from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-purple/10 to-book-orange/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-book-darkText mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              We're here to help! Reach out to us with any questions, feedback, or inquiries.
            </p>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-2xl font-bold text-book-darkText mb-4">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        className="shadow-sm focus:ring-book-purple focus:border-book-purple block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                    <div className="mt-1">
                      <Input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        className="shadow-sm focus:ring-book-purple focus:border-book-purple block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        id="subject"
                        placeholder="Subject"
                        className="shadow-sm focus:ring-book-purple focus:border-book-purple block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                    <div className="mt-1">
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Your Message"
                        className="shadow-sm focus:ring-book-purple focus:border-book-purple block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-book-purple hover:bg-book-purple/90 text-white">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="mt-12 md:mt-0">
                <h2 className="text-2xl font-bold text-book-darkText mb-4">Contact Information</h2>
                <p className="text-slate-600 mb-6">
                  Feel free to reach out to us through the contact form or using the information below.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail size={20} className="text-book-orange mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-book-darkText">Email</h3>
                      <p className="text-slate-600">kabilanmurugesan2004@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PhoneCall size={20} className="text-book-orange mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-book-darkText">Phone</h3>
                      <p className="text-slate-600">Currently not available</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare size={20} className="text-book-orange mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-book-darkText">Social Media</h3>
                      <div className="flex space-x-4 mt-2">
                        <Link to="https://www.facebook.com/profile.php?id=61574131919351" className="text-slate-400 hover:text-book-purple transition-colors" aria-label="Facebook">
                          <FacebookIcon size={20} />
                        </Link>
                        <Link to="https://x.com/_fan_boi_lm10_" className="text-slate-400 hover:text-book-purple transition-colors" aria-label="X">
                          <XIcon size={20} />
                        </Link>
                        <Link to="https://www.instagram.com/@_fan_boi_lm10_" className="text-slate-400 hover:text-book-purple transition-colors" aria-label="Instagram">
                          <InstagramIcon size={20} />
                        </Link>
                        <Link to="https://www.github.com/MurugesanYT" className="text-slate-400 hover:text-book-purple transition-colors" aria-label="Github">
                          <GithubIcon size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-book-purple to-book-orange text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Book Journey?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Join thousands of authors who have already discovered the power of AI-assisted book creation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild
                className="bg-white text-book-purple hover:bg-white/90 px-8 py-6 text-lg"
              >
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default ContactPage;
