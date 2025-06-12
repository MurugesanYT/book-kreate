
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, Store, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  currentUser: any;
  onLogOut: () => void;
}

const DashboardHeader = ({ currentUser, onLogOut }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Book-Kreate
              </h1>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/marketplace">
                <Store className="h-4 w-4 mr-2" />
                Marketplace
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  {currentUser?.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "User"}
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {currentUser?.displayName && (
                      <p className="font-medium">{currentUser.displayName}</p>
                    )}
                    {currentUser?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {currentUser.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/settings">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
