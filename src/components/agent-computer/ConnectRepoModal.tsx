import { X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectRepoModal({ isOpen, onClose }: ConnectRepoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">GitHub 集成</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="px-6 pb-6 pt-2">
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                {/* CLI Device Flow Option */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Github size={24} className="text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">CLI Device Flow</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Personal authorization for individual contributors.
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Not connected</span>
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          Authorize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GitHub App Option */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Github size={24} className="text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">GitHub App</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Organization-wide access. Survives member changes.
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Not installed</span>
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          Install
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
