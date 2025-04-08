
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Book-Kreate's AI technology work?",
    answer: "Book-Kreate uses advanced machine learning algorithms to analyze your inputs and generate professional-quality book content. Our AI understands narrative structure, character development, and genre conventions to create engaging and coherent books based on your descriptions."
  },
  {
    question: "Is my content secure and private?",
    answer: "Yes, we take your privacy seriously. All your book content and personal information are encrypted and securely stored. We do not claim ownership of your creations, and you retain all rights to the books you generate with our platform."
  },
  {
    question: "Can I edit the AI-generated content?",
    answer: "Absolutely! We provide a full-featured editor that allows you to modify, enhance, or completely rewrite any part of the AI-generated content. You have complete creative control over the final product."
  },
  {
    question: "What file formats can I export my book in?",
    answer: "Book-Kreate supports exports in multiple formats including PDF, EPUB, DOCX, and plain text, making it easy to publish your book through various channels or continue editing in your preferred software."
  },
  {
    question: "Is there a limit to how many books I can create?",
    answer: "Free accounts can create up to 3 books per month. Our premium plans offer higher or unlimited book creation, depending on the subscription level. Check our pricing page for detailed information."
  },
  {
    question: "Do I need writing experience to use Book-Kreate?",
    answer: "Not at all! Book-Kreate is designed to be accessible to everyone, regardless of writing experience. Simply describe what you want, and our AI will handle the technical aspects of crafting a well-structured book."
  },
  {
    question: "Who created Book-Kreate?",
    answer: "Book-Kreate is a solo project created by a passionate developer who wanted to make book creation accessible to everyone through AI. It's built with love and dedication by one person who believes in democratizing the publishing process."
  },
  {
    question: "Do you have a physical office location?",
    answer: "Currently, Book-Kreate operates remotely without a physical office. As the project grows, we hope to establish a physical office location in the future. For now, you can reach us through email at youvegottabefreakingkiddingme@gmail.com or through social media."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Get answers to common questions about Book-Kreate.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-book-purple/10 rounded-lg mb-4 overflow-hidden">
              <AccordionTrigger className="text-left text-lg font-medium px-6 py-4 hover:bg-book-purple/5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 px-6 py-4 bg-gradient-to-r from-book-purple/5 to-transparent">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
