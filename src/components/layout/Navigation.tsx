import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Paintbrush, Grid, Move, Droplets, Clock, Box, RotateCcw, SquareRoundCorner } from 'lucide-react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { GeneratorType } from '../../types';

export const Navigation: React.FC = () => {
  const { activeGenerator, setActiveGenerator } = useGeneratorStore();

  const generators = [
    {
      id: 'glassmorphism' as GeneratorType,
      name: 'Glassmorphism',
      description: 'Glass morphism effects',
      icon: Sparkles,
    },
    {
      id: 'gradient' as GeneratorType,
      name: 'Gradients',
      description: 'Advanced gradient generator',
      icon: Paintbrush,
    },
    {
      id: 'color-scheme' as GeneratorType,
      name: 'Color Scheme',
      description: 'Colors with A11y testing',
      icon: Palette,
    },
    {
      id: 'css-grid' as GeneratorType,
      name: 'CSS Grid',
      description: 'Visual grid layout generator',
      icon: Grid,
    },
    {
      id: 'flexbox' as GeneratorType,
      name: 'Flexbox',
      description: 'Flexible layout generator',
      icon: Move,
    },
    {
      id: 'color-shade' as GeneratorType,
      name: 'Color Shades',
      description: 'Generate color variations',
      icon: Droplets,
    },
    {
      id: 'animation-timing' as GeneratorType,
      name: 'Animation Timing',
      description: 'Easing function visualizer',
      icon: Clock,
    },
    {
      id: 'box-shadow' as GeneratorType,
      name: 'Box Shadow',
      description: 'Multi-layer shadow generator',
      icon: Box,
    },
    {
      id: 'transform' as GeneratorType,
      name: 'Transform',
      description: 'CSS transform playground',
      icon: RotateCcw,
    },
    {
      id: 'border-radius' as GeneratorType,
      name: 'Border Radius',
      description: 'Custom border radius designer',
      icon: SquareRoundCorner,
    },
  ];

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Generators
        </h2>
        <div className="space-y-2">
          {generators.map((generator) => {
            const Icon = generator.icon;
            const isActive = activeGenerator === generator.id;
            
            return (
              <motion.button
                key={generator.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveGenerator(generator.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={isActive ? 'text-blue-200' : 'text-slate-400'} />
                  <div>
                    <div className="font-medium">{generator.name}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                      {generator.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};