import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import PricingSection from '@/pages/PricingSection';
import FeaturesPage from '@/pages/FeaturesPage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import StatusPage from '@/pages/StatusPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiePage from '@/pages/CookiePage';
import LicensesPage from '@/pages/LicensesPage';
import DashboardPage from '@/pages/DashboardHome';
import BookCreationPage from '@/pages/BookCreationPage';
import BookPlanPage from '@/pages/BookPlanPage';
import PlanPage from '@/pages/account/PlanPage';
import NotFound from '@/pages/NotFound';
import RequireAuth from '@/components/RequireAuth';
import { Toaster } from 'sonner';
import { QueryClient } from 'react-query';
import AccountSettingsPage from './pages/account/AccountSettingsPage';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <Router>
          <Toaster />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiePage />} />
            <Route path="/licenses" element={<LicensesPage />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } />
            <Route path="/create-book" element={
              <RequireAuth>
                <BookCreationPage />
              </RequireAuth>
            } />
            <Route path="/book/:id" element={
              <RequireAuth>
                <BookPlanPage />
              </RequireAuth>
            } />
            <Route path="/account/plan" element={
              <RequireAuth>
                <PlanPage />
              </RequireAuth>
            } />
            <Route path="/account/settings" element={
              <RequireAuth>
                <AccountSettingsPage />
              </RequireAuth>
            } />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
