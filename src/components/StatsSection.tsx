
import React from 'react';
import { Users, BookText, Star, Activity, Code, Heart, Coffee, Brain } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const stats = [
  {
    icon: <Users className="h-8 w-8 text-book-lightPurple" />,
    value: "15,000+",
    label: "Active Users",
    description: "Join our growing community of authors and creators"
  },
  {
    icon: <BookText className="h-8 w-8 text-book-lightPurple" />,
    value: "50,000+",
    label: "Books Created",
    description: "Thousands of books generated with our AI technology"
  },
  {
    icon: <Star className="h-8 w-8 text-book-lightPurple" />,
    value: "4.8/5",
    label: "User Rating",
    description: "Consistently high satisfaction from our users"
  },
  {
    icon: <Activity className="h-8 w-8 text-book-lightPurple" />,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable platform available whenever you need it"
  }
];

const developerFacts = [
  {
    icon: <Code className="h-6 w-6 text-book-purple" />,
    text: "1 passionate developer"
  },
  {
    icon: <Heart className="h-6 w-6 text-book-purple" />,
    text: "Made with love"
  },
  {
    icon: <Coffee className="h-6 w-6 text-book-purple" />,
    text: "Fueled by coffee"
  },
  {
    icon: <Brain className="h-6 w-6 text-book-purple" />,
    text: "Powered by AI"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-book-purple/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-book-purple/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join thousands of users who are already creating amazing books with Book-Kreate
          </p>
          <div className="flex justify-center mt-6">
            <Separator className="w-24 bg-gradient-to-r from-book-purple to-book-orange h-1 rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-book-purple/10 to-book-orange/10 rounded-lg transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="bg-white rounded-lg p-8 shadow-md border border-book-purple/10 hover:border-book-purple/30 transition-all duration-300 text-center relative z-10">
                <div className="flex justify-center mb-5 transform group-hover:scale-110 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-book-purple/10 to-book-orange/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-book-darkText mb-3 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent relative">
                  {stat.value}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-book-orange rounded-full opacity-70 animate-ping"></span>
                </h3>
                <p className="text-lg font-medium text-book-purple mb-2">
                  {stat.label}
                </p>
                <p className="text-slate-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-book-purple/5 to-book-orange/5 rounded-xl p-8 border border-book-purple/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-book-darkText">Solo Creator Project</h3>
            <p className="text-slate-600">
              Book-Kreate is an independent project developed with passion and dedication by a single creator.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {developerFacts.map((fact, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="p-3 bg-white rounded-full shadow-md mb-3 group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  {fact.icon}
                </div>
                <p className="text-slate-700 font-medium">{fact.text}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-slate-600 italic">
              "Building Book-Kreate has been my passion project, bringing AI-powered book creation to everyone."
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-book-purple/10 text-book-purple text-sm font-medium">
              <Heart size={16} className="mr-2 text-book-orange animate-pulse" />
              <span>Made with love and lots of coffee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
