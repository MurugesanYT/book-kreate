
import React from 'react';
import { BookOpen, Users, Star, Download } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      number: "10,000+",
      label: "Books Created",
      description: "Authors have published amazing stories"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "5,000+",
      label: "Happy Writers",
      description: "Creators trust our platform"
    },
    {
      icon: <Star className="h-8 w-8" />,
      number: "4.9/5",
      label: "Average Rating",
      description: "Based on user reviews"
    },
    {
      icon: <Download className="h-8 w-8" />,
      number: "50,000+",
      label: "Downloads",
      description: "Books downloaded by readers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-book-purple/5 to-book-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-book-darkText mb-4">
            Trusted by Thousands of Creators
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join a growing community of authors who have discovered the power of AI-assisted storytelling
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg text-book-purple mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-book-darkText mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-book-purple mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-slate-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
