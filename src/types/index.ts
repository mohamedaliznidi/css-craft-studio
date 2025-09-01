export interface GlassmorphismConfig {
  backgroundColor: string;
  backgroundOpacity: number;
  backdropBlur: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  borderOpacity: number;
  shadowIntensity: number;
  shadowColor: string;
}

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientConfig {
  type: 'linear' | 'radial' | 'conic';
  direction: number;
  stops: ColorStop[];
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface AccessibilityReport {
  wcagLevel: 'AA' | 'AAA' | 'fail';
  contrastRatio: number;
  largeTextCompliant: boolean;
  normalTextCompliant: boolean;
}

// CSS Grid Generator Types
export interface CSSGridConfig {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
  gridTemplateAreas: string[][];
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
  justifyContent: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
}

// CSS Flexbox Generator Types
export interface FlexboxConfig {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  gap: number;
}

// Color Shade Generator Types
export interface ColorShade {
  hex: string;
  hsl: string;
  rgb: string;
  lightness: number;
}

export interface ColorShadeConfig {
  baseColor: string;
  shades: ColorShade[];
}

// Animation Timing Function Types
export interface CubicBezierPoint {
  x: number;
  y: number;
}

export interface AnimationTimingConfig {
  preset: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'custom';
  customBezier: [number, number, number, number];
  duration: number;
}

// Box Shadow Generator Types
export interface BoxShadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
  opacity: number;
}

export interface BoxShadowConfig {
  shadows: BoxShadow[];
}

// Transform Generator Types
export interface TransformConfig {
  translateX: number;
  translateY: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  transformOrigin: string;
}

// Border Radius Generator Types
export interface BorderRadiusConfig {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  unit: 'px' | '%' | 'rem';
}

export type GeneratorType = 'glassmorphism' | 'gradient' | 'color-scheme' | 'css-grid' | 'flexbox' | 'color-shade' | 'animation-timing' | 'box-shadow' | 'transform' | 'border-radius';