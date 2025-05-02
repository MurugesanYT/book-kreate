
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

// Pages
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardHome from "./pages/DashboardHome"; // Add our new dashboard home
import BookCreationPage from "./pages/BookCreationPage";
import BookPlanPage from "./pages/BookPlanPage";
import NotFound from "./pages/NotFound";

// Content Pages
import AboutPage from "./pages/about/AboutPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import BlogPage from "./pages/blog/BlogPage";
import HelpCenterPage from "./pages/support/HelpCenterPage";
import FAQPage from "./pages/support/FAQPage";
import ContactPage from "./pages/support/ContactPage";
import StatusPage from "./pages/support/StatusPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import CookiePage from "./pages/legal/CookiePage";
import LicensesPage from "./pages/legal/LicensesPage";

const App = () => {
  // Move the QueryClient instantiation inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <RequireAuth>
                    <DashboardHome />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/dashboard/editor" 
                element={
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/book/create" 
                element={
                  <RequireAuth>
                    <BookCreationPage />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/book/plan/:bookId" 
                element={
                  <RequireAuth>
                    <BookPlanPage />
                  </RequireAuth>
                } 
              />
              
              {/* Content Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/pricing" element={<LandingPage />} />
              
              {/* Support Pages */}
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/status" element={<StatusPage />} />
              
              {/* Legal Pages */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiePage />} />
              <Route path="/licenses" element={<LicensesPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
