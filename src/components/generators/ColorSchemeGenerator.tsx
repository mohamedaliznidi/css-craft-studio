import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Palette } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateColorScheme, getAccessibilityReport } from '../../utils/colorUtils';
import { ColorPicker } from '../ui/ColorPicker';
import { Button } from '../ui/Button';

const ColorSchemeGenerator: React.FC = () => {
  const { colorScheme, setColorScheme } = useGeneratorStore();

  const generateFromPrimary = () => {
    const newScheme = generateColorScheme(colorScheme.primary);
    setColorScheme(newScheme);
  };

  const accessibilityReport = getAccessibilityReport(colorScheme.text, colorScheme.background);
  const secondaryAccessibility = getAccessibilityReport(colorScheme.textSecondary, colorScheme.background);

  const colorKeys = [
    { key: 'primary', label: 'Primary', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary', description: 'Supporting brand color' },
    { key: 'accent', label: 'Accent', description: 'Highlight color' },
    { key: 'background', label: 'Background', description: 'Main background' },
    { key: 'surface', label: 'Surface', description: 'Card/component background' },
    { key: 'text', label: 'Text', description: 'Primary text color' },
    { key: 'textSecondary', label: 'Text Secondary', description: 'Secondary text color' },
  ] as const;

  const getWCAGBadgeColor = (level: string) => {
    switch (level) {
      case 'AAA': return 'bg-green-600 text-white';
      case 'AA': return 'bg-yellow-600 text-white';
      case 'fail': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Palette className="mr-2" size={20} />
              Color Scheme
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={generateFromPrimary}
              className="flex items-center space-x-2"
            >
              <RefreshCw size={14} />
              <span>Generate</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {colorKeys.map(({ key, label, description }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * colorKeys.indexOf({ key, label, description }) }}
                className="p-4 bg-slate-900/50 rounded-lg border border-slate-600"
              >
                <ColorPicker
                  label={label}
                  value={colorScheme[key]}
                  onChange={(color) => setColorScheme({ [key]: color })}
                />
                <p className="text-xs text-slate-400 mt-1">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview & Accessibility */}
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Color Preview</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {colorKeys.map(({ key, label }) => (
              <div key={key} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-slate-600 mb-2"
                  style={{ backgroundColor: colorScheme[key] }}
                />
                <p className="text-xs text-slate-400 truncate">{label}</p>
                <p className="text-xs font-mono text-slate-500">{colorScheme[key]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Demo */}
        <div 
          className="p-6 rounded-xl border"
          style={{ 
            backgroundColor: colorScheme.background,
            borderColor: colorScheme.surface,
          }}
        >
          <h3 
            className="text-xl font-bold mb-4"
            style={{ color: colorScheme.text }}
          >
            Live Preview
          </h3>
          
          <div 
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: colorScheme.surface }}
          >
            <h4 
              className="font-semibold mb-2"
              style={{ color: colorScheme.primary }}
            >
              Card Component
            </h4>
            <p 
              className="text-sm mb-3"
              style={{ color: colorScheme.text }}
            >
              This is primary text content showing how your colors work together.
            </p>
            <p 
              className="text-sm mb-3"
              style={{ color: colorScheme.textSecondary }}
            >
              This is secondary text content with lower emphasis.
            </p>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: colorScheme.primary }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: colorScheme.secondary }}
              >
                Secondary
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: colorScheme.accent }}
              >
                Accent
              </button>
            </div>
          </div>
        </div>

        {/* Accessibility Report */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Accessibility Report</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Primary Text Contrast</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getWCAGBadgeColor(accessibilityReport.wcagLevel)}`}>
                  {accessibilityReport.wcagLevel}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Contrast ratio: {accessibilityReport.contrastRatio}:1
              </p>
              <div className="mt-2 text-xs text-slate-500">
                <div className={accessibilityReport.normalTextCompliant ? 'text-green-400' : 'text-red-400'}>
                  {accessibilityReport.normalTextCompliant ? '✓' : '✗'} Normal text compliant
                </div>
                <div className={accessibilityReport.largeTextCompliant ? 'text-green-400' : 'text-red-400'}>
                  {accessibilityReport.largeTextCompliant ? '✓' : '✗'} Large text compliant
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Secondary Text Contrast</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getWCAGBadgeColor(secondaryAccessibility.wcagLevel)}`}>
                  {secondaryAccessibility.wcagLevel}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Contrast ratio: {secondaryAccessibility.contrastRatio}:1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSchemeGenerator;