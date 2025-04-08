
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle, Star, Clock, Download, Settings } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "Intuitive book creation"
  },
  {
    icon: <Star size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "Professional templates"
  },
  {
    icon: <Settings size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "AI assistance"
  },
  {
    icon: <Download size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "Export in multiple formats"
  },
  {
    icon: <Clock size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "No writing experience required"
  },
  {
    icon: <Star size={20} className="text-white mr-2 flex-shrink-0" />,
    text: "Free tier available"
  }
];

const CTASection = () => {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-book-purple to-book-lightPurple opacity-90 z-0"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] rotate-45"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
              <Star size={16} className="mr-2" />
              <span>Created by a solo developer</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Create Your Own Book?
            </h2>
            
            <p className="text-lg text-white/90 mb-8">
              Join users who are turning their ideas into beautiful books. 
              Start creating today with this AI-powered platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center group">
                  <div className="transform group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-white">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button className="bg-white text-book-purple hover:bg-white/90 text-base font-medium h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Get Started Free
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-base font-medium h-12 px-8 group">
                  <BookOpen size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-2/5">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 shadow-xl">
              <div className="text-white text-xl font-semibold mb-6">What users are saying</div>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors duration-300">
                  <p className="text-white/90 italic mb-4">
                    "Book-Kreate helped me publish my first children's book in just two days. The AI understood exactly what I wanted!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3 flex items-center justify-center text-white/90">ST</div>
                    <div>
                      <div className="text-white font-medium">Sarah T.</div>
                      <div className="text-white/70 text-sm">Children's Book Author</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors duration-300">
                  <p className="text-white/90 italic mb-4">
                    "As someone with no writing experience, I was able to create a cookbook that looks professionally designed."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3 flex items-center justify-center text-white/90">MR</div>
                    <div>
                      <div className="text-white font-medium">Michael R.</div>
                      <div className="text-white/70 text-sm">Home Chef</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
