import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '../../utils/cssGenerators';

// Register only the CSS language to reduce bundle size
SyntaxHighlighter.registerLanguage('css', css);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = React.memo<CodeBlockProps>(({ code, language = 'css' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 hover:scale-105 active:scale-95 transition-all duration-200 z-10 transform"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Copy size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          background: '#0F172A',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '16px',
          margin: 0,
          fontSize: '14px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});