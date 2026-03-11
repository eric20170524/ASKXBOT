import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Key, Plus, X, Copy, Check, Trash2 } from 'lucide-react';

export default function SettingsApiKeys() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<{ id: string; name: string; prefix: string; created: string; lastUsed: string }[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyDesc, setNewKeyDesc] = useState('');
  const [expiration, setExpiration] = useState('never');

  const handleCreateKey = () => {
    // Mock key creation
    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newKeyName || 'New API Key',
      prefix: 'rbk_' + Math.random().toString(36).substr(2, 5),
      created: new Date().toLocaleDateString(),
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
    setIsModalOpen(false);
    setNewKeyName('');
    setNewKeyDesc('');
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settings.apiKeys.title')}</h1>
          <p className="text-gray-500">{t('settings.apiKeys.description')}</p>
          <p className="text-gray-500 text-sm mt-2">{t('settings.apiKeys.createDesc')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shrink-0"
        >
          <Plus size={16} />
          {t('settings.apiKeys.createKey')}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{t('settings.apiKeys.activeKeys')}</h3>
        <p className="text-sm text-gray-500 mb-4">{t('settings.apiKeys.activeKeysDesc')}</p>
        {apiKeys.length === 0 ? (
          <div className="text-left py-4 text-gray-500 text-sm">
            {t('settings.apiKeys.noActiveKeys')}
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <Key size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{key.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{key.prefix}...</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{t('settings.apiKeys.created')}: {key.created}</div>
                    <div className="text-xs text-gray-400">{t('settings.apiKeys.lastUsed')}: {key.lastUsed}</div>
                  </div>
                  <button 
                    onClick={() => handleDeleteKey(key.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{t('settings.apiKeys.apiDocs')}</h3>
        <p className="text-sm text-gray-500 mb-4">{t('settings.apiKeys.apiDocsDesc')}</p>
        <p className="text-sm text-gray-500 mb-4">
          {t('settings.apiKeys.apiDocsCodeDesc').split('API_KEY').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800 font-mono text-xs">API_KEY</code>}
            </span>
          ))}
        </p>
        <div className="bg-[#f5f0e6] rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs text-gray-600 font-mono">
{`curl -X POST https://api.rebyte.ai/v1/tasks \\
  -H "API_KEY: rbk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Hello world", "agentProfile": "opencode"}'`}
          </pre>
        </div>
      </div>

      {/* Create Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('settings.apiKeys.modalTitle')}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">{t('settings.apiKeys.modalDesc')}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.apiKeys.nameLabel')}</label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder={t('settings.apiKeys.namePlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.apiKeys.descLabel')}</label>
                <textarea 
                  value={newKeyDesc}
                  onChange={(e) => setNewKeyDesc(e.target.value)}
                  placeholder={t('settings.apiKeys.descPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.apiKeys.expirationLabel')}</label>
                <select 
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-white"
                >
                  <option value="never">{t('settings.apiKeys.neverExpire')}</option>
                  <option value="30d">{t('settings.apiKeys.days30')}</option>
                  <option value="90d">{t('settings.apiKeys.days90')}</option>
                  <option value="180d">{t('settings.apiKeys.days180')}</option>
                  <option value="1y">{t('settings.apiKeys.year1')}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('settings.apiKeys.cancel')}
              </button>
              <button 
                onClick={handleCreateKey}
                className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
              >
                {t('settings.apiKeys.createKey')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
