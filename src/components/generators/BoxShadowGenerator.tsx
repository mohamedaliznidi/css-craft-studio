import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Plus, Minus, Eye, EyeOff } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateBoxShadowCSS, generateBoxShadowValue, copyToClipboard } from '../../utils/cssGenerators';
import { BoxShadow } from '../../types';

const BoxShadowGenerator: React.FC = () => {
  const { boxShadow, setBoxShadow } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);

  const handleCopyCSS = async () => {
    const css = generateBoxShadowCSS(boxShadow);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const addShadow = () => {
    const newShadow: BoxShadow = {
      id: Date.now().toString(),
      x: 0,
      y: 4,
      blur: 6,
      spread: 0,
      color: '#000000',
      inset: false,
      opacity: 0.3,
    };
    setBoxShadow({ shadows: [...boxShadow.shadows, newShadow] });
  };

  const removeShadow = (id: string) => {
    if (boxShadow.shadows.length > 1) {
      setBoxShadow({ shadows: boxShadow.shadows.filter(s => s.id !== id) });
    }
  };

  const updateShadow = (id: string, updates: Partial<BoxShadow>) => {
    setBoxShadow({
      shadows: boxShadow.shadows.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const shadowPresets = [
    { name: 'Subtle', shadows: [{ id: '1', x: 0, y: 1, blur: 3, spread: 0, color: '#000000', inset: false, opacity: 0.25 }] },
    { name: 'Medium', shadows: [{ id: '1', x: 0, y: 4, blur: 6, spread: -1, color: '#000000', inset: false, opacity: 0.3 }] },
    { name: 'Large', shadows: [{ id: '1', x: 0, y: 10, blur: 15, spread: -3, color: '#000000', inset: false, opacity: 0.35 }] },
    { name: 'Layered', shadows: [
      { id: '1', x: 0, y: 1, blur: 3, spread: 0, color: '#000000', inset: false, opacity: 0.25 },
      { id: '2', x: 0, y: 1, blur: 2, spread: 0, color: '#000000', inset: false, opacity: 0.4 }
    ]},
  ];

  const applyPreset = (preset: typeof shadowPresets[0]) => {
    setBoxShadow({ shadows: preset.shadows });
  };



  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CSS Box Shadow Generator</h1>
        <p className="text-slate-400">Create beautiful box shadows with multiple layers and visual controls</p>
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
            <div className="grid grid-cols-2 gap-2">
              {shadowPresets.map((preset) => (
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

          {/* Shadow Layers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Shadow Layers</h3>
              <button
                onClick={addShadow}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Layer
              </button>
            </div>

            <div className="space-y-4">
              {boxShadow.shadows.map((shadow, index) => (
                <motion.div
                  key={shadow.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-300">Layer {index + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateShadow(shadow.id, { inset: !shadow.inset })}
                        className={`p-1 rounded transition-colors ${
                          shadow.inset 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                        title={shadow.inset ? 'Inset shadow' : 'Outset shadow'}
                      >
                        {shadow.inset ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {boxShadow.shadows.length > 1 && (
                        <button
                          onClick={() => removeShadow(shadow.id)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* X Offset */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">X Offset: {shadow.x}px</label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadow.x}
                        onChange={(e) => updateShadow(shadow.id, { x: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Y Offset */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Y Offset: {shadow.y}px</label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadow.y}
                        onChange={(e) => updateShadow(shadow.id, { y: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Blur */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Blur: {shadow.blur}px</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={shadow.blur}
                        onChange={(e) => updateShadow(shadow.id, { blur: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Spread */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Spread: {shadow.spread}px</label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadow.spread}
                        onChange={(e) => updateShadow(shadow.id, { spread: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="w-8 h-8 bg-slate-700 border border-slate-600 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Opacity */}
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Opacity: {Math.round(shadow.opacity * 100)}%</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={shadow.opacity}
                        onChange={(e) => updateShadow(shadow.id, { opacity: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
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
            <div className="bg-gray-100 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-lg"
                style={{
                  boxShadow: generateBoxShadowValue(boxShadow),
                  backgroundColor: boxShadow.shadows[0]?.color || '#1e293b'
                }}
              />
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
              <code>{generateBoxShadowCSS(boxShadow)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BoxShadowGenerator;
