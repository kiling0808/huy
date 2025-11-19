import React from 'react';
import { ShoppingBag, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
  onLoginClick: () => void;
  currentUser: string | null;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onLoginClick, currentUser }) => {
  return (
    <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo Section */}
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={onLogoClick}
      >
        <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center text-white font-serif italic">
          S
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">StyleSync</h1>
      </div>

      {/* Navigation / Actions */}
      <nav className="flex items-center gap-6">
        <button className="hidden md:block text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors">
          Trends
        </button>
        <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
          {currentUser ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-950">
               <UserIcon size={18} />
               <span>{currentUser}</span>
            </div>
          ) : (
             <button 
              onClick={onLoginClick}
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors flex items-center gap-1"
            >
               Sign In / Register
             </button>
          )}
          <button className="text-slate-600 hover:text-blue-950">
            <ShoppingBag size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};