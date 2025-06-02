import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Wand2, Check, Sparkles } from 'lucide-react';
import { HeroPill } from "@/components/ui/hero-pill";
import { GradientText } from "@/components/ui/gradient-text";

const HeroSection = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-8 overflow-hidden relative bg-gradient-to-br from-white via-book-lightPurple/5 to-book-orange/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-book-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-book-orange/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-book-lightPurple/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex justify-center md:justify-start">
              <HeroPill 
                href="/features"
                label="Introducing Book Kreate"
                announcement="🚀 New"
                className="bg-book-purple/20 ring-book-purple/30 [&_div]:bg-book-purple/20 [&_div]:text-book-purple [&_p]:text-book-purple [&_svg_path]:fill-book-purple"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-book-darkText via-book-purple to-book-orange bg-clip-text text-transparent">
                Create <GradientText>Incredible Books</GradientText> with AI in Minutes
              </span>
            </h1>
            
            <p className="text-xl text-slate-700 md:pr-10 leading-relaxed">
              Turn your ideas into beautifully crafted books with the power of AI. No writing experience needed - just describe your vision and watch it come to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 text-white text-base font-medium flex items-center h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl">
                  Get Started Free
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-base font-medium border-book-purple text-book-purple hover:bg-book-purple/10 flex items-center h-14 px-8 group rounded-xl">
                  <BookOpen size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col space-y-2 pt-4">
              <div className="text-sm text-slate-500 mb-2">No credit card required • Free tier available</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center text-slate-700 text-sm">
                  <div className="rounded-full bg-book-lightPurple/10 p-1 mr-2">
                    <Check size={14} className="text-book-purple" />
                  </div>
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center text-slate-700 text-sm">
                  <div className="rounded-full bg-book-lightPurple/10 p-1 mr-2">
                    <Check size={14} className="text-book-purple" />
                  </div>
                  <span>AI Assistance</span>
                </div>
                <div className="flex items-center text-slate-700 text-sm">
                  <div className="rounded-full bg-book-lightPurple/10 p-1 mr-2">
                    <Check size={14} className="text-book-purple" />
                  </div>
                  <span>Export Ready</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-book-orange/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-book-purple/10 rounded-full blur-xl"></div>
            
            {/* Main content preview */}
            <div className="rounded-2xl shadow-2xl overflow-hidden border border-white/50 bg-white/50 backdrop-blur-sm relative z-10 animate-float">
              <div className="bg-gradient-to-r from-book-purple to-book-orange h-2"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-book-purple/20 flex items-center justify-center">
                      <BookOpen size={16} className="text-book-purple" />
                    </div>
                    <div className="text-lg font-semibold text-book-darkText">Book-Kreate Editor</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-5 bg-slate-100 rounded-md w-full"></div>
                  <div className="h-5 bg-slate-100 rounded-md w-5/6"></div>
                  <div className="h-5 bg-slate-100 rounded-md w-4/5"></div>
                  
                  <div className="my-6 border border-slate-100 rounded-md p-4 bg-slate-50">
                    <div className="flex items-center mb-3">
                      <div className="h-6 w-6 rounded-full bg-book-purple/20 flex items-center justify-center mr-2">
                        <Sparkles size={12} className="text-book-purple" />
                      </div>
                      <div className="text-sm font-medium text-book-darkText">AI Assistant</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full"></div>
                      <div className="h-3 bg-slate-200 rounded w-11/12"></div>
                      <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-100 rounded-md w-full"></div>
                    <div className="h-5 bg-slate-100 rounded-md w-3/4"></div>
                    <div className="h-5 bg-slate-100 rounded-md w-4/5"></div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <div className="h-8 w-24 bg-slate-100 rounded-md flex items-center justify-center text-xs font-medium text-slate-500">Preview</div>
                  <div className="h-8 w-24 bg-book-purple/20 rounded-md flex items-center justify-center text-xs font-medium text-book-purple">Generate</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 transform rotate-6 bg-white rounded-lg shadow-lg p-3 animate-bounce" style={{animationDuration: '6s'}}>
              <Sparkles size={24} className="text-book-orange" />
            </div>
            <div className="absolute -left-6 bottom-1/4 transform -rotate-6 bg-white rounded-lg shadow-lg p-3 animate-bounce" style={{animationDuration: '8s', animationDelay: '1s'}}>
              <BookOpen size={24} className="text-book-purple" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-10 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.32,118.92,150.83,82.75,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
