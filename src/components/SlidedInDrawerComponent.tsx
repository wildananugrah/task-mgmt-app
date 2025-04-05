'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  from?: 'left' | 'right';
  width?: string;
  children: ReactNode;
};

export default function SlidedInDrawerComponent({
  isOpen,
  onClose,
  from = 'right',
  width="w-full sm:w-11/12 sm:max-w-[95vw]",
  children,
}: Props) {
  const variants = {
    hidden: { x: from === 'right' ? '100%' : '-100%' },
    visible: { x: 0 },
    exit: { x: from === 'right' ? '100%' : '-100%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 bottom-0 ${from === 'right' ? 'right-0' : 'left-0'} ${width} bg-white shadow-lg z-50 p-4 overflow-y-auto`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
