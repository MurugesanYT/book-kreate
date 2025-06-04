
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  currentUser: any;
  onLogOut: () => void;
}

const DashboardHeader = ({ currentUser, onLogOut }: DashboardHeaderProps) => {
  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white mr-4 shadow-xl">
            <span className="text-xl font-bold">BK</span>
          </div>
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Book-Kreate
            </span>
            <p className="text-sm text-slate-500 mt-1">Your AI Writing Companion</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser && currentUser.photoURL && (
            <div className="relative">
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-12 h-12 rounded-2xl border-3 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            onClick={onLogOut}
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
