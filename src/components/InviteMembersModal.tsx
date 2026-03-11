import { useState } from 'react';
import { X, Mail, Copy, Check } from 'lucide-react';

interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgName: string;
}

export default function InviteMembersModal({ isOpen, onClose, orgName }: InviteMembersModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://xbotspace.com/invite/${orgName.toLowerCase().replace(/\s+/g, '-')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send invite would go here
    console.log('Sending invite to:', email, 'as', role);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[480px] p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-2">Invite members</h2>
        <p className="text-sm text-gray-500 mb-6">
          Invite your team members to collaborate in <span className="font-medium text-gray-900">{orgName}</span>.
        </p>

        <form onSubmit={handleSendInvite}>
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  autoFocus
                />
              </div>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Invite link
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly
                value={`https://xbotspace.com/invite/${orgName.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none"
              />
              <button 
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors flex items-center gap-2"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span className="text-sm font-medium">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!email.trim()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                email.trim() ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Send invitations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
