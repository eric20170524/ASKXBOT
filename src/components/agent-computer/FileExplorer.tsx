import { 
  Upload, RefreshCw, RotateCw, Home, ChevronDown, ChevronRight, Folder, FileText 
} from 'lucide-react';
import { FileNode } from './types';
import { MOCK_FILE_SYSTEM } from './mockData';

interface FileExplorerProps {
  currentView: 'empty' | 'tree';
  setCurrentView: (view: 'empty' | 'tree') => void;
  selectedFile: FileNode | null;
  onFileSelect: (file: FileNode) => void;
  expandedFolders: Set<string>;
  toggleFolder: (folderId: string) => void;
  handleHomeClick: () => void;
}

export default function FileExplorer({
  currentView,
  setCurrentView,
  selectedFile,
  onFileSelect,
  expandedFolders,
  toggleFolder,
  handleHomeClick
}: FileExplorerProps) {

  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.id} style={{ paddingLeft: level === 0 ? 0 : 12 }}>
        <div 
          className={`flex items-center gap-1.5 py-1 px-2 text-xs cursor-pointer hover:bg-gray-100 rounded ${selectedFile?.id === node.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' && (
            <span className="text-gray-400">
              {expandedFolders.has(node.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </span>
          )}
          {node.type === 'folder' ? (
            <Folder size={14} className="text-blue-400" />
          ) : (
            <FileText size={14} className="text-gray-400" />
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && expandedFolders.has(node.id) && node.children && (
          <div className="border-l border-gray-100 ml-2.5">
            {renderTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50/30">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between bg-white h-9">
        <button 
          onClick={() => setCurrentView(currentView === 'empty' ? 'tree' : 'empty')}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-1.5 py-0.5 rounded transition-colors"
        >
          /
        </button>
        <div className="flex items-center gap-1">
          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title="上传文件"><Upload size={14} /></button>
          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title="刷新"><RefreshCw size={14} /></button>
          <button 
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
            title="查看目录"
            onClick={handleHomeClick}
          >
            <Home size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {currentView === 'empty' ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Upload size={20} className="text-gray-300" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">还没有文件</p>
            <p className="text-[10px] text-center mb-3 text-gray-400">上传文件即可开始</p>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-600 shadow-sm hover:bg-gray-50">
              <Upload size={12} />
              上传文件
            </button>
          </div>
        ) : (
          <div className="p-2">
            {renderTree(MOCK_FILE_SYSTEM[0].children || [])}
          </div>
        )}
      </div>
    </div>
  );
}
