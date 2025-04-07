
import React from 'react';
import { PenTool, BookText, Sparkles, Bookmark } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    icon: <PenTool size={32} className="text-white" />,
    title: "Describe Your Vision",
    description: "Start by describing the book you want to create. Add details about the genre, themes, characters, or educational content.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: <Sparkles size={32} className="text-white" />,
    title: "AI Creates Your Book",
    description: "Our advanced AI analyzes your description and generates a complete book including chapters, narrative, and professional structure.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: <BookText size={32} className="text-white" />,
    title: "Review & Edit",
    description: "Review the AI-generated content and make any edits or adjustments to perfect your book using our intuitive editing tools.",
    color: "from-pink-500 to-red-600"
  },
  {
    icon: <Bookmark size={32} className="text-white" />,
    title: "Save & Share",
    description: "Save your finished book to your library, export it in various formats, or share it directly with your audience.",
    color: "from-red-500 to-orange-600"
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
        
        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 z-10 relative shadow-lg`}>
                    {step.icon}
                  </div>
                  
                  <span className="absolute top-0 left-0 text-8xl font-bold text-slate-100 -z-10 -translate-x-5 -translate-y-5">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 text-book-darkText">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-lg max-w-lg">
                  {step.description}
                </p>
              </div>
              
              <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-6 border border-slate-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-slate-100 rounded"></div>
                    <div className="h-6 w-20 bg-book-purple/10 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium">{(index + 1) * 25}%</span>
                    </div>
                    <Progress value={(index + 1) * 25} className="h-2" />
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-md">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="flex items-center space-x-2 text-book-purple text-sm font-medium">
                      <Sparkles size={16} />
                      <span>Generating your content...</span>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-slate-100 rounded"></div>
                      <div className="h-16 bg-slate-100 rounded"></div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="flex space-x-4">
                      <div className="h-10 w-10 bg-book-purple/10 rounded-full flex items-center justify-center">
                        <BookText size={20} className="text-book-purple" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-100 rounded"></div>
                        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                      </div>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className="flex justify-around">
                      <div className="h-12 w-16 bg-slate-100 rounded text-xs flex items-center justify-center">PDF</div>
                      <div className="h-12 w-16 bg-slate-100 rounded text-xs flex items-center justify-center">EPUB</div>
                      <div className="h-12 w-16 bg-slate-100 rounded text-xs flex items-center justify-center">DOCX</div>
                      <div className="h-12 w-16 bg-slate-100 rounded text-xs flex items-center justify-center">TXT</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
