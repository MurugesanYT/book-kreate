
import React from 'react';
import { Users, BookText, Star, Activity } from 'lucide-react';

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

const StatsSection = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-book-purple/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md border border-book-purple/10 hover:border-book-purple/30 transition-colors duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-book-darkText mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-book-purple mb-2">
                {stat.label}
              </p>
              <p className="text-slate-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
