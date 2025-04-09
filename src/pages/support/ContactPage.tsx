
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from "sonner";
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Have questions or feedback? We're here to help!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="What's this about?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                  <SelectItem value="support">Technical Support</SelectItem>
                                  <SelectItem value="billing">Billing Question</SelectItem>
                                  <SelectItem value="feedback">Feedback/Suggestion</SelectItem>
                                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry..." 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <a href="mailto:kabilanmurugesan2004@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                          kabilanmurugesan2004@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-muted-foreground">
                          Contact via email for phone details
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Our Office</p>
                        <p className="text-sm text-muted-foreground">
                          Currently operating remotely
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 9am - 6pm IST<br />
                          Saturday - Sunday: By appointment
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-2">Connect With Us</h4>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/profile.php?id=61574131919351" className="text-muted-foreground hover:text-primary">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="https://x.com/_fan_boi_lm10_" className="text-muted-foreground hover:text-primary">
                        <X className="h-5 w-5" />
                      </a>
                      <a href="https://www.instagram.com/_fan_boi_lm10_" className="text-muted-foreground hover:text-primary">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="https://www.github.com/MurugesanYT" className="text-muted-foreground hover:text-primary">
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default ContactPage;
