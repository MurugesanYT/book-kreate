
"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export function EnhancedNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-4xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Features">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/features">AI-Powered Creation</HoveredLink>
            <HoveredLink to="/features">Custom Templates</HoveredLink>
            <HoveredLink to="/features">Export Options</HoveredLink>
            <HoveredLink to="/features">Collaboration Tools</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Book Types">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <div className="space-y-2">
              <h4 className="font-bold text-black dark:text-white">Fiction</h4>
              <HoveredLink to="/book/create">Children's Story</HoveredLink>
              <HoveredLink to="/book/create">Fantasy</HoveredLink>
              <HoveredLink to="/book/create">Science Fiction</HoveredLink>
              <HoveredLink to="/book/create">Romance</HoveredLink>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-black dark:text-white">Non-Fiction</h4>
              <HoveredLink to="/book/create">Educational</HoveredLink>
              <HoveredLink to="/book/create">Biography</HoveredLink>
              <HoveredLink to="/book/create">Self-Help</HoveredLink>
              <HoveredLink to="/book/create">Cookbook</HoveredLink>
            </div>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/help">Help Center</HoveredLink>
            <HoveredLink to="/blog">Blog</HoveredLink>
            <HoveredLink to="/faq">FAQ</HoveredLink>
            <HoveredLink to="/contact">Contact Support</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/dashboard">Dashboard</HoveredLink>
            <HoveredLink to="/account/plan">Pricing Plans</HoveredLink>
            <HoveredLink to="/auth">Sign In</HoveredLink>
            <HoveredLink to="/book/create">Create Book</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
