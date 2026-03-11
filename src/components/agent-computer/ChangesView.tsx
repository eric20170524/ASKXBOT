import { Github, GitBranch } from 'lucide-react';
import { useState } from 'react';
import ConnectRepoModal from './ConnectRepoModal';

export default function ChangesView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <Github size={48} className="text-gray-300 mb-4" />
        <p className="text-sm font-medium text-gray-900 mb-1">No GitHub repository connected</p>
        <p className="text-xs text-gray-500 text-center mb-4">Connect a GitHub repository to track changes.</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <GitBranch size={14} />
          Connect to a repo
        </button>
      </div>
      <ConnectRepoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
