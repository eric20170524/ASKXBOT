import { useState, useEffect } from 'react';
import { User, Mail, Settings, MessageSquare, Bell, Volume2, Send, X, ExternalLink, Check, Play } from 'lucide-react';
import AccountModal from './AccountModal';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsAccount() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedSound, setSelectedSound] = useState('windChime');
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [telegramModalStep, setTelegramModalStep] = useState(1);
  const { t, language, setLanguage } = useLanguage();
  
  const [profile, setProfile] = useState<{first_name: string, last_name: string, avatar_url: string | null}>({
    first_name: 'WY',
    last_name: 'CHENG',
    avatar_url: null
  });
  const [primaryEmail, setPrimaryEmail] = useState('wy@xbotspace.com');

  useEffect(() => {
    // Fetch profile
    fetch('/api/v1/account/profile')
      .then(res => res.json())
      .then(data => {
        if (data.first_name) {
          setProfile(data);
        }
      })
      .catch(err => console.error('Failed to fetch profile:', err));

    // Fetch settings
    fetch('/api/v1/account/settings')
      .then(res => res.json())
      .then(data => {
        if (data.language) {
          setLanguage(data.language as 'en' | 'zh');
          setSoundEnabled(data.sound_enabled);
          setSelectedSound(data.notification_sound);
        }
      })
      .catch(err => console.error('Failed to fetch settings:', err));

    // Fetch primary email
    fetch('/api/v1/account/emails')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const primary = data.find(e => e.is_primary);
          if (primary) {
            setPrimaryEmail(primary.address);
          }
        }
      })
      .catch(err => console.error('Failed to fetch emails:', err));
  }, []);

  const handleLanguageChange = (newLang: 'en' | 'zh') => {
    setLanguage(newLang);
    fetch('/api/v1/account/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: newLang })
    }).catch(err => console.error('Failed to update language:', err));
  };

  const handleSoundToggle = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    fetch('/api/v1/account/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sound_enabled: newSoundEnabled })
    }).catch(err => console.error('Failed to update sound setting:', err));
  };

  const handleSoundChange = (sound: string) => {
    setSelectedSound(sound);
    fetch('/api/v1/account/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_sound: sound })
    }).catch(err => console.error('Failed to update notification sound:', err));
  };

  const handleGenerateLink = () => {
    setTelegramModalStep(2);
  };

  const handleOpenTelegram = () => {
    window.open('/telegram-auth', '_blank');
  };

  const handleCloseTelegramModal = () => {
    setIsTelegramModalOpen(false);
    setTimeout(() => setTelegramModalStep(1), 300); // Reset step after modal closes
  };

  return (
    <div className="max-w-3xl">
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.account.title')}</h1>
        <p className="text-sm text-gray-500">{t('settings.account.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-1">{t('settings.account.title')}</h2>
          <p className="text-xs text-gray-500 mb-6">Your personal account details</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <User size={16} className="text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">{t('settings.account.fullName')}</div>
                <div className="text-sm text-gray-900">{profile.first_name} {profile.last_name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">{t('settings.account.email')}</div>
                <div className="text-sm text-gray-900">{primaryEmail}</div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsAccountModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Settings size={14} />
            {t('common.edit')}
          </button>
        </div>

        {/* General */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-1">General</h2>
          <p className="text-xs text-gray-500 mb-6">Manage your preferences</p>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">{t('settings.account.language')}</label>
            <select 
              className="w-full max-w-xs px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'zh')}
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>

        {/* Sound Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-1">{t('settings.account.soundSettings.title')}</h2>
          <p className="text-xs text-gray-500 mb-6">{t('settings.account.soundSettings.desc')}</p>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm font-medium text-gray-900">{t('settings.account.soundSettings.enableTitle')}</div>
              <div className="text-xs text-gray-500">{t('settings.account.soundSettings.enableDesc')}</div>
            </div>
            <button 
              onClick={handleSoundToggle}
              className={`w-11 h-6 rounded-full transition-colors relative ${soundEnabled ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {soundEnabled && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-900 mb-2">{t('settings.account.soundSettings.notificationSound')}</div>
              {[
                { id: 'windChime', label: t('settings.account.soundSettings.sounds.windChime') },
                { id: 'bell', label: t('settings.account.soundSettings.sounds.bell') },
                { id: 'success', label: t('settings.account.soundSettings.sounds.success') },
                { id: 'dingDong', label: t('settings.account.soundSettings.sounds.dingDong') },
              ].map((sound) => (
                <div key={sound.id} className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="notificationSound"
                      value={sound.id}
                      checked={selectedSound === sound.id}
                      onChange={() => handleSoundChange(sound.id)}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-sm text-gray-700">{sound.label}</span>
                  </label>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Play size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Telegram */}
        <div className="bg-[#FFFBF5] rounded-xl border border-[#F5EFE6] p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-[#D4B483] rounded-full flex items-center justify-center text-white">
              <Send size={10} />
            </div>
            <h2 className="text-sm font-medium text-gray-900">Telegram</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">Connect your Telegram account to send tasks from anywhere</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Not connected</span>
            <button 
              onClick={() => setIsTelegramModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C8A673] text-white rounded-lg text-sm font-medium hover:bg-[#B89663] transition-colors"
            >
              <Send size={14} />
              Connect Telegram
            </button>
          </div>
        </div>

        {/* Slack */}
        <div className="bg-[#FFFBF5] rounded-xl border border-[#F5EFE6] p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-[#D4B483] rounded-full flex items-center justify-center text-white">
              <MessageSquare size={10} />
            </div>
            <h2 className="text-sm font-medium text-gray-900">Slack</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">Connect your Slack account to create and manage tasks from Slack</p>

          <div className="text-sm text-gray-500">
            Not connected — DM the bot in Slack to link your account
          </div>
        </div>
      </div>

      {/* Telegram Modal */}
      {isTelegramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Send size={18} className="text-gray-900" />
                <h3 className="text-lg font-bold text-gray-900">{t('settings.account.telegramModal.title')}</h3>
              </div>
              <button 
                onClick={handleCloseTelegramModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-900 mb-4">{t('settings.account.telegramModal.subtitle')}</p>

            {telegramModalStep === 1 ? (
              <>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {t('settings.account.telegramModal.desc')}
                </p>
                <button 
                  onClick={handleGenerateLink}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Send size={16} />
                  {t('settings.account.telegramModal.generateLink')}
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">1</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('settings.account.telegramModal.step1Title')}</div>
                      <div className="text-xs text-gray-500 mt-1">{t('settings.account.telegramModal.step1Desc')}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">2</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t('settings.account.telegramModal.step2Title')}</div>
                      <div className="text-xs text-gray-500 mt-1">{t('settings.account.telegramModal.step2Desc')}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={handleOpenTelegram}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    {t('settings.account.telegramModal.openTelegram')}
                  </button>
                  <button 
                    onClick={handleCloseTelegramModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Check size={16} />
                    {t('settings.account.telegramModal.done')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
