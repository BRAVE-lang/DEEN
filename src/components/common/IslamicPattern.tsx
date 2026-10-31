// ==============================================================================
// DEEN — Islamic Geometric Art Pattern Component
// ==============================================================================

import React from 'react';

export const IslamicPattern: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.05
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-star-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M30 0 L36 18 L54 18 L40 28 L46 46 L30 34 L14 46 L20 28 L6 18 L24 18 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="30" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <path d="M0 30 L60 30 M30 0 L30 60" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
};
