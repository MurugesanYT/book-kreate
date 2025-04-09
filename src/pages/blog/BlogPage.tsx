
import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing the Book Publishing Industry",
    excerpt: "Explore how artificial intelligence is transforming traditional publishing and opening new doors for authors worldwide.",
    date: "June 15, 2023",
    author: "M.Kabilan",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "5 Ways to Overcome Writer's Block Using AI Tools",
    excerpt: "Struggling with writer's block? Discover how AI assistants can help you break through creative barriers and keep your story flowing.",
    date: "July 3, 2023",
    author: "M.Kabilan",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "The Future of Self-Publishing: 2023 Trends and Beyond",
    excerpt: "From AI assistance to new distribution channels, explore the top trends shaping the future of self-publishing in 2023 and beyond.",
    date: "August 12, 2023",
    author: "M.Kabilan",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
  },
  {
    id: 4,
    title: "From Idea to Bestseller: A Complete Guide to Book Creation",
    excerpt: "Follow our comprehensive step-by-step guide to transform your initial concept into a polished, publishable book that readers will love.",
    date: "September 5, 2023",
    author: "M.Kabilan",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    title: "The Ethics of AI in Creative Writing: Finding the Balance",
    excerpt: "As AI tools become more integrated into the creative process, we explore the ethical considerations for authors using AI assistance.",
    date: "October 19, 2023",
    author: "M.Kabilan",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 6,
    title: "Success Story: How I Wrote My First Novel in 30 Days with AI",
    excerpt: "A first-hand account from an author who used Book-Kreate to complete their debut novel in just one month, from planning to final draft.",
    date: "November 2, 2023",
    author: "Guest Author",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
  },
  {
    id: 7,
    title: "Children's Books Made Easy: Creating Illustrated Stories with AI",
    excerpt: "Learn how authors are using Book-Kreate to craft delightful children's books complete with storylines and illustration guidance.",
    date: "November 15, 2023",
    author: "M.Kabilan",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 8,
    title: "Book Marketing Strategies for AI-Generated Content",
    excerpt: "Discover effective marketing techniques specifically tailored for promoting books created with AI assistance.",
    date: "November 28, 2023",
    author: "M.Kabilan",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1551373880-47becd1a2644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 9,
    title: "The Rise of Hybrid Authors: Combining Traditional and AI-Assisted Writing",
    excerpt: "Explore how established authors are incorporating AI tools into their writing process while maintaining their unique voice and style.",
    date: "December 5, 2023",
    author: "M.Kabilan",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 10,
    title: "Book-Kreate's New Feature Spotlight: Enhanced Character Development",
    excerpt: "Get an inside look at our latest feature that helps authors create deeper, more nuanced characters with detailed backgrounds and arcs.",
    date: "December 18, 2023",
    author: "M.Kabilan",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1551029506-0807cf4621cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1291&q=80"
  },
  {
    id: 11,
    title: "Copyright and AI: What Authors Need to Know",
    excerpt: "A comprehensive guide to understanding copyright law as it applies to AI-generated content and how to protect your creative works.",
    date: "January 10, 2024",
    author: "Legal Expert",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1569251304522-7bfad1fb0b8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 12,
    title: "From Book to Audiobook: Using AI for Audio Narration",
    excerpt: "Discover how authors are using AI voice technology to transform their written works into professional-quality audiobooks.",
    date: "January 25, 2024",
    author: "M.Kabilan",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 13,
    title: "Creating Educational Content with Book-Kreate",
    excerpt: "How teachers and educational institutions are leveraging our platform to create textbooks, workbooks, and learning materials.",
    date: "February 8, 2024",
    author: "M.Kabilan",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80"
  },
  {
    id: 14,
    title: "The Psychology of Reader Engagement: AI Insights",
    excerpt: "Learn how our AI analyzes reader psychology to help authors craft more engaging narratives that keep readers turning pages.",
    date: "February 20, 2024",
    author: "M.Kabilan",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 15,
    title: "International Success: Stories from Global Authors Using Book-Kreate",
    excerpt: "Inspiring accounts from international authors who have overcome language barriers and cultural differences using our platform.",
    date: "March 5, 2024",
    author: "M.Kabilan",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 16,
    title: "The Art of Book Cover Design: AI-Powered Visualization",
    excerpt: "Explore how our new cover design feature uses AI to generate professional book covers based on your story's themes and tone.",
    date: "March 18, 2024",
    author: "M.Kabilan",
    category: "Design",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 17,
    title: "Memoir Writing Made Simple: Turning Life Stories into Books",
    excerpt: "A step-by-step guide to crafting compelling memoirs and autobiographies with Book-Kreate's specialized memoir template.",
    date: "April 2, 2024",
    author: "M.Kabilan",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1516900448138-898720b288d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
  },
  {
    id: 18,
    title: "Writing for Different Age Groups: AI-Tailored Vocabulary and Themes",
    excerpt: "How authors can use Book-Kreate to adjust writing style, themes, and vocabulary for specific age groups from children to adults.",
    date: "April 15, 2024",
    author: "M.Kabilan",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1612969308146-066d55f37ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 19,
    title: "Book Series Planning: Using AI to Maintain Consistency Across Volumes",
    excerpt: "Learn techniques for planning and executing multi-book series with consistent character development, world-building, and plot arcs.",
    date: "May 1, 2024",
    author: "M.Kabilan",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 20,
    title: "Technical Writing and Documentation: New AI Templates",
    excerpt: "Announcing specialized templates for technical writing, documentation, and instructional content with precise and clear explanations.",
    date: "May 15, 2024",
    author: "M.Kabilan",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 21,
    title: "Book-Kreate Community Showcase: Top 10 Published Works",
    excerpt: "Featuring a collection of outstanding books created with our platform that have found commercial and critical success.",
    date: "June 1, 2024",
    author: "M.Kabilan",
    category: "Community",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 22,
    title: "The Solo Developer Journey: Building Book-Kreate",
    excerpt: "An inside look at the challenges and triumphs of creating Book-Kreate as a solo developer dedicated to revolutionizing book creation.",
    date: "June 10, 2024",
    author: "M.Kabilan",
    category: "Behind the Scenes",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 23,
    title: "Fantasy World Building: AI-Powered Creative Tools",
    excerpt: "Discover our specialized fantasy creation tools that help authors develop rich, consistent fictional worlds with unique cultures and histories.",
    date: "June 22, 2024",
    author: "M.Kabilan",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80"
  },
  {
    id: 24,
    title: "The Future of Book-Kreate: Roadmap and Upcoming Features",
    excerpt: "A preview of exciting new features and improvements planned for Book-Kreate in the coming months based on user feedback and technological advancements.",
    date: "June 30, 2024",
    author: "M.Kabilan",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1068&q=80"
  },
  {
    id: 25,
    title: "AI and Creativity: Partners, Not Competitors",
    excerpt: "An exploration of how AI enhances rather than replaces human creativity, with insights from authors who've found their creative voice through Book-Kreate.",
    date: "July 5, 2024",
    author: "M.Kabilan",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 26,
    title: "Book-Kreate's AI Training: How We Ensure Quality Output",
    excerpt: "Behind the scenes look at how our AI models are trained on quality literature to produce coherent, engaging, and error-free content.",
    date: "July 15, 2024",
    author: "M.Kabilan",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const categories = [
  "All Categories", 
  "Writing Tips", 
  "Industry Trends", 
  "Success Stories", 
  "Guides", 
  "Opinion", 
  "Product Updates",
  "Technology",
  "Marketing",
  "Legal",
  "Education",
  "Design",
  "Community",
  "Behind the Scenes"
];

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-purple/10 to-book-orange/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <h1 className="text-4xl font-bold text-book-darkText mb-4">
                  Book-Kreate Blog
                </h1>
                <p className="text-lg text-slate-600 max-w-xl">
                  Insights, tips, and stories from the world of book creation and publishing
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full md:w-80 px-4 py-3 pl-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-book-purple focus:border-book-purple"
                  />
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center overflow-x-auto py-4 whitespace-nowrap gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-book-purple text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 relative overflow-hidden rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Featured post" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-book-purple text-white px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit">
                    Featured
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Behind the Scenes: How I Built Book-Kreate's AI Engine
                  </h2>
                  <p className="text-white/90 mb-4 line-clamp-2">
                    An inside look at the technology and innovation that powers our AI book creation platform, and my vision for the future of AI-assisted writing.
                  </p>
                  <div className="flex items-center text-white/80 text-sm">
                    <span className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      July 15, 2024
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      M.Kabilan
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-book-darkText mb-6">
                  Popular Articles
                </h3>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex gap-4">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-20 h-20 rounded object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-book-darkText line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-slate-500 text-xs mt-1">
                          <span className="flex items-center mr-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6 w-full border-book-purple text-book-purple hover:bg-book-purple/5"
                >
                  View All Articles
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Posts */}
        <section className="py-12 bg-book-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-book-darkText mb-8">
              Recent Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-slate-500 text-xs mb-2">
                      <span className="flex items-center mr-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </span>
                      <span className="bg-book-purple/10 text-book-purple px-2 py-0.5 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-book-darkText mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                      <Button 
                        variant="ghost" 
                        className="text-book-purple hover:text-book-purple/90 hover:bg-book-purple/5 p-0 h-auto font-medium"
                      >
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-book-purple hover:bg-book-purple/90 px-8">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-book-darkText mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-slate-600 mb-6">
              Get the latest articles, writing tips, and Book-Kreate updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-book-purple focus:border-book-purple flex-grow"
              />
              <Button className="bg-book-purple hover:bg-book-purple/90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-slate-500 text-sm mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default BlogPage;
