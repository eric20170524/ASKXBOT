import { 
  FileText, X, Share, Copy, Upload, Maximize2, Quote, Download 
} from 'lucide-react';
import { FileNode } from './types';

interface FilePreviewProps {
  selectedFile: FileNode | null;
  onCloseFile: () => void;
  isMaximized: boolean;
  setIsMaximized: (maximized: boolean) => void;
  onQuoteFile?: (fileName: string) => void;
}

export default function FilePreview({
  selectedFile,
  onCloseFile,
  isMaximized,
  setIsMaximized,
  onQuoteFile
}: FilePreviewProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {selectedFile ? (
        <>
          <div className="h-9 border-b border-gray-200 flex items-center px-4 bg-white">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FileText size={14} />
              <span>{selectedFile.name}</span>
              <button 
                onClick={onCloseFile}
                className="ml-2 hover:bg-gray-100 p-0.5 rounded"
              >
                <X size={12} />
              </button>
            </div>
            <div className="ml-auto flex items-center gap-2">
               <button 
                 onClick={() => onQuoteFile?.(selectedFile.name)} 
                 className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                 title="引用"
               >
                 <Quote size={14} />
               </button>
               <button 
                 onClick={() => {
                   if (selectedFile.content) {
                     navigator.clipboard.writeText(selectedFile.content);
                   }
                 }} 
                 className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                 title="复制"
               >
                 <Copy size={14} />
               </button>
               <button 
                 className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                 title="下载"
               >
                 <Download size={14} />
               </button>
               <button 
                 onClick={() => setIsMaximized(!isMaximized)} 
                 className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                 title="全屏"
               >
                 <Maximize2 size={14} />
               </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-gray-800 bg-white">
            <pre>{selectedFile.content || '// No content'}</pre>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <div className="w-32 h-24 border border-gray-200 rounded-lg flex flex-col items-center justify-center bg-white shadow-sm mb-4">
            <FileText size={24} className="text-gray-300 mb-2" />
            <p className="text-xs text-gray-500">未选择文件</p>
            <p className="text-[10px] text-gray-400 mt-1">选择一个文件以查看其内容</p>
          </div>
        </div>
      )}
    </div>
  );
}
