'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Keyboard Shortcuts component
export const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle with Ctrl/Cmd + /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Shortcuts list
  const shortcuts = [
    { key: 'R', description: 'Reset camera view' },
    { key: 'A', description: 'Toggle auto-rotate' },
    { key: 'S', description: 'Toggle stats panel' },
    { key: 'C', description: 'Toggle configurator' },
    { key: 'M', description: 'Toggle sound' },
    { key: 'N', description: 'Toggle music' },
    { key: 'Esc', description: 'Close current view' },
    { key: 'Ctrl/Cmd + /', description: 'Show/hide keyboard shortcuts' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[var(--z-fixed)] px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors flex items-center gap-2"
      >
        <kbd className="kbd">?</kbd>
        Keyboard Shortcuts
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[var(--z-modal)] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
              <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl hover:bg-dark-700/80 transition-colors"
                  >
                    <div>
                      <kbd className="kbd">{shortcut.key}</kbd>
                    </div>
                    <div className="text-dark-300">{shortcut.description}</div>
                  </div>
                ))}
              </div>

              {/* 3D Controls */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">3D View Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl">
                    <div>
                      <kbd className="kbd">Left Click + Drag</kbd>
                    </div>
                    <div className="text-dark-300">Rotate camera</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl">
                    <div>
                      <kbd className="kbd">Right Click + Drag</kbd>
                    </div>
                    <div className="text-dark-300">Pan camera</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl">
                    <div>
                      <kbd className="kbd">Scroll</kbd>
                    </div>
                    <div className="text-dark-300">Zoom in/out</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl">
                    <div>
                      <kbd className="kbd">Pinch (Touch)</kbd>
                    </div>
                    <div className="text-dark-300">Zoom</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-dark-700/50 text-center text-dark-400 text-sm">
              Press <kbd className="kbd">Esc</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
