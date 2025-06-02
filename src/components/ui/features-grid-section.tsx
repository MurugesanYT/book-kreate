
import React from 'react';
import { Sparkles, Zap, Shield, Globe, Palette, Users } from 'lucide-react';

const FeaturesGridSection = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Writing",
      description: "Advanced AI that understands narrative structure, character development, and storytelling techniques."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Generate complete chapters in minutes, not months. Speed up your writing process dramatically."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Your Content, Your Rights",
      description: "You own everything you create. We never claim rights to your stories or characters."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multiple Languages",
      description: "Create books in over 50 languages with native-level fluency and cultural understanding."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Professional Formatting",
      description: "Beautiful layouts, typography, and formatting that meets publishing industry standards."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration Tools",
      description: "Work with co-authors, editors, and illustrators seamlessly on the same project."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-book-darkText mb-4">
            Everything You Need to Create Amazing Books
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Powerful features designed to help both novice and experienced writers bring their stories to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-book-purple to-book-orange rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-book-darkText mb-4">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGridSection;
