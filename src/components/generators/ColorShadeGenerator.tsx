import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Palette, Check } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateColorShades, copyToClipboard } from '../../utils/cssGenerators';

const ColorShadeGenerator: React.FC = () => {
  const { colorShade, setColorShade } = useGeneratorStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputColor, setInputColor] = useState(colorShade.baseColor);

  useEffect(() => {
    const shades = generateColorShades(colorShade.baseColor);
    setColorShade({ shades });
  }, [colorShade.baseColor, setColorShade]);

  const handleColorChange = (color: string) => {
    setInputColor(color);
    setColorShade({ baseColor: color });
  };

  const handleCopyColor = async (colorValue: string, index: number) => {
    const success = await copyToClipboard(colorValue);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const isValidColor = (color: string): boolean => {
    try {
      const div = document.createElement('div');
      div.style.color = color;
      return div.style.color !== '';
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Color Shade Generator</h1>
        <p className="text-slate-400">Generate 9 beautiful shades from any base color</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Color Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Base Color
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Color Input (hex, rgb, hsl, or color name)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="color"
                  value={isValidColor(inputColor) ? inputColor : '#3B82F6'}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-12 h-10 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer"
                />
              </div>
              {!isValidColor(inputColor) && inputColor && (
                <p className="text-red-400 text-sm mt-1">Invalid color format</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-sm">Preview:</span>
              <div
                className="w-12 h-10 rounded-lg border border-slate-600"
                style={{ backgroundColor: isValidColor(inputColor) ? inputColor : '#3B82F6' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Color Palette Preview */}
        {colorShade.shades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Palette Preview</h3>
            <div className="flex rounded-lg overflow-hidden border border-slate-600">
              {colorShade.shades.map((shade, index) => (
                <div
                  key={index}
                  className="flex-1 h-16 flex items-end justify-center pb-2"
                  style={{ backgroundColor: shade.hex }}
                >
                  <span className="text-xs font-mono text-white drop-shadow-lg">
                    {shade.lightness}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Color Shades */}
        {colorShade.shades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Generated Shades</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorShade.shades.map((shade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
                >
                  <div
                    className="w-full h-20 rounded-lg mb-3 border border-slate-600"
                    style={{ backgroundColor: shade.hex }}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm font-medium">
                        Shade {index + 1} ({shade.lightness}%)
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between group">
                        <span className="text-xs text-slate-400">HEX</span>
                        <button
                          onClick={() => handleCopyColor(shade.hex, index * 3)}
                          className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                        >
                          {shade.hex}
                          {copiedIndex === index * 3 ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between group">
                        <span className="text-xs text-slate-400">RGB</span>
                        <button
                          onClick={() => handleCopyColor(shade.rgb, index * 3 + 1)}
                          className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                        >
                          {shade.rgb}
                          {copiedIndex === index * 3 + 1 ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between group">
                        <span className="text-xs text-slate-400">HSL</span>
                        <button
                          onClick={() => handleCopyColor(shade.hsl, index * 3 + 2)}
                          className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                        >
                          {shade.hsl}
                          {copiedIndex === index * 3 + 2 ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Usage Examples</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">CSS Custom Properties</h4>
              <pre className="bg-slate-900 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto">
                <code>
{`:root {
${colorShade.shades.map((shade, index) => `  --color-${index + 1}: ${shade.hex};`).join('\n')}
}`}
                </code>
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Tailwind CSS Configuration</h4>
              <pre className="bg-slate-900 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto">
                <code>
{`colors: {
  primary: {
${colorShade.shades.map((shade, index) => `    ${(index + 1) * 100}: '${shade.hex}',`).join('\n')}
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ColorShadeGenerator;
