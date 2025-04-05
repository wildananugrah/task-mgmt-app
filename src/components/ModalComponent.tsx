'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalComponent({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md bg-white p-6 rounded-2xl shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
