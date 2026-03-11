import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Users, MoreHorizontal, ChevronDown, Search, Mail } from 'lucide-react';

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'general' | 'members';

export default function OrganizationModal({ isOpen, onClose }: OrganizationModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Mock data
  const workspaceName = "Voice 的工作区";
  const [confirmInput, setConfirmInput] = useState('');

  if (!isOpen) return null;

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-[600px] bg-[#FDFCFB] rounded-xl shadow-2xl z-50 overflow-hidden flex"
          >
            {/* Sidebar */}
            <div className="w-64 bg-[#F3F1EE] p-4 flex flex-col border-r border-gray-200/50">
              <div className="mb-6 px-2">
                <h2 className="text-lg font-bold text-gray-800">组织</h2>
                <p className="text-xs text-gray-500 mt-1">管理您的组织。</p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'general'
                      ? 'bg-[#E8E6E3] text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200/50'
                  }`}
                >
                  <Building2 size={16} />
                  常规
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'members'
                      ? 'bg-[#E8E6E3] text-gray-900'
                      : 'text-gray-600 hover:bg-gray-200/50'
                  }`}
                >
                  <Users size={16} />
                  成员
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8 h-full overflow-y-auto">
                {activeTab === 'general' ? (
                  <GeneralTab 
                    workspaceName={workspaceName} 
                    onLeave={() => setShowLeaveConfirm(true)} 
                  />
                ) : (
                  <MembersTab />
                )}
              </div>
            </div>
          </motion.div>

          {/* Leave Confirmation Modal */}
          {showLeaveConfirm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={() => setShowLeaveConfirm(false)} />
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">离开组织</h3>
                <p className="text-sm text-gray-600 mb-4">
                  您确定要离开此组织吗？您将失去对此组织及其应用程序的访问权限。<br />
                  <span className="text-red-500 font-medium">此操作是永久性的且无法撤销。</span>
                </p>
                
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    在下方输入 "{workspaceName}" 以继续。
                  </label>
                  <input
                    type="text"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    placeholder={workspaceName}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowLeaveConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    取消
                  </button>
                  <button
                    disabled={confirmInput !== workspaceName}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    离开组织
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function GeneralTab({ workspaceName, onLeave }: { workspaceName: string, onLeave: () => void }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">常规</h2>
      
      <div className="flex items-center justify-between py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-300 shadow-sm"></div>
          <span className="font-medium text-gray-900">{workspaceName}</span>
        </div>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 hover:bg-gray-50 rounded-lg transition-colors">
          更新组织简介
        </button>
      </div>

      <div className="py-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">离开组织</span>
          <button 
            onClick={onLeave}
            className="text-sm font-medium text-red-500 hover:text-red-600 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
          >
            离开组织
          </button>
        </div>
      </div>
    </div>
  );
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: '行政' | '成员';
  joinDate: string;
  isCurrentUser?: boolean;
}

function MembersTab() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'success'>('idle');
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: '语音通讯', email: 'voicecomm3@proton.me', role: '行政', joinDate: '2026/2/26', isCurrentUser: true }
  ]);
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  // Close action menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeActionMenu && !(event.target as Element).closest('.action-menu-trigger')) {
        setActiveActionMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeActionMenu]);

  // Reset invite status when closing invite
  React.useEffect(() => {
    if (!isInviteOpen) {
      setInviteStatus('idle');
    }
  }, [isInviteOpen]);

  const handleRoleChange = (memberId: string, newRole: '行政' | '成员') => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const handleSendInvite = () => {
    // In a real app, you would send the invite here
    setInviteStatus('success');
  };

  const handleInviteDone = () => {
    setInviteStatus('idle');
    setIsInviteOpen(false);
  };

  return (
    <div className="max-w-3xl relative">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">成员</h2>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          <button className="px-3 py-1 rounded-full bg-white shadow-sm text-xs font-medium text-gray-900">成员 {members.length}</button>
          <button className="px-3 py-1 rounded-full text-xs font-medium text-gray-500 hover:text-gray-700">邀请 0</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button 
          onClick={() => setIsInviteOpen(!isInviteOpen)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            isInviteOpen 
              ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isInviteOpen ? '取消邀请' : '邀请'}
        </button>
      </div>

      {/* Inline Invite Form */}
      <AnimatePresence>
        {isInviteOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#F3F1EE] rounded-xl p-4 border border-gray-200/50">
              {inviteStatus === 'idle' ? (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">邀请成员</h3>
                  <p className="text-xs text-gray-500 mb-3">邀请新成员加入此组织</p>
                  
                  <textarea
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 resize-none bg-white mb-3"
                    placeholder="输入或粘贴一个或多个电子邮件地址，用空格或逗号分隔"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-xs font-medium focus:outline-none focus:border-gray-400 cursor-pointer hover:bg-gray-50">
                        <option>角色: 成员</option>
                        <option>角色: 行政</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsInviteOpen(false)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200/50 rounded-lg transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSendInvite}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        发送邀请
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <Mail className="text-gray-600" size={24} />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-6">邀请成功发送</h3>
                  <button
                    onClick={handleInviteDone}
                    className="px-4 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    完成
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-medium w-1/2">用户</th>
              <th className="px-4 py-3 font-medium">加入</th>
              <th className="px-4 py-3 font-medium">角色</th>
              <th className="px-4 py-3 font-medium text-right">行动</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member.id} className="group hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-medium">
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.name} 
                        {member.isCurrentUser && <span className="text-xs text-gray-400 font-normal ml-1">您</span>}
                      </div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{member.joinDate}</td>
                <td className="px-4 py-3">
                  <div className="relative inline-block">
                    <select 
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value as '行政' | '成员')}
                      className="appearance-none bg-white border border-gray-200 text-gray-700 py-1 pl-2 pr-6 rounded-md text-xs font-medium focus:outline-none focus:border-gray-400 cursor-pointer hover:bg-gray-50"
                    >
                      <option value="行政">行政</option>
                      <option value="成员">成员</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveActionMenu(activeActionMenu === member.id ? null : member.id);
                    }}
                    className="action-menu-trigger text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  
                  {activeActionMenu === member.id && (
                    <div className="absolute right-8 top-8 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                      <button
                        onClick={() => {
                          setMemberToRemove(member);
                          setActiveActionMenu(null);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                      >
                        移除成员
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Remove Member Confirmation Modal */}
      {memberToRemove && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={() => setMemberToRemove(null)} />
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">移除成员</h3>
            <p className="text-sm text-gray-600 mb-6">
              您确定要从组织中移除 <span className="font-medium text-gray-900">{memberToRemove.name}</span> 吗？
              他们将失去对组织资源的访问权限。
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMemberToRemove(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setMembers(members.filter(m => m.id !== memberToRemove.id));
                  setMemberToRemove(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                移除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
