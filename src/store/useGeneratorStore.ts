import { create } from 'zustand';
import {
  GlassmorphismConfig,
  GradientConfig,
  ColorScheme,
  GeneratorType,
  CSSGridConfig,
  FlexboxConfig,
  ColorShadeConfig,
  AnimationTimingConfig,
  BoxShadowConfig,
  TransformConfig,
  BorderRadiusConfig
} from '../types';

interface GeneratorStore {
  activeGenerator: GeneratorType;
  setActiveGenerator: (generator: GeneratorType) => void;

  // Glassmorphism
  glassmorphism: GlassmorphismConfig;
  setGlassmorphism: (config: Partial<GlassmorphismConfig>) => void;

  // Gradient
  gradient: GradientConfig;
  setGradient: (config: Partial<GradientConfig>) => void;

  // Color Scheme
  colorScheme: ColorScheme;
  setColorScheme: (scheme: Partial<ColorScheme>) => void;

  // CSS Grid
  cssGrid: CSSGridConfig;
  setCSSGrid: (config: Partial<CSSGridConfig>) => void;

  // Flexbox
  flexbox: FlexboxConfig;
  setFlexbox: (config: Partial<FlexboxConfig>) => void;

  // Color Shade
  colorShade: ColorShadeConfig;
  setColorShade: (config: Partial<ColorShadeConfig>) => void;

  // Animation Timing
  animationTiming: AnimationTimingConfig;
  setAnimationTiming: (config: Partial<AnimationTimingConfig>) => void;

  // Box Shadow
  boxShadow: BoxShadowConfig;
  setBoxShadow: (config: Partial<BoxShadowConfig>) => void;

  // Transform
  transform: TransformConfig;
  setTransform: (config: Partial<TransformConfig>) => void;

  // Border Radius
  borderRadius: BorderRadiusConfig;
  setBorderRadius: (config: Partial<BorderRadiusConfig>) => void;
}

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  activeGenerator: 'glassmorphism',
  setActiveGenerator: (generator) => set({ activeGenerator: generator }),
  
  glassmorphism: {
    backgroundColor: '#ffffff',
    backgroundOpacity: 0.25,
    backdropBlur: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderOpacity: 0.18,
    shadowIntensity: 0.8,
    shadowColor: '#000000',
  },
  setGlassmorphism: (config) =>
    set((state) => ({
      glassmorphism: { ...state.glassmorphism, ...config },
    })),
  
  gradient: {
    type: 'linear',
    direction: 45,
    stops: [
      { id: '1', color: '#3B82F6', position: 0 },
      { id: '2', color: '#14B8A6', position: 100 },
    ],
  },
  setGradient: (config) =>
    set((state) => ({
      gradient: { ...state.gradient, ...config },
    })),
  
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#14B8A6',
    accent: '#F97316',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
  },
  setColorScheme: (scheme) =>
    set((state) => ({
      colorScheme: { ...state.colorScheme, ...scheme },
    })),

  cssGrid: {
    columns: 3,
    rows: 3,
    columnGap: 16,
    rowGap: 16,
    gridTemplateAreas: [
      ['header', 'header', 'header'],
      ['sidebar', 'main', 'main'],
      ['footer', 'footer', 'footer']
    ],
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    alignContent: 'stretch',
  },
  setCSSGrid: (config) =>
    set((state) => ({
      cssGrid: { ...state.cssGrid, ...config },
    })),

  flexbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
    gap: 16,
  },
  setFlexbox: (config) =>
    set((state) => ({
      flexbox: { ...state.flexbox, ...config },
    })),

  colorShade: {
    baseColor: '#3B82F6',
    shades: [],
  },
  setColorShade: (config) =>
    set((state) => ({
      colorShade: { ...state.colorShade, ...config },
    })),

  animationTiming: {
    preset: 'ease',
    customBezier: [0.25, 0.1, 0.25, 1],
    duration: 1000,
  },
  setAnimationTiming: (config) =>
    set((state) => ({
      animationTiming: { ...state.animationTiming, ...config },
    })),

  boxShadow: {
    shadows: [
      {
        id: '1',
        x: 0,
        y: 4,
        blur: 6,
        spread: -1,
        color: '#000000',
        inset: false,
        opacity: 0.3,
      },
    ],
  },
  setBoxShadow: (config) =>
    set((state) => ({
      boxShadow: { ...state.boxShadow, ...config },
    })),

  transform: {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    transformOrigin: 'center',
  },
  setTransform: (config) =>
    set((state) => ({
      transform: { ...state.transform, ...config },
    })),

  borderRadius: {
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
    unit: 'px',
  },
  setBorderRadius: (config) =>
    set((state) => ({
      borderRadius: { ...state.borderRadius, ...config },
    })),
}));