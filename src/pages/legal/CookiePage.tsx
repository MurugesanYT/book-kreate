
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const CookiePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow py-12 bg-book-lightGray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-book-darkText mb-6">
              Cookie Policy
            </h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600">
                Last updated: March 15, 2024
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-slate-600 mb-4">
                This Cookie Policy explains how Book-Kreate ("we", "us", or "our") uses cookies and similar technologies on our website and application (collectively, the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              <p className="text-slate-600 mb-4">
                By using or accessing our Service, you agree to this Cookie Policy. This policy may change from time to time, and your continued use of the Service is deemed acceptance of those changes.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                2. What Are Cookies?
              </h2>
              <p className="text-slate-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-slate-600 mb-4">
                Cookies enable our systems to recognize your device and provide features such as remembering your preferences and login status, understanding how you use our Service, and providing personalized content and advertisements.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                3. Types of Cookies We Use
              </h2>
              <p className="text-slate-600 mb-4">
                We use the following types of cookies:
              </p>
              
              <h3 className="text-lg font-semibold text-book-darkText mt-6 mb-2">
                3.1 Essential Cookies
              </h3>
              <p className="text-slate-600 mb-4">
                These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and account authentication. You cannot opt out of essential cookies as the Service would not operate correctly without them.
              </p>
              
              <h3 className="text-lg font-semibold text-book-darkText mt-6 mb-2">
                3.2 Performance and Analytics Cookies
              </h3>
              <p className="text-slate-600 mb-4">
                These cookies collect information about how visitors use our Service, such as which pages visitors go to most often and if they receive error messages. All information these cookies collect is aggregated and anonymous. It is only used to improve how our Service works.
              </p>
              
              <h3 className="text-lg font-semibold text-book-darkText mt-6 mb-2">
                3.3 Functionality Cookies
              </h3>
              <p className="text-slate-600 mb-4">
                These cookies allow our Service to remember choices you make (such as your user name, language, or the region you are in) and provide enhanced, more personal features. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog.
              </p>
              
              <h3 className="text-lg font-semibold text-book-darkText mt-6 mb-2">
                3.4 Targeting and Advertising Cookies
              </h3>
              <p className="text-slate-600 mb-4">
                These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of advertising campaigns.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                4. Other Tracking Technologies
              </h2>
              <p className="text-slate-600 mb-4">
                In addition to cookies, we may use other similar technologies like web beacons (sometimes called "tracking pixels" or "clear gifs"), tracking URLs, or software development kits (SDKs).
              </p>
              <p className="text-slate-600 mb-4">
                Web beacons are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Service or opened an email that we have sent them.
              </p>
              <p className="text-slate-600 mb-4">
                Tracking URLs are custom-generated links that help us understand where traffic to our Service comes from.
              </p>
              <p className="text-slate-600 mb-4">
                SDKs are small pieces of code included in apps that function like cookies and web beacons.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                5. Third-Party Cookies
              </h2>
              <p className="text-slate-600 mb-4">
                Some cookies are placed by third parties on our behalf. Third parties include search engines, providers of measurement and analytics services, social media networks, and advertising companies.
              </p>
              <p className="text-slate-600 mb-4">
                The third-party services we use for various purposes include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Google Analytics</strong>: For website analytics and performance tracking</li>
                <li><strong>Firebase</strong>: For authentication and app functionality</li>
                <li><strong>Stripe</strong>: For payment processing</li>
                <li><strong>Intercom</strong>: For customer support and messaging</li>
              </ul>
              <p className="text-slate-600 mb-4">
                These third parties may process your personal information in accordance with their own privacy policies. We encourage you to read the privacy policies of these third-party services.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                6. Managing Your Cookie Preferences
              </h2>
              <p className="text-slate-600 mb-4">
                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version.
              </p>
              <p className="text-slate-600 mb-4">
                You can obtain up-to-date information about blocking and deleting cookies via these links:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-book-purple hover:underline">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-book-purple hover:underline">Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-book-purple hover:underline">Microsoft Edge</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-book-purple hover:underline">Safari</a></li>
              </ul>
              <p className="text-slate-600 mb-4">
                Please note that if you choose to block cookies, you may not be able to use all the features of our Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                7. Changes to This Cookie Policy
              </h2>
              <p className="text-slate-600 mb-4">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-slate-600 mb-4">
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                8. Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about our Cookie Policy, please contact us at privacy@book-kreate.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default CookiePage;
