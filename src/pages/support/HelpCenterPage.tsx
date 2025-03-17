
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileQuestion, ExternalLink, BookOpen } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const HelpCenterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Find answers to your questions and get the support you need.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <FileQuestion className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse our comprehensive FAQ library to find quick answers to common questions.
                  </p>
                  <Link to="/faq">
                    <Button variant="outline">View FAQs</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for? Reach out to our friendly support team.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-12" />
          
          <h2 className="text-2xl font-bold mb-8">Popular Help Topics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {topic.description}
                  </p>
                  <Link to={topic.link} className="text-primary text-sm flex items-center">
                    Learn more <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-12" />
          
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer support team is available Monday-Friday, 9am-5pm EST.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button variant="outline" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" /> Call Support
              </Button>
              <Link to="/contact">
                <Button className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Email Support
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

const helpTopics = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of creating your first book with our platform.",
    link: "/help/getting-started"
  },
  {
    title: "Account Management",
    description: "How to manage your profile, subscription, and account settings.",
    link: "/help/account"
  },
  {
    title: "Publishing Options",
    description: "Understand the different ways to publish and share your book.",
    link: "/help/publishing"
  },
  {
    title: "AI Writing Assistant",
    description: "Tips for getting the most out of our AI-powered writing tools.",
    link: "/help/ai-assistant"
  },
  {
    title: "Book Templates",
    description: "How to use and customize our professional book templates.",
    link: "/help/templates"
  },
  {
    title: "Troubleshooting",
    description: "Solutions to common technical issues and problems.",
    link: "/help/troubleshooting"
  }
];

export default HelpCenterPage;
