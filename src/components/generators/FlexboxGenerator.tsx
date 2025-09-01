import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Move, Plus, Minus } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateFlexboxCSS, copyToClipboard } from '../../utils/cssGenerators';

const FlexboxGenerator: React.FC = () => {
  const { flexbox, setFlexbox } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [itemCount, setItemCount] = useState(5);

  const handleCopyCSS = async () => {
    const css = generateFlexboxCSS(flexbox);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const addItem = () => {
    if (itemCount < 12) {
      setItemCount(itemCount + 1);
    }
  };

  const removeItem = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const flexItems = Array.from({ length: itemCount }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CSS Flexbox Generator</h1>
        <p className="text-slate-400">Create flexible layouts with visual flexbox controls</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Move className="w-5 h-5" />
              Flexbox Properties
            </h3>
            
            {/* Flex Direction */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Flex Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['row', 'row-reverse', 'column', 'column-reverse'].map((direction) => (
                  <button
                    key={direction}
                    onClick={() => setFlexbox({ flexDirection: direction as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      flexbox.flexDirection === direction
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {direction}
                  </button>
                ))}
              </div>
            </div>

            {/* Justify Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Justify Content
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map((justify) => (
                  <button
                    key={justify}
                    onClick={() => setFlexbox({ justifyContent: justify as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      flexbox.justifyContent === justify
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {justify}
                  </button>
                ))}
              </div>
            </div>

            {/* Align Items */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Align Items
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].map((align) => (
                  <button
                    key={align}
                    onClick={() => setFlexbox({ alignItems: align as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      flexbox.alignItems === align
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Flex Wrap */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Flex Wrap
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['nowrap', 'wrap', 'wrap-reverse'].map((wrap) => (
                  <button
                    key={wrap}
                    onClick={() => setFlexbox({ flexWrap: wrap as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      flexbox.flexWrap === wrap
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {wrap}
                  </button>
                ))}
              </div>
            </div>

            {/* Align Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Align Content
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'].map((content) => (
                  <button
                    key={content}
                    onClick={() => setFlexbox({ alignContent: content as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      flexbox.alignContent === content
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {content}
                  </button>
                ))}
              </div>
            </div>

            {/* Gap */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Gap: {flexbox.gap}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={flexbox.gap}
                onChange={(e) => setFlexbox({ gap: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Item Count */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Items: {itemCount}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={removeItem}
                  disabled={itemCount <= 1}
                  className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="flex-1 text-center text-white font-mono">{itemCount}</span>
                <button
                  onClick={addItem}
                  disabled={itemCount >= 12}
                  className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
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
            <div className="bg-slate-900 rounded-lg p-4 min-h-[300px]">
              <div
                className="w-full h-full border border-slate-600 rounded p-2"
                style={{
                  display: 'flex',
                  flexDirection: flexbox.flexDirection,
                  justifyContent: flexbox.justifyContent,
                  alignItems: flexbox.alignItems,
                  flexWrap: flexbox.flexWrap,
                  alignContent: flexbox.alignContent,
                  gap: `${flexbox.gap}px`,
                  minHeight: '250px',
                }}
              >
                {flexItems.map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded flex items-center justify-center text-white font-mono text-sm min-w-[60px] min-h-[60px] flex-shrink-0"
                    style={{
                      width: flexbox.flexDirection.includes('column') ? 'auto' : '80px',
                      height: flexbox.flexDirection.includes('column') ? '60px' : 'auto',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CSS Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
              <code>{generateFlexboxCSS(flexbox)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlexboxGenerator;
