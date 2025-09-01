import React from 'react';
import { Palette } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CSS Craft Studio</h1>
              <p className="text-xs text-slate-400">CSS Generator Suite</p>
            </div>
          </div>
          
          <div className="text-sm text-slate-400">
            v1.0.0
          </div>
        </div>
      </div>
    </header>
  );
};