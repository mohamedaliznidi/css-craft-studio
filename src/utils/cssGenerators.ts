import {
  GlassmorphismConfig,
  GradientConfig,
  CSSGridConfig,
  FlexboxConfig,
  ColorShadeConfig,
  AnimationTimingConfig,
  ColorShade,
  BoxShadowConfig,
  TransformConfig,
  BorderRadiusConfig
} from '../types';
import { hexToRgba } from './colorUtils';
import chroma from 'chroma-js';

export const generateGlassmorphismCSS = (config: GlassmorphismConfig): string => {
  const backgroundColor = hexToRgba(config.backgroundColor, config.backgroundOpacity);
  const borderColor = hexToRgba(config.borderColor, config.borderOpacity);
  const shadowOpacity = config.shadowIntensity / 10;
  const shadowColor = hexToRgba(config.shadowColor, shadowOpacity);
  
  return `.glassmorphism {
  background: ${backgroundColor};
  backdrop-filter: blur(${config.backdropBlur}px);
  -webkit-backdrop-filter: blur(${config.backdropBlur}px);
  border-radius: ${config.borderRadius}px;
  border: ${config.borderWidth}px solid ${borderColor};
  box-shadow: 0 8px 32px 0 ${shadowColor};
}`;
};

export const generateGradientCSS = (config: GradientConfig): string => {
  const stops = config.stops
    .sort((a, b) => a.position - b.position)
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ');
  
  let gradientFunction = '';
  
  switch (config.type) {
    case 'linear':
      gradientFunction = `linear-gradient(${config.direction}deg, ${stops})`;
      break;
    case 'radial':
      gradientFunction = `radial-gradient(circle, ${stops})`;
      break;
    case 'conic':
      gradientFunction = `conic-gradient(from ${config.direction}deg, ${stops})`;
      break;
  }
  
  return `.gradient {
  background: ${gradientFunction};
}`;
};

export const generateCSSGridCSS = (config: CSSGridConfig): string => {
  const gridTemplateAreas = config.gridTemplateAreas
    .map(row => `"${row.join(' ')}"`)
    .join('\n    ');

  return `.css-grid {
  display: grid;
  grid-template-columns: repeat(${config.columns}, 1fr);
  grid-template-rows: repeat(${config.rows}, 1fr);
  grid-template-areas:
    ${gridTemplateAreas};
  column-gap: ${config.columnGap}px;
  row-gap: ${config.rowGap}px;
  justify-items: ${config.justifyItems};
  align-items: ${config.alignItems};
  justify-content: ${config.justifyContent};
  align-content: ${config.alignContent};
}`;
};

export const generateFlexboxCSS = (config: FlexboxConfig): string => {
  return `.flexbox {
  display: flex;
  flex-direction: ${config.flexDirection};
  justify-content: ${config.justifyContent};
  align-items: ${config.alignItems};
  flex-wrap: ${config.flexWrap};
  align-content: ${config.alignContent};
  gap: ${config.gap}px;
}`;
};

export const generateColorShades = (baseColor: string): ColorShade[] => {
  try {
    const base = chroma(baseColor);
    const shades: ColorShade[] = [];

    // Generate 9 shades from lightest (90%) to darkest (10%)
    for (let i = 0; i < 9; i++) {
      const lightness = 0.9 - (i * 0.1); // 90%, 80%, 70%, ..., 10%
      const shade = base.set('hsl.l', lightness);

      shades.push({
        hex: shade.hex(),
        hsl: shade.css('hsl'),
        rgb: shade.css('rgb'),
        lightness: Math.round(lightness * 100),
      });
    }

    return shades;
  } catch (error) {
    console.error('Error generating color shades:', error);
    return [];
  }
};

export const generateAnimationTimingCSS = (config: AnimationTimingConfig): string => {
  let timingFunction = '';

  if (config.preset === 'custom') {
    timingFunction = `cubic-bezier(${config.customBezier.join(', ')})`;
  } else {
    timingFunction = config.preset;
  }

  return `.animated-element {
  animation-timing-function: ${timingFunction};
  animation-duration: ${config.duration}ms;
}`;
};

export const generateBoxShadowCSS = (config: BoxShadowConfig): string => {
  const shadows = config.shadows
    .map(shadow => {
      const { x, y, blur, spread, color, inset, opacity } = shadow;
      const shadowColor = hexToRgba(color, opacity);
      const insetKeyword = inset ? 'inset ' : '';
      return `${insetKeyword}${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`;
    })
    .join(', ');

  return `.box-shadow {
  box-shadow: ${shadows};
}`;
};

export const generateBoxShadowValue = (config: BoxShadowConfig): string => {
  const shadows = config.shadows
    .map(shadow => {
      const { x, y, blur, spread, color, inset, opacity } = shadow;
      const shadowColor = hexToRgba(color, opacity);
      const insetKeyword = inset ? 'inset ' : '';
      return `${insetKeyword}${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`;
    })
    .join(', ');

  return shadows || 'none';
};

export const generateTransformCSS = (config: TransformConfig): string => {
  const transforms = [];

  if (config.translateX !== 0 || config.translateY !== 0) {
    transforms.push(`translate(${config.translateX}px, ${config.translateY}px)`);
  }
  if (config.rotate !== 0) {
    transforms.push(`rotate(${config.rotate}deg)`);
  }
  if (config.scaleX !== 1 || config.scaleY !== 1) {
    transforms.push(`scale(${config.scaleX}, ${config.scaleY})`);
  }
  if (config.skewX !== 0 || config.skewY !== 0) {
    transforms.push(`skew(${config.skewX}deg, ${config.skewY}deg)`);
  }

  const transformValue = transforms.length > 0 ? transforms.join(' ') : 'none';

  return `.transform {
  transform: ${transformValue};
  transform-origin: ${config.transformOrigin};
}`;
};

export const generateBorderRadiusCSS = (config: BorderRadiusConfig): string => {
  const { topLeft, topRight, bottomRight, bottomLeft, unit } = config;

  return `.border-radius {
  border-radius: ${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit};
}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};