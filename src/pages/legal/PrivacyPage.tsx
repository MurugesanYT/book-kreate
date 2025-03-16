
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow py-12 bg-book-lightGray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-book-darkText mb-6">
              Privacy Policy
            </h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600">
                Last updated: March 15, 2024
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-slate-600 mb-4">
                At Book-Kreate, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
              </p>
              <p className="text-slate-600 mb-4">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-slate-600 mb-4">
                We collect several types of information from and about users of our Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Personal Information</strong>: Information that identifies you personally, such as your name, email address, and profile picture when you create an account.</li>
                <li><strong>User Content</strong>: The content you create, upload, or generate using our Service, including book drafts, outlines, and other written content.</li>
                <li><strong>Usage Data</strong>: Information about how you use our Service, including your browsing patterns, features you use, and time spent on the platform.</li>
                <li><strong>Device Information</strong>: Information about the device you use to access our Service, including device type, operating system, browser type, and IP address.</li>
                <li><strong>Cookies and Similar Technologies</strong>: Information collected through cookies, web beacons, and other tracking technologies to analyze usage patterns and improve our Service.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-slate-600 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>To provide, maintain, and improve our Service</li>
                <li>To create and manage your account</li>
                <li>To process your transactions and subscriptions</li>
                <li>To personalize your experience on our Service</li>
                <li>To train and improve our AI models for content generation</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you updates, administrative messages, and marketing communications</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To detect, prevent, and address technical issues and security breaches</li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                4. How We Share Your Information
              </h2>
              <p className="text-slate-600 mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>With Service Providers</strong>: We may share your information with third-party vendors, service providers, and contractors who perform services for us or on our behalf.</li>
                <li><strong>For Business Transfers</strong>: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent</strong>: We may disclose your information for any other purpose with your consent.</li>
                <li><strong>To Comply with Legal Obligations</strong>: We may disclose your information to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
                <li><strong>To Protect Rights and Safety</strong>: We may disclose your information to protect the rights, property, or safety of Book-Kreate, our users, or others.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                5. Your Choices and Rights
              </h2>
              <p className="text-slate-600 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="text-slate-600 mb-4">
                To exercise these rights, please contact us at privacy@book-kreate.com.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                6. Data Security
              </h2>
              <p className="text-slate-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-slate-600 mb-4">
                Our Service is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information without parental consent, please contact us, and we will take steps to remove such information and terminate the child's account.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                8. International Data Transfers
              </h2>
              <p className="text-slate-600 mb-4">
                We may transfer, store, and process your information in countries other than your own. By using our Service, you consent to the transfer of your information to countries that may have different data protection laws than those in your country of residence.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at privacy@book-kreate.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default PrivacyPage;
