import React, { useMemo } from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateGlassmorphismCSS } from '../../utils/cssGenerators';
import { hexToRgba } from '../../utils/colorUtils';
import { Slider } from '../ui/Slider';
import { ColorPicker } from '../ui/ColorPicker';
import { CodeBlock } from '../ui/CodeBlock';

const GlassmorphismGenerator: React.FC = () => {
  const { glassmorphism, setGlassmorphism } = useGeneratorStore();

  const previewStyle = useMemo(() => ({
    background: hexToRgba(glassmorphism.backgroundColor, glassmorphism.backgroundOpacity),
    backdropFilter: `blur(${glassmorphism.backdropBlur}px)`,
    WebkitBackdropFilter: `blur(${glassmorphism.backdropBlur}px)`,
    borderRadius: `${glassmorphism.borderRadius}px`,
    border: `${glassmorphism.borderWidth}px solid ${hexToRgba(
      glassmorphism.borderColor,
      glassmorphism.borderOpacity
    )}`,
    boxShadow: `0 8px 32px 0 ${hexToRgba(
      glassmorphism.shadowColor,
      glassmorphism.shadowIntensity / 10
    )}`,
  }), [glassmorphism]);

  const cssCode = useMemo(() => generateGlassmorphismCSS(glassmorphism), [glassmorphism]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Background</h3>
          <div className="space-y-4">
            <ColorPicker
              label="Background Color"
              value={glassmorphism.backgroundColor}
              onChange={(color) => setGlassmorphism({ backgroundColor: color })}
            />
            <Slider
              label="Background Opacity"
              value={glassmorphism.backgroundOpacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(backgroundOpacity) => setGlassmorphism({ backgroundOpacity })}
            />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Glass Effect</h3>
          <div className="space-y-4">
            <Slider
              label="Backdrop Blur"
              value={glassmorphism.backdropBlur}
              min={0}
              max={40}
              unit="px"
              onChange={(backdropBlur) => setGlassmorphism({ backdropBlur })}
            />
            <Slider
              label="Border Radius"
              value={glassmorphism.borderRadius}
              min={0}
              max={50}
              unit="px"
              onChange={(borderRadius) => setGlassmorphism({ borderRadius })}
            />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Border & Shadow</h3>
          <div className="space-y-4">
            <ColorPicker
              label="Border Color"
              value={glassmorphism.borderColor}
              onChange={(borderColor) => setGlassmorphism({ borderColor })}
            />
            <Slider
              label="Border Width"
              value={glassmorphism.borderWidth}
              min={0}
              max={5}
              unit="px"
              onChange={(borderWidth) => setGlassmorphism({ borderWidth })}
            />
            <Slider
              label="Border Opacity"
              value={glassmorphism.borderOpacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(borderOpacity) => setGlassmorphism({ borderOpacity })}
            />
            <ColorPicker
              label="Shadow Color"
              value={glassmorphism.shadowColor}
              onChange={(shadowColor) => setGlassmorphism({ shadowColor })}
            />
            <Slider
              label="Shadow Intensity"
              value={glassmorphism.shadowIntensity}
              min={0}
              max={10}
              step={0.1}
              onChange={(shadowIntensity) => setGlassmorphism({ shadowIntensity })}
            />
          </div>
        </div>
      </div>

      {/* Preview & Code */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20"></div>
          <div
            className="relative p-8 min-h-[200px] flex items-center justify-center"
            style={previewStyle}
          >
            <div className="text-white text-center">
              <h4 className="text-xl font-semibold mb-2">Glassmorphism Effect</h4>
              <p className="text-white/80">This is your glass element</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Generated CSS</h3>
          <CodeBlock code={cssCode} />
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;