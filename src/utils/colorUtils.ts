import chroma from 'chroma-js';
import { AccessibilityReport } from '../types';

// Cache for expensive color calculations
const colorCache = new Map<string, any>();

const getCachedColor = (key: string, computation: () => any) => {
  if (colorCache.has(key)) {
    return colorCache.get(key);
  }
  const result = computation();
  colorCache.set(key, result);
  return result;
};

export const getContrastRatio = (color1: string, color2: string): number => {
  try {
    return chroma.contrast(color1, color2);
  } catch {
    return 1;
  }
};

export const getAccessibilityReport = (
  foreground: string,
  background: string
): AccessibilityReport => {
  const contrastRatio = getContrastRatio(foreground, background);
  
  const normalTextCompliant = contrastRatio >= 4.5;
  const largeTextCompliant = contrastRatio >= 3;
  
  let wcagLevel: 'AA' | 'AAA' | 'fail';
  if (contrastRatio >= 7) {
    wcagLevel = 'AAA';
  } else if (contrastRatio >= 4.5) {
    wcagLevel = 'AA';
  } else {
    wcagLevel = 'fail';
  }
  
  return {
    wcagLevel,
    contrastRatio: Math.round(contrastRatio * 100) / 100,
    largeTextCompliant,
    normalTextCompliant,
  };
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const cacheKey = `hexToRgba:${hex}:${alpha}`;
  return getCachedColor(cacheKey, () => {
    try {
      const rgba = chroma(hex).alpha(alpha).css();
      return rgba;
    } catch {
      return `rgba(255, 255, 255, ${alpha})`;
    }
  });
};

export const generateColorScheme = (baseColor: string) => {
  const cacheKey = `generateColorScheme:${baseColor}`;
  return getCachedColor(cacheKey, () => {
    try {
      const base = chroma(baseColor);

      return {
        primary: baseColor,
        secondary: base.set('hsl.h', '+60').hex(),
        accent: base.set('hsl.h', '+180').hex(),
        background: base.set('hsl.l', 0.05).hex(),
        surface: base.set('hsl.l', 0.1).hex(),
        text: base.set('hsl.l', 0.95).hex(),
        textSecondary: base.set('hsl.l', 0.7).hex(),
      };
    } catch {
      return {
        primary: baseColor,
        secondary: '#14B8A6',
        accent: '#F97316',
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        textSecondary: '#CBD5E1',
      };
    }
  });
};