import { X, Upload, Cloud, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AttachFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AttachFilesModal({ isOpen, onClose }: AttachFilesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-auto max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ height: 'fit-content' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Attach Files</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Drop Zone */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-500">
                  <Upload size={20} />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Drop files here</p>
                <p className="text-xs text-gray-500">or click to browse from your computer</p>
              </div>

              {/* Cloud Storage Options */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">G</div>
                  Google Drive
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Cloud size={14} className="text-blue-500" />
                  OneDrive
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
