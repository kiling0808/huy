import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-blue-950 mb-4">StyleSync</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Elevating your personal style through intelligent data analysis and expert fashion curation.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-slate-900 mb-2">Support</h4>
          <a href="#" className="text-sm text-slate-600 hover:text-blue-950">Contact Us</a>
          <a href="#" className="text-sm text-slate-600 hover:text-blue-950">FAQ</a>
          <a href="#" className="text-sm text-slate-600 hover:text-blue-950">Privacy Policy</a>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-blue-950">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-blue-950">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-blue-950">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} StyleSync Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};