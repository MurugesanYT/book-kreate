import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages/DashboardPage';
import BookPlanPage from './pages/BookPlanPage';
import BookCreatePage from './pages/BookCreatePage';
import BookEditPage from './pages/BookEditPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient } from 'react-query';
import MarketplacePage from './pages/MarketplacePage';

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/book/plan/:bookId" element={<BookPlanPage />} />
            <Route path="/book/create" element={<BookCreatePage />} />
            <Route path="/book/edit/:bookId" element={<BookEditPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/:tab" element={<AccountPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Routes>
        </AuthProvider>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
