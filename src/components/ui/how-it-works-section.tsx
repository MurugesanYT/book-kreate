
import React from 'react';
import { Edit3, Wand2, BookOpen, Download } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Edit3 className="h-12 w-12" />,
      title: "Describe Your Vision",
      description: "Tell us about your book idea, genre, and what you want to create. Our AI understands your creative vision.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wand2 className="h-12 w-12" />,
      title: "AI Generates Content",
      description: "Watch as our advanced AI crafts chapters, develops characters, and builds your story structure automatically.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "Edit & Customize",
      description: "Review, edit, and customize every aspect of your book. Add your personal touch to make it uniquely yours.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Download className="h-12 w-12" />,
      title: "Export & Publish",
      description: "Download your book in multiple formats (PDF, EPUB, DOCX) and share it with the world.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-book-darkText mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From idea to published book in just four simple steps. Our AI-powered platform makes book creation effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-slate-300 z-0" />
              )}
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100 z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-book-purple to-book-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-book-darkText mb-4">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
