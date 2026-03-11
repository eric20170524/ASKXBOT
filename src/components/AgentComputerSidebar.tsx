import { useState } from 'react';
import { 
  X, Maximize2, Minimize2, Code, GitBranch, Terminal, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab, FileNode } from './agent-computer/types';
import { MOCK_FILE_SYSTEM } from './agent-computer/mockData';
import FileExplorer from './agent-computer/FileExplorer';
import FilePreview from './agent-computer/FilePreview';
import ChangesView from './agent-computer/ChangesView';
import TerminalView from './agent-computer/TerminalView';
import BrowserView from './agent-computer/BrowserView';

export type { Tab };

interface AgentComputerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onQuoteFile?: (fileName: string) => void;
}

/**
 * AgentComputerSidebar 组件
 * 
 * Agent 电脑视图侧边栏，提供：
 * 1. 源代码查看器 (Source)
 * 2. 代码变更视图 (Changes)
 * 3. 终端视图 (Terminal)
 * 4. 浏览器预览 (Browser)
 */
export default function AgentComputerSidebar({ isOpen, onClose, activeTab, onTabChange, onQuoteFile }: AgentComputerSidebarProps) {
  // ---------------------------------------------------------------------------
  // 状态管理
  // ---------------------------------------------------------------------------
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentView, setCurrentView] = useState<'empty' | 'tree'>('empty');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  /**
   * 切换文件夹的展开/折叠状态
   */
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  /**
   * 处理文件选择事件
   */
  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
  };

  /**
   * 返回主视图并默认选中特定文件
   */
  const handleHomeClick = () => {
    setCurrentView('tree');
    const defaultFile = MOCK_FILE_SYSTEM[0].children?.find(f => f.name === '.微沙盒');
    if (defaultFile) {
      setSelectedFile(defaultFile);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isMaximized ? '100%' : 800, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="h-full border-l border-gray-200 bg-white flex flex-col shadow-xl z-20 shrink-0 overflow-hidden"
        >
          {/* Header */}
          <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50/50">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm">Agent Computer</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-2 border-b border-gray-200 bg-white">
            <button
              onClick={() => onTabChange('source')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'source' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code size={14} />
              Source
            </button>
            <button
              onClick={() => onTabChange('changes')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'changes' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <GitBranch size={14} />
              Changes
            </button>
            <button
              onClick={() => onTabChange('terminal')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'terminal' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Terminal size={14} />
              Terminal
            </button>
            <button
              onClick={() => onTabChange('browser')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'browser' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Globe size={14} />
              Browser
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden bg-white flex">
            {activeTab === 'source' && (
              <>
                <FileExplorer
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  expandedFolders={expandedFolders}
                  toggleFolder={toggleFolder}
                  handleHomeClick={handleHomeClick}
                />
                <FilePreview
                  selectedFile={selectedFile}
                  onCloseFile={() => setSelectedFile(null)}
                  isMaximized={isMaximized}
                  setIsMaximized={setIsMaximized}
                  onQuoteFile={onQuoteFile}
                />
              </>
            )}

            {activeTab === 'changes' && <ChangesView />}
            {activeTab === 'terminal' && <TerminalView />}
            {activeTab === 'browser' && <BrowserView />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
