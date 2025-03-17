
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const FAQPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Find answers to the most common questions about our platform.
          </p>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">General Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {generalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Account & Billing</h2>
            <Accordion type="single" collapsible className="w-full">
              {accountFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`account-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Using the Platform</h2>
            <Accordion type="single" collapsible className="w-full">
              {platformFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`platform-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-muted rounded-lg p-8 text-center mt-16">
            <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              If you couldn't find the answer you were looking for, please reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="w-full sm:w-auto flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Contact Support
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" className="w-full sm:w-auto flex items-center">
                  Browse Help Center <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

const generalFAQs = [
  {
    question: "What is BookCraft AI?",
    answer: "BookCraft AI is an innovative platform that helps authors create books using AI technology. Our platform provides tools for planning, writing, editing, and formatting your book from start to finish, with AI assistance at every step."
  },
  {
    question: "Is BookCraft AI suitable for all types of books?",
    answer: "Yes! BookCraft AI works well for fiction, non-fiction, children's books, cookbooks, instructional manuals, and more. Our platform offers specialized templates and AI assistance tailored to different book genres and formats."
  },
  {
    question: "Do I need technical skills to use BookCraft AI?",
    answer: "Not at all. BookCraft AI is designed to be intuitive and user-friendly. If you can use a word processor, you can use our platform. Our step-by-step guides will walk you through the process."
  },
  {
    question: "Who owns the copyright to books created with BookCraft AI?",
    answer: "You retain 100% ownership of all content created using our platform. BookCraft AI is simply a tool to help you create your book—the finished product is entirely yours."
  },
  {
    question: "Can I export my book for printing or publishing elsewhere?",
    answer: "Absolutely! You can export your completed book in various formats including PDF, EPUB, and print-ready files that are compatible with major publishing platforms and print-on-demand services."
  }
];

const accountFAQs = [
  {
    question: "How do I sign up for BookCraft AI?",
    answer: "Signing up is easy! Just click the 'Get Started' button on our homepage, enter your email address, and follow the prompts to create your account. You can start with our free tier or choose a subscription plan that fits your needs."
  },
  {
    question: "What subscription plans do you offer?",
    answer: "We offer several subscription tiers: Free (basic features, limited books), Standard ($9.99/month with expanded features), and Professional ($19.99/month with full access to all features and priority support). Annual subscriptions are available at a discount."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll maintain access to your subscription benefits until the end of your current billing period."
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard encryption and secure payment processors. We never store your full credit card information on our servers."
  },
  {
    question: "What happens to my books if I cancel my subscription?",
    answer: "Your books remain accessible in a read-only format even after cancellation. To regain editing capabilities, you can reactivate your subscription at any time."
  }
];

const platformFAQs = [
  {
    question: "How does the AI writing assistant work?",
    answer: "Our AI writing assistant uses advanced natural language processing to help generate content, suggest improvements, and overcome writer's block. You provide the creative direction, and the AI offers suggestions and content that you can accept, modify, or reject."
  },
  {
    question: "Is there a limit to how much content I can create?",
    answer: "Free accounts have a monthly word limit. Standard and Professional subscriptions have much higher limits that refresh monthly. Check your subscription plan for specific details."
  },
  {
    question: "Can I collaborate with others on my book?",
    answer: "Yes! Professional plan subscribers can invite collaborators to work on their books. Collaborators can be assigned different roles with varying levels of access and editing permissions."
  },
  {
    question: "How do I get help if I encounter technical issues?",
    answer: "You can visit our Help Center for troubleshooting guides, contact our support team via email, or use the chat support feature within the platform. Professional subscribers also have access to priority support."
  },
  {
    question: "Can I import existing content into BookCraft AI?",
    answer: "Yes, you can import content from Word documents, Google Docs, plain text files, and more. Our platform will preserve formatting as much as possible and allow you to organize the imported content within your book project."
  }
];

export default FAQPage;
