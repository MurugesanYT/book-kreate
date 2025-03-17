
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const StatusPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">System Status</h1>
            <div className="flex items-center">
              <div className="flex h-2.5 w-2.5 mr-2 rounded-full bg-green-500"></div>
              <span className="text-lg font-medium">All Systems Operational</span>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-10">
            This page provides real-time information about our platform's performance and any issues that might affect your experience.
          </p>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Current Status</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">System Uptime (Last 30 Days)</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      99.98%
                    </Badge>
                  </div>
                  <Progress value={99.98} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Response Time</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      84ms
                    </Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6">Service Status</h2>
          
          <div className="space-y-5 mb-10">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {service.status === 'operational' && (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      )}
                      {service.status === 'degraded' && (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                      )}
                      {service.status === 'outage' && (
                        <XCircle className="h-5 w-5 text-red-500 mr-3" />
                      )}
                      {service.status === 'maintenance' && (
                        <Clock className="h-5 w-5 text-blue-500 mr-3" />
                      )}
                      <span className="font-medium">{service.name}</span>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`
                        ${service.status === 'operational' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${service.status === 'degraded' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                        ${service.status === 'outage' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                        ${service.status === 'maintenance' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      `}
                    >
                      {service.status === 'operational' && 'Operational'}
                      {service.status === 'degraded' && 'Degraded Performance'}
                      {service.status === 'outage' && 'Major Outage'}
                      {service.status === 'maintenance' && 'Maintenance'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Incident History</h2>
          
          <div className="space-y-6 mb-10">
            {incidents.map((incident, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center">
                        {incident.status === 'resolved' && (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        )}
                        {incident.status === 'investigating' && (
                          <RefreshCw className="h-5 w-5 text-amber-500 mr-2" />
                        )}
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {incident.date} • Affected: {incident.affected}
                      </p>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`
                        ${incident.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${incident.status === 'investigating' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                      `}
                    >
                      {incident.status === 'resolved' && 'Resolved'}
                      {incident.status === 'investigating' && 'Investigating'}
                    </Badge>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    {incident.updates.map((update, idx) => (
                      <div key={idx}>
                        <p className="text-sm font-medium">{update.time}</p>
                        <p className="text-sm text-muted-foreground">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Subscribe to Updates</h3>
            <p className="text-muted-foreground mb-4">
              Get notified about system status changes and upcoming maintenance directly to your email.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

const services = [
  { name: "Website & User Interface", status: "operational" },
  { name: "Book Creation & Editing", status: "operational" },
  { name: "AI Writing Assistant", status: "operational" },
  { name: "PDF Export & Publishing", status: "operational" },
  { name: "User Authentication", status: "operational" },
  { name: "Payment Processing", status: "operational" },
  { name: "API Services", status: "operational" },
  { name: "Database & Storage", status: "maintenance" }
];

const incidents = [
  {
    title: "Scheduled Database Maintenance",
    date: "July 15, 2023",
    status: "resolved",
    affected: "Database & Storage",
    updates: [
      { 
        time: "July 15, 2023 - 04:00 UTC", 
        message: "Scheduled maintenance completed successfully. All systems are operational." 
      },
      { 
        time: "July 15, 2023 - 02:30 UTC", 
        message: "Maintenance in progress. Some users may experience slower response times when accessing stored books." 
      },
      { 
        time: "July 10, 2023 - 15:00 UTC", 
        message: "Scheduled database maintenance planned for July 15, 2023, from 02:00 - 04:00 UTC. During this time, the platform will remain accessible but may experience some performance degradation." 
      }
    ]
  },
  {
    title: "AI Writing Assistant Performance Degradation",
    date: "June 28, 2023",
    status: "resolved",
    affected: "AI Writing Assistant",
    updates: [
      { 
        time: "June 28, 2023 - 18:45 UTC", 
        message: "The AI Writing Assistant is now fully operational. We've implemented optimizations to prevent similar issues in the future." 
      },
      { 
        time: "June 28, 2023 - 16:30 UTC", 
        message: "We've identified the cause of the slow response times and are implementing a fix. Service is partially restored." 
      },
      { 
        time: "June 28, 2023 - 14:15 UTC", 
        message: "We're investigating reports of slow response times from the AI Writing Assistant. Some users may experience delays when using this feature." 
      }
    ]
  },
  {
    title: "Database Maintenance",
    date: "Today",
    status: "investigating",
    affected: "Database & Storage",
    updates: [
      { 
        time: "Today - 10:30 UTC", 
        message: "We're performing scheduled maintenance on our database systems. Some users may experience slower response times when accessing stored books or saving changes. We expect this maintenance to be completed by 12:30 UTC." 
      }
    ]
  }
];

export default StatusPage;
