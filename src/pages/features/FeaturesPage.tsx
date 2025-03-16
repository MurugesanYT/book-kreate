
import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Sparkles, Layout, Edit, LayoutPanelLeft, 
  Download, Lightbulb, Palette, FileText, BookCopy 
} from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-purple/10 to-book-orange/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-book-darkText mb-6">
              Powerful Features for Authors
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Book-Kreate combines AI-powered tools with intuitive design to make book creation accessible, enjoyable, and efficient.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-book-purple hover:bg-book-purple/90 px-8"
            >
              <Link to="/auth">Start Creating</Link>
            </Button>
          </div>
        </section>
        
        {/* Main Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-book-darkText mb-6">
                  AI-Powered Book Generation
                </h2>
                <p className="text-slate-600 mb-4">
                  Turn your ideas into fully structured books with our advanced AI technology. Book-Kreate helps you generate:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Complete book outlines based on your concepts</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Chapter plans with key points and narrative flow</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Engaging content that matches your style and goals</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Character development for fiction works</span>
                  </li>
                </ul>
                <p className="text-slate-600">
                  Our AI doesn't replace your creativity—it enhances it by streamlining the book creation process and helping you overcome writer's block.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-book-purple/20 to-book-orange/20 rounded-lg transform rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1593782915471-5382a3e23dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="AI Book Generation" 
                  className="relative rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Structured Writing Experience */}
        <section className="py-16 bg-book-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-l from-book-purple/20 to-book-orange/20 rounded-lg transform -rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Structured Writing Process" 
                  className="relative rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-book-darkText mb-6">
                  Structured Writing Process
                </h2>
                <p className="text-slate-600 mb-4">
                  Our intuitive book planning system guides you through each stage of book creation:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Layout className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Interactive book plan with drag-and-drop organization</span>
                  </li>
                  <li className="flex items-start">
                    <LayoutPanelLeft className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Visual progress tracking to maintain momentum</span>
                  </li>
                  <li className="flex items-start">
                    <Edit className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Rich text editor with formatting and media options</span>
                  </li>
                  <li className="flex items-start">
                    <BookCopy className="h-5 w-5 text-book-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Chapter templates for consistent structure</span>
                  </li>
                </ul>
                <p className="text-slate-600">
                  Never lose track of your book project again. Our platform keeps everything organized so you can focus on what matters most—your content.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-book-darkText mb-4">More Powerful Features</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Explore the full range of tools designed to make book creation seamless from concept to completion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Export Options</h3>
                <p className="text-slate-600">
                  Export your completed book in multiple formats including PDF, ready for self-publishing or distribution.
                </p>
              </div>
              
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Idea Generation</h3>
                <p className="text-slate-600">
                  Overcome writer's block with our AI-powered idea generator for plots, characters, settings, and more.
                </p>
              </div>
              
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Genre Templates</h3>
                <p className="text-slate-600">
                  Choose from specialized templates for fiction, non-fiction, technical writing, and more to jumpstart your project.
                </p>
              </div>
              
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Cover Design</h3>
                <p className="text-slate-600">
                  Create professional book covers with our integrated design tools and templates.
                </p>
              </div>
              
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Multiple Projects</h3>
                <p className="text-slate-600">
                  Work on multiple books simultaneously with our organized dashboard and project management system.
                </p>
              </div>
              
              <div className="bg-book-lightGray p-8 rounded-lg">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">AI Enhancement</h3>
                <p className="text-slate-600">
                  Get AI suggestions to improve readability, engagement, and flow throughout your writing process.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-book-purple to-book-orange text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Write Your Book?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Join thousands of authors who have already discovered the power of AI-assisted book creation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild
                className="bg-white text-book-purple hover:bg-white/90 px-8 py-6 text-lg"
              >
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default FeaturesPage;
