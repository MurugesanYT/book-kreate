
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const LicensesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow py-12 bg-book-lightGray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-book-darkText mb-6">
              Licenses and Attributions
            </h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-6">
                Book-Kreate is built using various open-source software and third-party components. This page lists the licenses and attributions for these components.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                1. Open Source Software
              </h2>
              <p className="text-slate-600 mb-4">
                Our application uses the following open-source software:
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">React</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    A JavaScript library for building user interfaces, developed by Facebook.
                  </p>
                  <p className="text-xs text-slate-500">
                    Licensed under the MIT License:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
                    <code>
                      MIT License

                      Copyright (c) Facebook, Inc. and its affiliates.

                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions...
                    </code>
                  </pre>
                </div>
                
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Tailwind CSS</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    A utility-first CSS framework for rapidly building custom designs.
                  </p>
                  <p className="text-xs text-slate-500">
                    Licensed under the MIT License:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
                    <code>
                      MIT License

                      Copyright (c) Tailwind Labs, Inc.

                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction...
                    </code>
                  </pre>
                </div>
                
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Firebase</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    A platform developed by Google for creating mobile and web applications.
                  </p>
                  <p className="text-xs text-slate-500">
                    Licensed under the Apache License 2.0:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
                    <code>
                      Apache License
                      Version 2.0, January 2004
                      http://www.apache.org/licenses/
                    </code>
                  </pre>
                </div>
                
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">jsPDF</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    A library to generate PDFs in client-side JavaScript.
                  </p>
                  <p className="text-xs text-slate-500">
                    Licensed under the MIT License:
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
                    <code>
                      MIT License

                      Copyright (c) 2010-2020 James Hall, https://github.com/MrRio/jsPDF

                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software")...
                    </code>
                  </pre>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                2. Third-Party APIs
              </h2>
              <p className="text-slate-600 mb-4">
                Book-Kreate integrates with the following third-party APIs:
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Google Generative AI (Gemini)</h3>
                  <p className="text-sm text-slate-600">
                    Used for AI-powered content generation and assistance.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Usage is governed by Google's Terms of Service and API Usage Terms.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Firebase Authentication</h3>
                  <p className="text-sm text-slate-600">
                    Used for user authentication and account management.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Usage is governed by Google Firebase Terms.
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                3. Icons and Images
              </h2>
              <p className="text-slate-600 mb-4">
                We use the following resources for icons and images:
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Lucide Icons</h3>
                  <p className="text-sm text-slate-600">
                    A set of beautiful open-source icons.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Licensed under the ISC License.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Unsplash Images</h3>
                  <p className="text-sm text-slate-600">
                    High-quality, freely-usable images.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Licensed under the Unsplash License (https://unsplash.com/license).
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                4. Fonts
              </h2>
              <p className="text-slate-600 mb-4">
                We use the following fonts in our application:
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-semibold text-book-darkText mb-2">Inter</h3>
                  <p className="text-sm text-slate-600">
                    A variable font family designed for computer screens.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Licensed under the SIL Open Font License 1.1.
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                5. User-Generated Content License
              </h2>
              <p className="text-slate-600 mb-4">
                When you create content using Book-Kreate, you retain all rights to your generated content. Please refer to our Terms of Service for more details on content ownership and licensing.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                6. Contact Information
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about the licenses used in Book-Kreate, or if you believe that your copyrighted material has been used in a way that constitutes copyright infringement, please contact us at legal@book-kreate.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default LicensesPage;
