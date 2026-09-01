'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronDown, FolderDown, Sparkles } from 'lucide-react';

interface DriveLinkItem {
  label: string;
  url: string;
  badge?: string;
}

interface Props {
  links: DriveLinkItem[];
  buttonText?: string;
  className?: string;
  menuAlign?: 'left' | 'right' | 'center';
}

export const DriveDropdown: React.FC<Props> = ({
  links,
  buttonText = 'Google Drive',
  className = '',
  menuAlign = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClass = 
    menuAlign === 'right' 
      ? 'right-0' 
      : menuAlign === 'center' 
      ? 'left-1/2 -translate-x-1/2' 
      : 'left-0';

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white text-xs font-black rounded-xl flex items-center justify-center space-x-1.5 shadow-md orange-glow transition-all cursor-pointer"
      >
        <ExternalLink className="w-3.5 h-3.5 text-white shrink-0" />
        <span>{buttonText}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-white/90 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute bottom-full mb-2 ${alignClass} w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-left animate-in fade-in zoom-in-95 duration-150`}>
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Select Download Part</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">2 Links</span>
          </div>

          <div className="py-1 space-y-1">
            {links.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-brand-500 text-slate-100 hover:text-white transition-all text-xs font-extrabold"
              >
                <div className="flex items-center space-x-2 truncate">
                  <FolderDown className="w-4 h-4 text-amber-400 group-hover:text-white shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-black bg-amber-400/20 text-amber-300 group-hover:bg-white/20 group-hover:text-white rounded ml-2 shrink-0">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
