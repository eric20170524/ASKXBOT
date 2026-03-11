import { useState, useRef, useEffect } from 'react';
import { Lock, Users, Globe, Check, Plus, Copy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddMemberModal from './AddMemberModal';

interface VisibilitySettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
}

type Visibility = 'private' | 'shared' | 'public';

export default function VisibilitySettingsPopover({ isOpen, onClose, anchorRef }: VisibilitySettingsPopoverProps) {
  const [visibility, setVisibility] = useState<Visibility>('private');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Calculate position based on anchor
  const getPosition = () => {
    if (!anchorRef.current) return { top: 0, right: 0 };
    const rect = anchorRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right
    };
  };

  const position = getPosition();

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://app.rebyte.ai/share/6d1ed18...');
    // Could add toast notification here
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ 
              position: 'fixed', 
              top: position.top, 
              right: position.right,
              zIndex: 50 
            }}
            className="w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-base font-medium text-gray-900">可见性</h3>
                <p className="text-xs text-gray-500 mt-1">
                  只有你可以看到此工作区及其任务。
                </p>
              </div>

              <div className="space-y-2">
                {/* Private Option */}
                <button
                  onClick={() => setVisibility('private')}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    visibility === 'private' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Lock size={18} className="mt-0.5 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">私有</span>
                      {visibility === 'private' && <Check size={16} className="text-gray-900" />}
                    </div>
                    <p className="text-xs text-gray-500">仅你可见</p>
                  </div>
                </button>

                {/* Shared Option */}
                <button
                  onClick={() => setVisibility('shared')}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    visibility === 'shared' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Users size={18} className="mt-0.5 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">共享</span>
                      {visibility === 'shared' && <Check size={16} className="text-gray-900" />}
                    </div>
                    <p className="text-xs text-gray-500">所有团队成员可见</p>
                  </div>
                </button>
                
                {visibility === 'shared' && (
                  <p className="text-xs text-red-500 px-3 pb-1">
                    此项目中的所有任务将对组织成员可见。
                  </p>
                )}

                {/* Public Option */}
                <button
                  onClick={() => setVisibility('public')}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    visibility === 'public' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Globe size={18} className="mt-0.5 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">公开</span>
                      {visibility === 'public' && <Check size={16} className="text-gray-900" />}
                    </div>
                    <p className="text-xs text-gray-500">链接持有者可查看</p>
                  </div>
                </button>

                {visibility === 'public' && (
                  <div className="px-1 pb-1 space-y-3">
                    <p className="text-xs text-red-500 px-2">
                      此项目中的所有任务将公开可见。
                    </p>
                    
                    <div className="space-y-1 px-2">
                      <label className="text-xs font-medium text-gray-700">分享链接</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          readOnly
                          value="https://app.rebyte.ai/share/6d1ed18..."
                          className="flex-1 text-xs bg-gray-100 border border-gray-200 rounded px-2 py-1.5 text-gray-600 focus:outline-none"
                        />
                        <button 
                          onClick={handleCopyLink}
                          className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-600"
                          title="复制链接"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">与他人共享</span>
                </div>
                
                <p className="text-xs text-gray-500 mb-3">还没有添加任何人</p>
                
                <button 
                  onClick={() => {
                    onClose(); // Close popover first? Or keep open? Usually modals stack.
                    // Let's keep popover open but maybe it closes due to click outside if modal is portal.
                    // Actually, let's close popover for cleaner UX or handle z-index.
                    // Based on screenshot, it seems to be a separate flow.
                    setIsAddMemberModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                  添加成员
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AddMemberModal 
        isOpen={isAddMemberModalOpen} 
        onClose={() => setIsAddMemberModalOpen(false)} 
      />
    </>
  );
}
