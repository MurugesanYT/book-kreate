
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow py-12 bg-book-lightGray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-book-darkText mb-6">
              Terms of Service
            </h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600">
                Last updated: March 15, 2024
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-slate-600 mb-4">
                Welcome to Book-Kreate. These Terms of Service ("Terms") govern your access to and use of the Book-Kreate website, mobile applications, and services (collectively, the "Service"). Please read these Terms carefully before using our Service.
              </p>
              <p className="text-slate-600 mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                2. Definitions
              </h2>
              <p className="text-slate-600 mb-4">
                <strong>"Service"</strong> refers to the Book-Kreate website, mobile applications, and services operated by Book-Kreate.
              </p>
              <p className="text-slate-600 mb-4">
                <strong>"User"</strong> refers to individuals who access or use the Service for any purpose.
              </p>
              <p className="text-slate-600 mb-4">
                <strong>"Content"</strong> refers to text, graphics, images, music, software, audio, video, information or other materials.
              </p>
              <p className="text-slate-600 mb-4">
                <strong>"User Content"</strong> refers to any Content that Users contribute, upload, or otherwise provide to the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                3. User Accounts
              </h2>
              <p className="text-slate-600 mb-4">
                To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-slate-600 mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We encourage you to use strong passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                4. User Content and Rights
              </h2>
              <p className="text-slate-600 mb-4">
                You retain all rights to the User Content you submit, post, or display on or through the Service. By submitting, posting, or displaying User Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such User Content.
              </p>
              <p className="text-slate-600 mb-4">
                You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any User Content. You agree that User Content will not contain material subject to copyright or other proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the material and to grant us the license described above.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                5. AI-Generated Content
              </h2>
              <p className="text-slate-600 mb-4">
                Book-Kreate utilizes artificial intelligence to help generate and enhance content. You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>AI-generated content is provided as a tool to assist in the creative process and should be reviewed and edited by you.</li>
                <li>We do not guarantee that AI-generated content will be free from errors, factually correct, original, or non-infringing.</li>
                <li>You are solely responsible for reviewing, editing, and ensuring the appropriateness of any AI-generated content you use.</li>
                <li>The output of the AI system may vary in quality, accuracy, and style based on your inputs and the underlying models.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                6. Prohibited Uses
              </h2>
              <p className="text-slate-600 mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate Book-Kreate, a Book-Kreate employee, another user, or any other person or entity.</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm Book-Kreate or users of the Service.</li>
                <li>To generate content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                7. Termination
              </h2>
              <p className="text-slate-600 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p className="text-slate-600 mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-slate-600 mb-4">
                In no event shall Book-Kreate, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-slate-600 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-slate-600 mb-4">
                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-book-darkText mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about these Terms, please contact us at legal@book-kreate.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default TermsPage;
