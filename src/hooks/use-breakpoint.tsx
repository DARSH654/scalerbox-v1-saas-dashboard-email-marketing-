
'use client';

import { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

type Breakpoint = keyof typeof fullConfig.theme.screens;

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const screen = fullConfig.theme.screens[breakpoint]
      // Handle cases where screen size is 'max' or other non-pixel values if necessary
      if (typeof screen === 'string') {
        const mediaQuery = window.matchMedia(`(max-width: ${screen})`);
        
        const handleResize = () => {
          setIsBreakpoint(mediaQuery.matches);
        };

        handleResize(); // Set initial state
        mediaQuery.addEventListener('change', handleResize);
        
        return () => mediaQuery.removeEventListener('change', handleResize);
      }
    }
  }, [breakpoint]);

  return isBreakpoint;
}
