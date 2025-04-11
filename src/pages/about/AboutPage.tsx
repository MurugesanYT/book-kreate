
import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Sparkles, Globe, Code } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-purple/10 to-book-orange/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-book-darkText mb-6">
              About Book-Kreate
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              We're on a mission to democratize book creation and empower everyone to become an author through the power of AI.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-book-darkText mb-6">Our Story</h2>
                <p className="text-slate-600 mb-4">
                  Book-Kreate was born out of a simple observation: writing a book is hard, but everyone has stories to tell. Our founder, a passionate writer and technologist, experienced firsthand the challenges of book creation—from writer's block to structural planning to editing.
                </p>
                <p className="text-slate-600 mb-4">
                  In 2023, with advancements in AI technology reaching new heights, we saw an opportunity to combine human creativity with AI assistance to make book writing accessible to everyone.
                </p>
                <p className="text-slate-600">
                  Today, Book-Kreate has helped thousands of aspiring authors turn their ideas into fully-realized books across fiction, non-fiction, technical writing, and more.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-book-purple/20 to-book-orange/20 rounded-lg transform rotate-3"></div>
                <div className="absolute -inset-4 bg-gradient-to-l from-book-purple/20 to-book-orange/20 rounded-lg transform -rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" 
                  alt="Forest heat by sunbeam representing creative inspiration" 
                  className="relative rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-book-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-book-darkText mb-4">Our Values</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                These core principles guide everything we do at Book-Kreate as we build the future of book creation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Accessibility</h3>
                <p className="text-slate-600">
                  We believe everyone deserves the opportunity to share their story, regardless of their background, education, or resources.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Quality</h3>
                <p className="text-slate-600">
                  We're committed to providing tools that help authors create well-structured, engaging, and polished books they can be proud of.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-book-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-book-purple" />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText mb-2">Creativity</h3>
                <p className="text-slate-600">
                  We see AI as a tool to enhance human creativity, not replace it. Our platform is designed to spark ideas and help authors overcome creative blocks.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-book-darkText mb-4">Meet the Founder</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Book-Kreate is a solo project created by a passionate developer dedicated to revolutionizing book creation.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-book-lightGray p-6 rounded-lg max-w-md">
                <div className="w-full h-64 overflow-hidden rounded-md mb-4">
                  <img 
                    src="https://i.ibb.co/2Y3Mshg/3d820bd3-58a4-4c1c-b447-b11043015ef8.png" 
                    alt="M.Kabilan - Founder & CEO" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-semibold text-book-darkText">M.Kabilan</h3>
                <p className="text-book-purple mb-2">Founder & CEO</p>
                <p className="text-slate-600 text-sm">
                  Passionate developer and writer who created Book-Kreate to make book creation accessible to everyone through the power of AI.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-book-purple to-book-orange text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Book Journey?</h2>
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
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default AboutPage;
