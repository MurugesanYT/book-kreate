
import React from 'react';
import { PenTool, BookText, Sparkles, Bookmark } from 'lucide-react';

const steps = [
  {
    icon: <PenTool size={32} className="text-white" />,
    title: "Describe Your Vision",
    description: "Start by describing the book you want to create. Add details about the genre, themes, characters, or educational content."
  },
  {
    icon: <Sparkles size={32} className="text-white" />,
    title: "AI Creates Your Book",
    description: "Our advanced AI analyzes your description and generates a complete book including chapters, narrative, and professional structure."
  },
  {
    icon: <BookText size={32} className="text-white" />,
    title: "Review & Edit",
    description: "Review the AI-generated content and make any edits or adjustments to perfect your book using our intuitive editing tools."
  },
  {
    icon: <Bookmark size={32} className="text-white" />,
    title: "Save & Share",
    description: "Save your finished book to your library, export it in various formats, or share it directly with your audience."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-book-lightPurple/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Book-Kreate Works
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Creating professional-quality books has never been easier. Follow these simple steps to bring your ideas to life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full bg-book-purple flex items-center justify-center mb-4 z-10 relative">
                  {step.icon}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-16 h-0.5 bg-book-purple/30 w-full hidden lg:block"></div>
                )}
                
                <div className="absolute top-0 left-0 right-0 text-book-lightPurple/80 font-bold text-5xl opacity-20 -z-10">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-book-darkText">
                {step.title}
              </h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
