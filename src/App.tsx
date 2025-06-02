
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import PricingSection from '@/components/PricingSection';
import FeaturesPage from '@/pages/features/FeaturesPage';
import AboutPage from '@/pages/about/AboutPage';
import BlogPage from '@/pages/blog/BlogPage';
import HelpCenterPage from '@/pages/support/HelpCenterPage';
import ContactPage from '@/pages/support/ContactPage';
import FAQPage from '@/pages/support/FAQPage';
import StatusPage from '@/pages/support/StatusPage';
import TermsPage from '@/pages/legal/TermsPage';
import PrivacyPage from '@/pages/legal/PrivacyPage';
import CookiePage from '@/pages/legal/CookiePage';
import LicensesPage from '@/pages/legal/LicensesPage';
import DashboardPage from '@/pages/DashboardHome';
import BookCreationPage from '@/pages/BookCreationPage';
import BookPlanPage from '@/pages/BookPlanPage';
import PlanPage from '@/pages/account/PlanPage';
import NotFound from '@/pages/NotFound';
import RequireAuth from '@/components/RequireAuth';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountSettingsPage from './pages/account/AccountSettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
