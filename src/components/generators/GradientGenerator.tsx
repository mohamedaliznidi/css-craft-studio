import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { generateGradientCSS } from '../../utils/cssGenerators';
import { Slider } from '../ui/Slider';
import { ColorPicker } from '../ui/ColorPicker';
import { CodeBlock } from '../ui/CodeBlock';
import { Button } from '../ui/Button';

const GradientGenerator: React.FC = () => {
  const { gradient, setGradient } = useGeneratorStore();

  const addColorStop = useCallback(() => {
    const newStop = {
      id: Date.now().toString(),
      color: '#3B82F6',
      position: 50,
    };
    setGradient({
      stops: [...gradient.stops, newStop],
    });
  }, [gradient.stops, setGradient]);

  const removeColorStop = useCallback((id: string) => {
    if (gradient.stops.length > 2) {
      setGradient({
        stops: gradient.stops.filter(stop => stop.id !== id),
      });
    }
  }, [gradient.stops, setGradient]);

  const updateColorStop = useCallback((id: string, updates: Partial<typeof gradient.stops[0]>) => {
    setGradient({
      stops: gradient.stops.map(stop =>
        stop.id === id ? { ...stop, ...updates } : stop
      ),
    });
  }, [gradient.stops, setGradient]);

  const cssCode = useMemo(() => generateGradientCSS(gradient), [gradient]);

  const previewStyle = useMemo(() => ({
    background: cssCode.split('background: ')[1]?.replace(';', '').replace(/\n/g, "").replace('}', "") || '',
  }), [cssCode]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Gradient Type</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['linear', 'radial', 'conic'] as const).map((type) => (
              <Button
                key={type}
                variant={gradient.type === type ? 'primary' : 'outline'}
                onClick={() => setGradient({ type })}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
          
          {(gradient.type === 'linear' || gradient.type === 'conic') && (
            <div className="mt-4">
              <Slider
                label="Direction"
                value={gradient.direction}
                min={0}
                max={360}
                unit="°"
                onChange={(direction) => setGradient({ direction })}
              />
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Color Stops</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addColorStop}
              className="flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Add Stop</span>
            </Button>
          </div>
          
          <div className="space-y-4">
            {gradient.stops.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-900/50 rounded-lg border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-300">Stop {index + 1}</span>
                  {gradient.stops.length > 2 && (
                    <button
                      onClick={() => removeColorStop(stop.id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <ColorPicker
                    label="Color"
                    value={stop.color}
                    onChange={(color) => updateColorStop(stop.id, { color })}
                  />
                  <Slider
                    label="Position"
                    value={stop.position}
                    min={0}
                    max={100}
                    unit="%"
                    onChange={(position) => updateColorStop(stop.id, { position })}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview & Code */}
      <div className="space-y-6">
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
          <div
            className="w-full h-48 rounded-lg"
            style={previewStyle}
          />
          <div className="mt-4 text-center">
            <p className="text-slate-400 text-sm">
              {gradient.type} gradient with {gradient.stops.length} color stops
            </p>
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

export default GradientGenerator;