import { X, User, Shield, Plus, MoreHorizontal, Monitor, Smartphone, Laptop, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'profile' | 'security';

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [isConnectingAccount, setIsConnectingAccount] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  const [activeEmailDropdown, setActiveEmailDropdown] = useState<string | null>(null);
  const [activePhoneDropdown, setActivePhoneDropdown] = useState<string | null>(null);
  
  const [profile, setProfile] = useState<{first_name: string, last_name: string, avatar_url: string | null}>({
    first_name: 'WY',
    last_name: 'CHENG',
    avatar_url: null
  });
  const [emails, setEmails] = useState<{address: string, is_primary: boolean, is_verified: boolean, isVerifying?: boolean}[]>([
    { address: 'wy@xbotspace.com', is_primary: true, is_verified: true }
  ]);
  const [phones, setPhones] = useState<{number: string, is_primary: boolean, is_verified: boolean, isVerifying?: boolean}[]>([
    { number: '+86 138-1787-0146', is_primary: true, is_verified: true }
  ]);
  const [connections, setConnections] = useState<{provider: string, provider_account_id: string}[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  
  const [newEmailInput, setNewEmailInput] = useState('');
  const [newPhoneInput, setNewPhoneInput] = useState('');
  
  const emailDropdownRef = useRef<HTMLDivElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target as Node)) {
        setActiveEmailDropdown(null);
      }
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target as Node)) {
        setActivePhoneDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      fetch('/api/v1/account/profile').then(res => res.json()).then(data => {
        if (data.first_name) setProfile(data);
      }).catch(err => console.error(err));

      fetch('/api/v1/account/emails').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setEmails(data);
      }).catch(err => console.error(err));

      fetch('/api/v1/account/phones').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setPhones(data);
      }).catch(err => console.error(err));

      fetch('/api/v1/account/connections').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setConnections(data);
      }).catch(err => console.error(err));

      fetch('/api/v1/account/devices').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setDevices(data);
      }).catch(err => console.error(err));
    }
  }, [isOpen]);

  const handleUpdateProfile = () => {
    fetch('/api/v1/account/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    }).then(() => setIsUpdatingProfile(false)).catch(err => console.error(err));
  };

  const handleAddEmail = () => {
    if (!newEmailInput) return;
    fetch('/api/v1/account/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: newEmailInput })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setEmails([...emails, { address: newEmailInput, is_primary: false, is_verified: false, isVerifying: true }]);
        setIsAddingEmail(false);
        setNewEmailInput('');
      }
    }).catch(err => console.error(err));
  };

  const handleRemoveEmail = (email: string) => {
    fetch(`/api/v1/account/emails/${encodeURIComponent(email)}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setEmails(emails.filter(e => e.address !== email));
        setActiveEmailDropdown(null);
      }
    }).catch(err => console.error(err));
  };

  const handleAddPhone = () => {
    if (!newPhoneInput) return;
    fetch('/api/v1/account/phones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: newPhoneInput })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setPhones([...phones, { number: newPhoneInput, is_primary: false, is_verified: false, isVerifying: true }]);
        setIsAddingPhone(false);
        setNewPhoneInput('');
      }
    }).catch(err => console.error(err));
  };

  const handleRemovePhone = (phone: string) => {
    fetch(`/api/v1/account/phones/${encodeURIComponent(phone)}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setPhones(phones.filter(p => p.number !== phone));
        setActivePhoneDropdown(null);
      }
    }).catch(err => console.error(err));
  };

  const { t } = useLanguage();

  return (
    <>
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl z-50 flex overflow-hidden"
          >
            {/* Sidebar */}
            <div className="w-64 bg-[#F9F9F8] border-r border-gray-200 p-4 flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">{t('accountModal.title')}</h2>
                <p className="text-xs text-gray-500">{t('accountModal.subtitle')}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User size={16} />
                  {t('accountModal.profile')}
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield size={16} />
                  {t('accountModal.security')}
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  {activeTab === 'profile' ? t('accountModal.profileDetails') : t('accountModal.security')}
                </h3>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'profile' ? (
                  <div className="space-y-8">
                    {/* Profile Section */}
                    <div className="flex items-start justify-between py-4 border-b border-gray-100">
                      <div className="flex items-start gap-4 w-full">
                        <span className="text-sm font-medium text-gray-500 w-32 shrink-0 pt-1">{t('accountModal.profile')}</span>
                        {isUpdatingProfile ? (
                          <div className="flex-1 border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-900 mb-4">{t('accountModal.updateProfile')}</div>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                WC
                              </div>
                              <div>
                                <button className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 mb-1">
                                  {t('accountModal.uploadImage')}
                                </button>
                                <div className="text-[10px] text-gray-500">{t('accountModal.uploadImageDesc')}</div>
                              </div>
                            </div>
                            <div className="flex gap-4 mb-4">
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">{t('accountModal.firstName')}</label>
                                <input type="text" value={profile.first_name} onChange={e => setProfile({...profile, first_name: e.target.value})} className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">{t('accountModal.lastName')}</label>
                                <input type="text" value={profile.last_name} onChange={e => setProfile({...profile, last_name: e.target.value})} className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setIsUpdatingProfile(false)} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                                {t('common.cancel')}
                              </button>
                              <button onClick={handleUpdateProfile} className="px-3 py-1.5 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600">
                                {t('common.save')}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                {profile.first_name?.[0]}{profile.last_name?.[0]}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{profile.first_name} {profile.last_name}</span>
                            </div>
                            <button onClick={() => setIsUpdatingProfile(true)} className="text-sm font-medium text-gray-900 hover:text-gray-700">
                              {t('accountModal.updateProfile')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Section */}
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-start justify-between py-2">
                        <div className="flex items-start gap-4 w-full">
                          <span className="text-sm font-medium text-gray-500 w-32 shrink-0 pt-1">{t('accountModal.emailAddresses')}</span>
                          <div className="flex-1">
                            {emails.map((email, index) => (
                              <div key={index} className="mb-2">
                                <div className="flex items-center justify-between w-full mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-900">{email.address}</span>
                                    {email.is_primary && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">{t('accountModal.primary')}</span>
                                    )}
                                    {!email.is_verified && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">{t('accountModal.unverified')}</span>
                                    )}
                                  </div>
                                  <div className="relative" ref={activeEmailDropdown === email.address ? emailDropdownRef : null}>
                                    <button onClick={() => setActiveEmailDropdown(activeEmailDropdown === email.address ? null : email.address)} className="text-gray-400 hover:text-gray-600">
                                      <MoreHorizontal size={16} />
                                    </button>
                                    {activeEmailDropdown === email.address && (
                                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                        {!email.is_verified && (
                                          <button onClick={() => { setEmails(emails.map(e => e.address === email.address ? { ...e, isVerifying: true } : e)); setActiveEmailDropdown(null); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                                            {t('accountModal.completeVerification')}
                                          </button>
                                        )}
                                        <button onClick={() => handleRemoveEmail(email.address)} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                          {t('accountModal.removeEmail')}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {email.isVerifying && (
                                  <div className="border border-gray-200 rounded-lg p-4 mt-2">
                                    <div className="text-sm font-medium text-gray-900 mb-1">{t('accountModal.verifyEmail')}</div>
                                    <div className="text-xs text-gray-500 mb-4">{t('accountModal.clickVerificationLink').replace('{email}', email.address)}</div>
                                    <div className="flex justify-center gap-2 flex-col items-center">
                                      <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                                        {t('accountModal.resendLink')} (56)
                                      </button>
                                      <button onClick={() => setEmails(emails.map(e => e.address === email.address ? { ...e, isVerifying: false } : e))} className="mt-4 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 self-end">
                                        {t('common.cancel')}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            {isAddingEmail ? (
                              <div className="border border-gray-200 rounded-lg p-4 mt-2">
                                <div className="text-sm font-medium text-gray-900 mb-1">{t('accountModal.addEmail')}</div>
                                <div className="text-xs text-gray-500 mb-4">{t('accountModal.addEmailDesc')}</div>
                                <div className="mb-4">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('accountModal.emailAddresses')}</label>
                                  <input type="email" value={newEmailInput} onChange={(e) => setNewEmailInput(e.target.value)} placeholder={t('accountModal.emailPlaceholder')} className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => { setIsAddingEmail(false); setNewEmailInput(''); }} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                                    {t('common.cancel')}
                                  </button>
                                  <button onClick={handleAddEmail} className="px-3 py-1.5 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600">
                                    {t('accountModal.add')}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setIsAddingEmail(true)} className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-700">
                                <Plus size={14} />
                                {t('accountModal.addEmail')}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone Section */}
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-start justify-between py-2">
                        <div className="flex items-start gap-4 w-full">
                          <span className="text-sm font-medium text-gray-500 w-32 shrink-0 pt-1">{t('accountModal.phoneNumbers')}</span>
                          <div className="flex-1">
                            {phones.map((phone, index) => (
                              <div key={index} className="mb-2">
                                <div className="flex items-center justify-between w-full mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-900">{phone.number}</span>
                                    {phone.is_primary && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">{t('accountModal.primary')}</span>
                                    )}
                                    {!phone.is_verified && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">{t('accountModal.unverified')}</span>
                                    )}
                                  </div>
                                  <div className="relative" ref={activePhoneDropdown === phone.number ? phoneDropdownRef : null}>
                                    <button onClick={() => setActivePhoneDropdown(activePhoneDropdown === phone.number ? null : phone.number)} className="text-gray-400 hover:text-gray-600">
                                      <MoreHorizontal size={16} />
                                    </button>
                                    {activePhoneDropdown === phone.number && (
                                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                        {!phone.is_verified && (
                                          <button onClick={() => { setPhones(phones.map(p => p.number === phone.number ? { ...p, isVerifying: true } : p)); setActivePhoneDropdown(null); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                                            {t('accountModal.completeVerification')}
                                          </button>
                                        )}
                                        <button onClick={() => handleRemovePhone(phone.number)} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                          {t('accountModal.removePhone')}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {phone.isVerifying && (
                                  <div className="border border-gray-200 rounded-lg p-4 mt-2">
                                    <div className="text-sm font-medium text-gray-900 mb-1">{t('accountModal.verifyPhone')}</div>
                                    <div className="text-xs text-gray-500 mb-4">{t('accountModal.enterVerificationCode').replace('{phone}', phone.number)}</div>
                                    <div className="mb-4">
                                      <input type="text" placeholder="Code" className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-center tracking-widest" />
                                    </div>
                                    <div className="flex justify-center gap-2 flex-col items-center">
                                      <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                                        {t('accountModal.resendCode')} (56)
                                      </button>
                                      <button onClick={() => setPhones(phones.map(p => p.number === phone.number ? { ...p, isVerifying: false } : p))} className="mt-4 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 self-end">
                                        {t('common.cancel')}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            {isAddingPhone ? (
                              <div className="border border-gray-200 rounded-lg p-4 mt-2">
                                <div className="text-sm font-medium text-gray-900 mb-1">{t('accountModal.addPhone')}</div>
                                <div className="text-xs text-gray-500 mb-4">{t('accountModal.addPhoneDesc')}</div>
                                <div className="mb-4">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('accountModal.phoneNumbers')}</label>
                                  <div className="flex gap-2">
                                    <select className="px-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white">
                                      <option>JP +81</option>
                                      <option>CN +86</option>
                                      <option>US +1</option>
                                    </select>
                                    <input type="tel" value={newPhoneInput} onChange={(e) => setNewPhoneInput(e.target.value)} className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => { setIsAddingPhone(false); setNewPhoneInput(''); }} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                                    {t('common.cancel')}
                                  </button>
                                  <button onClick={handleAddPhone} className="px-3 py-1.5 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600">
                                    {t('accountModal.add')}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setIsAddingPhone(true)} className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-700">
                                <Plus size={14} />
                                {t('accountModal.addPhone')}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connected Accounts Section */}
                    <div>
                      <div className="flex items-start gap-4 py-2">
                        <span className="text-sm font-medium text-gray-500 w-32 shrink-0 pt-1">{t('accountModal.connectedAccounts')}</span>
                        <div className="flex-1 relative">
                          <button onClick={() => setIsConnectingAccount(!isConnectingAccount)} className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-700">
                            <Plus size={14} />
                            {t('accountModal.connectAccount')}
                            <ArrowRight size={14} className="ml-1 text-gray-400" />
                          </button>
                          
                          {isConnectingAccount && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                              <button onClick={() => { setSelectedProvider('Apple'); setShowVerificationModal(true); setIsConnectingAccount(false); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4" />
                                {t('accountModal.connectApple')}
                              </button>
                              <button onClick={() => { setSelectedProvider('GitHub'); setShowVerificationModal(true); setIsConnectingAccount(false); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-4 h-4" />
                                {t('accountModal.connectGithub')}
                              </button>
                              <button onClick={() => { setSelectedProvider('Google'); setShowVerificationModal(true); setIsConnectingAccount(false); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4" />
                                {t('accountModal.connectGoogle')}
                              </button>
                              <button onClick={() => { setSelectedProvider('Microsoft'); setShowVerificationModal(true); setIsConnectingAccount(false); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-4 h-4" />
                                {t('accountModal.connectMicrosoft')}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Password Section */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500 w-32">{t('accountModal.password')}</span>
                        <span className="text-sm font-medium text-gray-900 tracking-widest">••••••••••</span>
                      </div>
                      <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                        {t('accountModal.updatePassword')}
                      </button>
                    </div>

                    {/* Active Devices Section */}
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-medium text-gray-500 w-32">{t('accountModal.activeDevices')}</span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">{t('accountModal.thisDevice')}</span>
                      </div>
                      
                      <div className="ml-36 space-y-6">
                        {devices.length > 0 ? devices.map((device, index) => (
                          <div key={device.id || index} className="flex items-start justify-between group">
                            <div className="flex gap-3">
                              {device.device_type === 'mobile' ? (
                                <Smartphone size={20} className="text-gray-900 mt-0.5" />
                              ) : device.device_type === 'laptop' ? (
                                <Laptop size={20} className="text-gray-900 mt-0.5" />
                              ) : (
                                <Monitor size={20} className="text-gray-900 mt-0.5" />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{device.device_type || 'Unknown Device'}</div>
                                <div className="text-xs text-gray-500">{device.browser || 'Unknown Browser'}</div>
                                <div className="text-xs text-gray-500">{device.ip_address} ({device.location || 'Unknown Location'})</div>
                                <div className="text-xs text-gray-500 mt-1">{t('accountModal.lastActive')}: {new Date(device.last_active_at).toLocaleString()}</div>
                              </div>
                            </div>
                            <button onClick={() => {
                              fetch(`/api/v1/account/devices/${device.id}`, { method: 'DELETE' })
                                .then(res => res.json())
                                .then(data => {
                                  if (data.success) {
                                    setDevices(devices.filter(d => d.id !== device.id));
                                  }
                                }).catch(err => console.error(err));
                            }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity">
                              <X size={16} />
                            </button>
                          </div>
                        )) : (
                          <div className="text-sm text-gray-500">No active devices found.</div>
                        )}
                      </div>
                    </div>

                    {/* Delete Account Section */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-gray-500 w-32">{t('accountModal.deleteAccount')}</span>
                      <button className="text-sm font-medium text-red-500 hover:text-red-600">
                        {t('accountModal.deleteAccount')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden relative"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[#D4A373] rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('accountModal.verificationRequired')}</h3>
                <p className="text-sm text-gray-500 mb-6">{t('accountModal.enterPasswordToContinue')}</p>
                
                <div className="mb-6 text-left">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('accountModal.password')}</label>
                  <div className="relative">
                    <input type="password" placeholder={t('accountModal.enterPassword')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>
                
                <button onClick={() => setShowVerificationModal(false)} className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 mb-4 flex items-center justify-center gap-1">
                  {t('accountModal.continue')}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                
                <button onClick={() => setShowVerificationModal(false)} className="text-sm text-gray-600 hover:text-gray-900 underline">
                  {t('accountModal.useAnotherMethod')}
                </button>
              </div>
              <button onClick={() => setShowVerificationModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
