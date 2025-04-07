
import React from 'react';
import { Link } from 'react-router-dom';
import { BookText, Sparkles, Clock, Layout, BookOpen, Palette, Layers, Edit3, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-book-orange" />,
    title: "AI-Powered Creation",
    description: "Advanced AI technology transforms your ideas into professionally crafted books with rich detail and engaging narratives."
  },
  {
    icon: <Clock className="h-6 w-6 text-book-orange" />,
    title: "Create in Minutes",
    description: "Generate complete books in minutes instead of months. Save time while producing high-quality content."
  },
  {
    icon: <BookText className="h-6 w-6 text-book-orange" />,
    title: "20+ Book Types",
    description: "Choose from over 20 different book types including children's stories, novels, educational content, and more."
  },
  {
    icon: <Layout className="h-6 w-6 text-book-orange" />,
    title: "Structured Chapters",
    description: "Automatically organize your book into well-structured chapters with appropriate pacing and flow."
  },
  {
    icon: <Edit3 className="h-6 w-6 text-book-orange" />,
    title: "Full Editing Control",
    description: "Don't like something? Edit any part of your AI-generated content with our intuitive editor."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-book-orange" />,
    title: "Professional Formatting",
    description: "Automatically format your book with proper cover pages, chapter breaks, and credit sections."
  },
  {
    icon: <Palette className="h-6 w-6 text-book-orange" />,
    title: "Customizable Style",
    description: "Adjust the writing style, tone, and complexity to match your vision and target audience."
  },
  {
    icon: <Layers className="h-6 w-6 text-book-orange" />,
    title: "Multi-Plan Management",
    description: "Keep track of all your book projects with our organized workflow management system."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Powerful Features to Create Amazing Books
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Book-Kreate combines cutting-edge AI technology with intuitive design to make book creation accessible to everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="book-card p-6 hover:border-book-purple/40 transition-all duration-300 h-full rounded-lg hover:shadow-lg hover:-translate-y-1">
                <div className="p-3 bg-gradient-to-br from-book-purple/10 to-book-orange/10 rounded-full w-fit mb-4 group-hover:from-book-purple/20 group-hover:to-book-orange/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-book-darkText">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/features" 
            className="inline-flex items-center text-book-purple hover:text-book-purple/80 font-medium group"
          >
            <span>Explore all features</span>
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
