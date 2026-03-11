import { useState } from 'react';
import { X, Search, Upload, Bookmark, User } from 'lucide-react';

interface ManageOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgName: string;
}

type Tab = 'general' | 'members';

export default function ManageOrganizationModal({ isOpen, onClose, orgName }: ManageOrganizationModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [confirmOrgName, setConfirmOrgName] = useState('');

  if (!isOpen) return null;

  const handleLeaveOrganization = () => {
    // Logic to leave organization would go here
    console.log('Leaving organization...');
    setShowLeaveConfirmation(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[800px] h-[500px] flex overflow-hidden shadow-xl">
        {/* Sidebar */}
        <div className="w-[200px] bg-[#F7F7F5] p-4 flex flex-col gap-1 border-r border-gray-200">
          <div className="mb-4 px-2">
            <h2 className="font-semibold text-lg text-gray-900">Organization</h2>
            <p className="text-xs text-gray-500">Manage your organization.</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'general' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark size={16} />
            General
          </button>
          
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'members' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User size={16} />
            Members
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="p-8 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">
              {activeTab === 'general' ? 'General' : 'Members'}
            </h2>

            {activeTab === 'general' && (
              <div className="space-y-8">
                {/* Organization Profile */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-gray-100 pb-8">
                    <span className="text-sm font-medium text-gray-700">Organization Profile</span>
                    <div className="flex items-center gap-3 flex-1 ml-12">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">{orgName}</span>
                    </div>
                  </div>
                </div>

                {/* Leave Organization */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">Leave organization</span>
                    <div className="flex-1 ml-12">
                      <button 
                        onClick={() => setShowLeaveConfirmation(true)}
                        className="text-sm text-red-500 hover:text-red-600 font-medium"
                      >
                        Leave organization
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm font-medium text-gray-900">Members</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">2</span>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 font-medium">User</th>
                        <th className="px-4 py-3 font-medium">Joined</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">WC</div>
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-2">
                                WY CHENG
                                <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">You</span>
                              </div>
                              <div className="text-gray-500 text-xs">wy@xbotspace.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">2026/1/22</td>
                        <td className="px-4 py-3 text-gray-500">Member</td>
                        <td className="px-4 py-3"></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100">
                               <img src="https://picsum.photos/seed/user2/200/200" alt="jian1 cai" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">jian1 cai</div>
                              <div className="text-gray-500 text-xs">sonicgg@gmail.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">2026/1/22</td>
                        <td className="px-4 py-3 text-gray-500">Admin</td>
                        <td className="px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leave Confirmation Dialog */}
      {showLeaveConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl w-[400px] p-6 shadow-2xl transform scale-100 transition-all">
            <h3 className="text-lg font-semibold mb-2">Leave organization</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to leave this organization? You will lose access to this organization and its applications.
              <br />
              <span className="text-red-500 font-medium">This action is permanent and irreversible.</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type "{orgName}" below to continue.
              </label>
              <input 
                type="text" 
                value={confirmOrgName}
                onChange={(e) => setConfirmOrgName(e.target.value)}
                placeholder={orgName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowLeaveConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLeaveOrganization}
                disabled={confirmOrgName !== orgName}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  confirmOrgName === orgName
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-red-300 cursor-not-allowed'
                }`}
              >
                Leave organization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
