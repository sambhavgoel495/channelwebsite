'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronDown, FolderDown } from 'lucide-react';

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
        className="w-full py-2.5 px-3.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
      >
        <ExternalLink className="w-3.5 h-3.5 text-white shrink-0" />
        <span>{buttonText}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-white/90 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute bottom-full mb-2 ${alignClass} w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-dropdown p-1.5 z-50 text-left`}>
          <div className="px-2.5 py-1.5 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Select Cloud Part
            </span>
            <span className="text-[9px] font-medium text-zinc-400 bg-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800">
              {links.length} Links
            </span>
          </div>

          <div className="py-1 space-y-1">
            {links.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2 rounded-lg bg-zinc-900 hover:bg-orange-600 text-zinc-200 hover:text-white transition-colors text-xs font-medium"
              >
                <div className="flex items-center space-x-2 truncate">
                  <FolderDown className="w-3.5 h-3.5 text-orange-400 group-hover:text-white shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-zinc-800 text-zinc-300 group-hover:bg-white/20 group-hover:text-white rounded ml-2 shrink-0">
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
