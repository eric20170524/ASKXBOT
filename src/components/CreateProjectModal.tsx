import { X, Github } from 'lucide-react';
import { useState } from 'react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, isGithubConnected: boolean) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onCreate }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [isGithubConnected, setIsGithubConnected] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-[480px] p-6 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-1">Create Project</h2>
        <p className="text-sm text-gray-500 mb-6">A project is a persistent environment for your coding tasks</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. my-awesome-app"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">Give your project a descriptive name</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository (optional)
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsGithubConnected(!isGithubConnected)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  isGithubConnected 
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Github size={16} />
                <span>{isGithubConnected ? 'Connected to GitHub' : 'Connect GitHub'}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (projectName.trim()) {
                onCreate(projectName, isGithubConnected);
                setProjectName('');
                setIsGithubConnected(false);
              }
            }}
            disabled={!projectName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
