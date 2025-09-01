import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Play, Pause, RotateCcw } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateAnimationTimingCSS, copyToClipboard } from '../../utils/cssGenerators';

const AnimationTimingGenerator: React.FC = () => {
  const { animationTiming, setAnimationTiming } = useGeneratorStore();
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const presets = [
    { name: 'ease', value: [0.25, 0.1, 0.25, 1] },
    { name: 'ease-in', value: [0.42, 0, 1, 1] },
    { name: 'ease-out', value: [0, 0, 0.58, 1] },
    { name: 'ease-in-out', value: [0.42, 0, 0.58, 1] },
    { name: 'linear', value: [0, 0, 1, 1] },
  ];

  useEffect(() => {
    drawCurve();
  }, [animationTiming.customBezier, animationTiming.preset]);

  const handleCopyCSS = async () => {
    const css = generateAnimationTimingCSS(animationTiming);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    }
  };

  const handlePresetChange = (preset: string) => {
    const presetData = presets.find(p => p.name === preset);
    if (presetData) {
      setAnimationTiming({ 
        preset: preset as any,
        customBezier: presetData.value as [number, number, number, number]
      });
    }
  };

  const handleCustomBezierChange = (index: number, value: number) => {
    const newBezier = [...animationTiming.customBezier] as [number, number, number, number];
    newBezier[index] = value;
    setAnimationTiming({ 
      preset: 'custom',
      customBezier: newBezier
    });
  };

  const drawCurve = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * (width - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw bezier curve
    const [x1, y1, x2, y2] = animationTiming.customBezier;
    
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    const cp1x = padding + x1 * (width - 2 * padding);
    const cp1y = height - padding - y1 * (height - 2 * padding);
    const cp2x = padding + x2 * (width - 2 * padding);
    const cp2y = height - padding - y2 * (height - 2 * padding);
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width - padding, padding);
    ctx.stroke();

    // Draw control points
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(cp1x, cp1y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(cp2x, cp2y, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw control lines
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(cp1x, cp1y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width - padding, padding);
    ctx.lineTo(cp2x, cp2y);
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Convert CSS timing function to Framer Motion format
  const getFramerMotionEasing = () => {
    if (animationTiming.preset === 'custom') {
      return animationTiming.customBezier;
    }

    switch (animationTiming.preset) {
      case 'ease':
        return [0.25, 0.1, 0.25, 1];
      case 'ease-in':
        return [0.42, 0, 1, 1];
      case 'ease-out':
        return [0, 0, 0.58, 1];
      case 'ease-in-out':
        return [0.42, 0, 0.58, 1];
      case 'linear':
        return [0, 0, 1, 1];
      default:
        return [0.25, 0.1, 0.25, 1];
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Animation Timing Function Visualizer</h1>
        <p className="text-slate-400">Visualize and create custom easing functions for smooth animations</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Timing Function</h3>
            
            {/* Presets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetChange(preset.name)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      animationTiming.preset === preset.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
                <button
                  onClick={() => setAnimationTiming({ preset: 'custom' })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    animationTiming.preset === 'custom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  custom
                </button>
              </div>
            </div>

            {/* Custom Bezier Controls */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cubic Bezier Values
              </label>
              <div className="grid grid-cols-2 gap-4">
                {animationTiming.customBezier.map((value, index) => (
                  <div key={index}>
                    <label className="block text-xs text-slate-400 mb-1">
                      {index < 2 ? `P1.${index === 0 ? 'x' : 'y'}` : `P2.${index === 2 ? 'x' : 'y'}`}
                    </label>
                    <input
                      type="number"
                      min={index % 2 === 0 ? "0" : "-2"}
                      max={index % 2 === 0 ? "1" : "3"}
                      step="0.01"
                      value={value}
                      onChange={(e) => handleCustomBezierChange(index, parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                cubic-bezier({animationTiming.customBezier.join(', ')})
              </p>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration: {animationTiming.duration}ms
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={animationTiming.duration}
                onChange={(e) => setAnimationTiming({ duration: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Animation Controls */}
            <div className="flex gap-2">
              <button
                onClick={toggleAnimation}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimating ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </motion.div>
        </div>

        {/* Visualization and Output */}
        <div className="space-y-6">
          {/* Curve Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Bezier Curve</h3>
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="w-full max-w-sm mx-auto bg-slate-900 rounded-lg border border-slate-600"
            />
          </motion.div>

          {/* Animation Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Animation Preview</h3>
            <div className="bg-slate-900 rounded-lg p-6 min-h-[120px] flex items-center">
              <div className="w-full">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                  animate={isAnimating ? { x: 200 } : { x: 0 }}
                  transition={{
                    duration: animationTiming.duration / 1000,
                    ease: getFramerMotionEasing(),
                    repeat: isAnimating ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                  key={`${isAnimating}-${animationTiming.preset}-${animationTiming.customBezier.join(',')}`}
                />
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
              <code>{generateAnimationTimingCSS(animationTiming)}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTimingGenerator;
