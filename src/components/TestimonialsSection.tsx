
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Book-Kreate transformed my writing process. I was able to create a children's book for my daughter in just one afternoon. The AI understood exactly what I wanted!",
    author: "Jessica R.",
    role: "Parent & Educator",
    rating: 5
  },
  {
    quote: "As someone with dyslexia, writing has always been challenging for me. This tool has allowed me to finally bring my stories to life without struggling with the writing process.",
    author: "Michael T.",
    role: "Aspiring Author",
    rating: 5
  },
  {
    quote: "I've used several AI writing tools, but Book-Kreate is the only one that truly understands narrative structure. The chapter organization and story flow are impressive.",
    author: "Samantha W.",
    role: "Publishing Consultant",
    rating: 4
  },
  {
    quote: "Our school uses Book-Kreate to help students publish their own stories. It's incredible to see how excited they get when their ideas transform into actual books.",
    author: "David L.",
    role: "Elementary School Teacher",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join thousands of satisfied authors who have discovered the power of AI-assisted book creation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-book-lightGray p-6 md:p-8 rounded-lg border border-slate-200 relative">
              <div className="absolute -top-3 -left-3 bg-book-orange text-white p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.58 14.08C9.1 13.72 8.7 13.24 8.42 12.71C8.14 12.17 8 11.59 8 11C8 10.25 8.2 9.55 8.59 8.92C8.98 8.29 9.52 7.78 10.2 7.39C10.88 7 11.65 6.8 12.5 6.8C13.34 6.8 14.1 7 14.78 7.39C15.45 7.78 15.99 8.29 16.38 8.92C16.77 9.55 16.97 10.25 16.97 11C16.97 11.6 16.83 12.17 16.55 12.71C16.27 13.24 15.88 13.72 15.38 14.08M7 16.94V19.74C7 19.74 10.75 19.02 12 19.02C13.25 19.02 17 19.74 17 19.74V16.94C17 16.94 13.25 16.21 12 16.21C10.75 16.21 7 16.94 7 16.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-book-orange text-book-orange" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-slate-300" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div>
                <p className="font-semibold text-book-darkText">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
