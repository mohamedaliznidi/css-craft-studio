import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateTransformCSS, copyToClipboard } from '../../utils/cssGenerators';

const TransformGenerator: React.FC = () => {
  const { transform, setTransform } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);

  const handleCopyCSS = async () => {
    const css = generateTransformCSS(transform);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const resetTransform = () => {
    setTransform({
      translateX: 0,
      translateY: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      transformOrigin: 'center',
    });
  };

  const transformOriginOptions = [
    'center', 'top', 'top right', 'right', 'bottom right',
    'bottom', 'bottom left', 'left', 'top left'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CSS Transform Playground</h1>
        <p className="text-slate-400">Experiment with CSS transforms and see the results in real-time</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Transform Properties</h3>
              <button
                onClick={resetTransform}
                className="flex items-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {/* Translate */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Translate</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">X: {transform.translateX}px</label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={transform.translateX}
                      onChange={(e) => setTransform({ translateX: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Y: {transform.translateY}px</label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={transform.translateY}
                      onChange={(e) => setTransform({ translateY: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Rotate */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Rotate</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Angle: {transform.rotate}°</label>
                  <input
                    type="range"
                    min="-360"
                    max="360"
                    value={transform.rotate}
                    onChange={(e) => setTransform({ rotate: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Scale */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Scale</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">X: {transform.scaleX}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={transform.scaleX}
                      onChange={(e) => setTransform({ scaleX: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Y: {transform.scaleY}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={transform.scaleY}
                      onChange={(e) => setTransform({ scaleY: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Skew */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Skew</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">X: {transform.skewX}°</label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      value={transform.skewX}
                      onChange={(e) => setTransform({ skewX: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Y: {transform.skewY}°</label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      value={transform.skewY}
                      onChange={(e) => setTransform({ skewY: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Transform Origin */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Transform Origin</h4>
                <select
                  value={transform.transformOrigin}
                  onChange={(e) => setTransform({ transformOrigin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {transformOriginOptions.map((origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
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
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="bg-slate-900 rounded-lg p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
              {/* Grid background for reference */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Center reference point */}
              <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
              
              {/* Transformed element */}
              <div
                className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-transform duration-300"
                style={{
                  transform: `translate(${transform.translateX}px, ${transform.translateY}px) rotate(${transform.rotate}deg) scale(${transform.scaleX}, ${transform.scaleY}) skew(${transform.skewX}deg, ${transform.skewY}deg)`,
                  transformOrigin: transform.transformOrigin,
                }}
              >
                DIV
              </div>
            </div>
          </motion.div>

          {/* Transform Values Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Current Values</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Translate:</span>
                  <span className="text-white font-mono">{transform.translateX}px, {transform.translateY}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rotate:</span>
                  <span className="text-white font-mono">{transform.rotate}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scale:</span>
                  <span className="text-white font-mono">{transform.scaleX}, {transform.scaleY}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Skew:</span>
                  <span className="text-white font-mono">{transform.skewX}°, {transform.skewY}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Origin:</span>
                  <span className="text-white font-mono">{transform.transformOrigin}</span>
                </div>
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
              <code>{generateTransformCSS(transform)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransformGenerator;
