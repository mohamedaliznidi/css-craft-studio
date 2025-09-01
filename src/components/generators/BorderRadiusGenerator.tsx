import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateBorderRadiusCSS, copyToClipboard } from '../../utils/cssGenerators';

const BorderRadiusGenerator: React.FC = () => {
  const { borderRadius, setBorderRadius } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);

  const handleCopyCSS = async () => {
    const css = generateBorderRadiusCSS(borderRadius);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const resetBorderRadius = () => {
    setBorderRadius({
      topLeft: 0,
      topRight: 0,
      bottomRight: 0,
      bottomLeft: 0,
      unit: 'px',
    });
  };

  const presets = [
    { name: 'None', values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 } },
    { name: 'Small', values: { topLeft: 4, topRight: 4, bottomRight: 4, bottomLeft: 4 } },
    { name: 'Medium', values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 } },
    { name: 'Large', values: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 } },
    { name: 'Pill', values: { topLeft: 50, topRight: 50, bottomRight: 50, bottomLeft: 50 } },
    { name: 'Organic', values: { topLeft: 30, topRight: 60, bottomRight: 30, bottomLeft: 60 } },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setBorderRadius({ ...preset.values, unit: preset.name === 'Pill' ? '%' : 'px' });
  };

  const setAllCorners = (value: number) => {
    setBorderRadius({
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CSS Border Radius Designer</h1>
        <p className="text-slate-400">Create custom border radius patterns with visual controls</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Presets</h3>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Border Radius Controls</h3>
              <button
                onClick={resetBorderRadius}
                className="flex items-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {/* Unit Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Unit</label>
                <div className="flex gap-2">
                  {['px', '%', 'rem'].map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setBorderRadius({ unit: unit as any })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        borderRadius.unit === unit
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              {/* All Corners */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  All Corners: {Math.max(borderRadius.topLeft, borderRadius.topRight, borderRadius.bottomRight, borderRadius.bottomLeft)}{borderRadius.unit}
                </label>
                <input
                  type="range"
                  min="0"
                  max={borderRadius.unit === '%' ? "50" : "100"}
                  value={Math.max(borderRadius.topLeft, borderRadius.topRight, borderRadius.bottomRight, borderRadius.bottomLeft)}
                  onChange={(e) => setAllCorners(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Individual Corners */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top Left */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Top Left: {borderRadius.topLeft}{borderRadius.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={borderRadius.unit === '%' ? "50" : "100"}
                    value={borderRadius.topLeft}
                    onChange={(e) => setBorderRadius({ topLeft: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Top Right */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Top Right: {borderRadius.topRight}{borderRadius.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={borderRadius.unit === '%' ? "50" : "100"}
                    value={borderRadius.topRight}
                    onChange={(e) => setBorderRadius({ topRight: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Bottom Right */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Bottom Right: {borderRadius.bottomRight}{borderRadius.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={borderRadius.unit === '%' ? "50" : "100"}
                    value={borderRadius.bottomRight}
                    onChange={(e) => setBorderRadius({ bottomRight: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Bottom Left */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Bottom Left: {borderRadius.bottomLeft}{borderRadius.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={borderRadius.unit === '%' ? "50" : "100"}
                    value={borderRadius.bottomLeft}
                    onChange={(e) => setBorderRadius({ bottomLeft: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview and CSS Output */}
        <div className="space-y-6">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="bg-slate-900 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <div
                className="w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white/20"
                style={{
                  borderRadius: `${borderRadius.topLeft}${borderRadius.unit} ${borderRadius.topRight}${borderRadius.unit} ${borderRadius.bottomRight}${borderRadius.unit} ${borderRadius.bottomLeft}${borderRadius.unit}`
                }}
              />
            </div>
          </motion.div>

          {/* Visual Corner Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Corner Values</h3>
            <div className="relative w-32 h-24 mx-auto bg-slate-700 rounded border border-slate-600">
              {/* Corner labels */}
              <div className="absolute -top-6 -left-6 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                {borderRadius.topLeft}{borderRadius.unit}
              </div>
              <div className="absolute -top-6 -right-6 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                {borderRadius.topRight}{borderRadius.unit}
              </div>
              <div className="absolute -bottom-6 -right-6 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                {borderRadius.bottomRight}{borderRadius.unit}
              </div>
              <div className="absolute -bottom-6 -left-6 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                {borderRadius.bottomLeft}{borderRadius.unit}
              </div>
            </div>
          </motion.div>

          {/* CSS Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Generated CSS</h3>
              <button
                onClick={handleCopyCSS}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  copiedCSS
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Copy className="w-4 h-4" />
                {copiedCSS ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <pre className="bg-slate-900 rounded-lg p-4 text-sm text-slate-300 overflow-x-auto">
              <code>{generateBorderRadiusCSS(borderRadius)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BorderRadiusGenerator;
