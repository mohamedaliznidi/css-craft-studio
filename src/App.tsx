import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeneratorStore } from './store/useGeneratorStore';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';

// Lazy load generator components
const GlassmorphismGenerator = React.lazy(() => import('./components/generators/GlassmorphismGenerator'));
const GradientGenerator = React.lazy(() => import('./components/generators/GradientGenerator'));
const ColorSchemeGenerator = React.lazy(() => import('./components/generators/ColorSchemeGenerator'));
const CSSGridGenerator = React.lazy(() => import('./components/generators/CSSGridGenerator'));
const FlexboxGenerator = React.lazy(() => import('./components/generators/FlexboxGenerator'));
const ColorShadeGenerator = React.lazy(() => import('./components/generators/ColorShadeGenerator'));
const AnimationTimingGenerator = React.lazy(() => import('./components/generators/AnimationTimingGenerator'));
const BoxShadowGenerator = React.lazy(() => import('./components/generators/BoxShadowGenerator'));
const TransformGenerator = React.lazy(() => import('./components/generators/TransformGenerator'));
const BorderRadiusGenerator = React.lazy(() => import('./components/generators/BorderRadiusGenerator'));

function App() {
  const { activeGenerator } = useGeneratorStore();

  const renderGenerator = () => {
    switch (activeGenerator) {
      case 'glassmorphism':
        return <GlassmorphismGenerator />;
      case 'gradient':
        return <GradientGenerator />;
      case 'color-scheme':
        return <ColorSchemeGenerator />;
      case 'css-grid':
        return <CSSGridGenerator />;
      case 'flexbox':
        return <FlexboxGenerator />;
      case 'color-shade':
        return <ColorShadeGenerator />;
      case 'animation-timing':
        return <AnimationTimingGenerator />;
      case 'box-shadow':
        return <BoxShadowGenerator />;
      case 'transform':
        return <TransformGenerator />;
      case 'border-radius':
        return <BorderRadiusGenerator />;
      default:
        return <GlassmorphismGenerator />;
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-80 hidden lg:block">
          <Navigation />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGenerator}
                {...pageTransition}
              >
                <Suspense fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                }>
                  {renderGenerator()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4">
        <div className="grid grid-cols-5 gap-1">
          {['glassmorphism', 'gradient', 'color-scheme', 'css-grid', 'flexbox', 'color-shade', 'animation-timing', 'box-shadow', 'transform', 'border-radius'].map((gen) => (
            <button
              key={gen}
              onClick={() => useGeneratorStore.getState().setActiveGenerator(gen as any)}
              className={`px-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeGenerator === gen
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {gen.charAt(0).toUpperCase() + gen.slice(1).replace('-', ' ').replace('Css', 'CSS')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;