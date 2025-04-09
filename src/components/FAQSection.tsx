
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
    answer: "Book-Kreate was created by M.Kabilan, a passionate developer who wanted to make book creation accessible to everyone through AI. It's a solo project built with love and dedication to democratize the publishing process."
  },
  {
    question: "Do you have a physical office location?",
    answer: "Currently, Book-Kreate operates remotely without a physical office. As the project grows, we hope to establish a physical office location in the future. For now, you can reach us through email or through our social media channels."
  },
  {
    question: "How long does it take to generate a book?",
    answer: "The time varies based on complexity and length, but most users can generate a complete first draft in minutes to hours, compared to weeks or months with traditional writing methods."
  },
  {
    question: "Can I use Book-Kreate for commercial purposes?",
    answer: "Yes! Books created with our platform can be used for commercial purposes. You retain all rights to your creations and can sell them through any channel you choose."
  },
  {
    question: "What types of books can I create?",
    answer: "Our platform supports a wide range of book types including novels, children's books, educational content, non-fiction guides, memoirs, cookbooks, technical manuals, poetry collections, and more."
  },
  {
    question: "Is there a word count limit for books?",
    answer: "We support books of all lengths, from short stories to full-length novels. Free accounts have a limit of 50,000 words per project, while premium accounts have higher or unlimited word counts."
  },
  {
    question: "Can I add my own images to the books?",
    answer: "Yes, you can upload and incorporate your own images into your books. We also offer an AI image generation feature for premium users who want custom illustrations."
  },
  {
    question: "How does the collaboration feature work?",
    answer: "Premium accounts can invite co-authors to collaborate on a book project. Co-authors can edit content, leave comments, and contribute to the book based on the permission levels you set."
  },
  {
    question: "Can I publish directly from Book-Kreate?",
    answer: "While we don't offer direct publishing services yet, we provide export options that are compatible with all major self-publishing platforms like Amazon KDP, IngramSpark, Draft2Digital, and others."
  },
  {
    question: "What happens if I exceed my monthly book creation limit?",
    answer: "If you reach your limit, you can either upgrade to a higher tier plan or wait until the next billing cycle when your limit resets. Your existing books remain accessible for editing regardless."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within this period."
  },
  {
    question: "Can I switch between different subscription plans?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. When upgrading, you'll gain immediate access to premium features. When downgrading, the change takes effect at the end of your current billing cycle."
  },
  {
    question: "Is Book-Kreate accessible on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on smartphones and tablets. We also have dedicated mobile apps for iOS and Android for a better on-the-go experience."
  },
  {
    question: "How do I get help if I encounter issues?",
    answer: "We offer multiple support channels including our help center documentation, email support, and community forums. Premium users also have access to priority support with faster response times."
  },
  {
    question: "Can I request specific features?",
    answer: "Absolutely! We welcome feature requests from our users. Many of our current features were developed based on user feedback. You can submit suggestions through our feedback form or contact us directly."
  },
  {
    question: "Is there a community of Book-Kreate users?",
    answer: "Yes, we have an active community forum where users can connect, share tips, provide feedback, and showcase their published works. It's a great place to find inspiration and get advice from fellow authors."
  },
  {
    question: "What languages does Book-Kreate support?",
    answer: "Currently, we support English, Spanish, French, German, and Italian, with plans to add more languages in the future. Our AI performs best in English, but delivers good results in all supported languages."
  },
  {
    question: "How often is the AI model updated?",
    answer: "We continuously improve our AI model with regular updates every few months. These updates enhance writing quality, add new creative capabilities, and improve performance based on user feedback and technological advancements."
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
