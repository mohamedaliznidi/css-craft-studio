import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Grid, Plus, Minus } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateCSSGridCSS, copyToClipboard } from '../../utils/cssGenerators';

const CSSGridGenerator: React.FC = () => {
  const { cssGrid, setCSSGrid } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);

  const handleCopyCSS = async () => {
    const css = generateCSSGridCSS(cssGrid);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const updateGridTemplateAreas = (rowIndex: number, colIndex: number, value: string) => {
    const newAreas = [...cssGrid.gridTemplateAreas];
    newAreas[rowIndex][colIndex] = value;
    setCSSGrid({ gridTemplateAreas: newAreas });
  };

  const addColumn = () => {
    if (cssGrid.columns < 6) {
      const newAreas = cssGrid.gridTemplateAreas.map(row => [...row, `area${cssGrid.columns + 1}`]);
      setCSSGrid({ 
        columns: cssGrid.columns + 1,
        gridTemplateAreas: newAreas
      });
    }
  };

  const removeColumn = () => {
    if (cssGrid.columns > 1) {
      const newAreas = cssGrid.gridTemplateAreas.map(row => row.slice(0, -1));
      setCSSGrid({ 
        columns: cssGrid.columns - 1,
        gridTemplateAreas: newAreas
      });
    }
  };

  const addRow = () => {
    if (cssGrid.rows < 6) {
      const newRow = Array(cssGrid.columns).fill(`area${cssGrid.rows + 1}`);
      setCSSGrid({ 
        rows: cssGrid.rows + 1,
        gridTemplateAreas: [...cssGrid.gridTemplateAreas, newRow]
      });
    }
  };

  const removeRow = () => {
    if (cssGrid.rows > 1) {
      setCSSGrid({ 
        rows: cssGrid.rows - 1,
        gridTemplateAreas: cssGrid.gridTemplateAreas.slice(0, -1)
      });
    }
  };

  const gridItems = Array.from({ length: cssGrid.columns * cssGrid.rows }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CSS Grid Generator</h1>
        <p className="text-slate-400">Create responsive grid layouts with visual controls</p>
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
              <Grid className="w-5 h-5" />
              Grid Structure
            </h3>
            
            {/* Columns and Rows */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Columns: {cssGrid.columns}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={removeColumn}
                    disabled={cssGrid.columns <= 1}
                    className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="flex-1 text-center text-white font-mono">{cssGrid.columns}</span>
                  <button
                    onClick={addColumn}
                    disabled={cssGrid.columns >= 6}
                    className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rows: {cssGrid.rows}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={removeRow}
                    disabled={cssGrid.rows <= 1}
                    className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="flex-1 text-center text-white font-mono">{cssGrid.rows}</span>
                  <button
                    onClick={addRow}
                    disabled={cssGrid.rows >= 6}
                    className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gap Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Column Gap: {cssGrid.columnGap}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={cssGrid.columnGap}
                  onChange={(e) => setCSSGrid({ columnGap: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Row Gap: {cssGrid.rowGap}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={cssGrid.rowGap}
                  onChange={(e) => setCSSGrid({ rowGap: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Alignment Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Justify Items
                </label>
                <select
                  value={cssGrid.justifyItems}
                  onChange={(e) => setCSSGrid({ justifyItems: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="start">Start</option>
                  <option value="end">End</option>
                  <option value="center">Center</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Align Items
                </label>
                <select
                  value={cssGrid.alignItems}
                  onChange={(e) => setCSSGrid({ alignItems: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="start">Start</option>
                  <option value="end">End</option>
                  <option value="center">Center</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Grid Template Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Grid Template Areas</h3>
            <div className="space-y-2">
              {cssGrid.gridTemplateAreas.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((area, colIndex) => (
                    <input
                      key={`${rowIndex}-${colIndex}`}
                      type="text"
                      value={area}
                      onChange={(e) => updateGridTemplateAreas(rowIndex, colIndex, e.target.value)}
                      className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`area${colIndex + 1}`}
                    />
                  ))}
                </div>
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
            <div className="bg-slate-900 rounded-lg p-4 min-h-[300px]">
              <div
                className="w-full h-full border border-slate-600 rounded"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cssGrid.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${cssGrid.rows}, 1fr)`,
                  gridTemplateAreas: cssGrid.gridTemplateAreas
                    .map(row => `"${row.join(' ')}"`)
                    .join(' '),
                  columnGap: `${cssGrid.columnGap}px`,
                  rowGap: `${cssGrid.rowGap}px`,
                  justifyItems: cssGrid.justifyItems,
                  alignItems: cssGrid.alignItems,
                  minHeight: '250px',
                }}
              >
                {gridItems.map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded flex items-center justify-center text-white font-mono text-sm"
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
              <code>{generateCSSGridCSS(cssGrid)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CSSGridGenerator;
