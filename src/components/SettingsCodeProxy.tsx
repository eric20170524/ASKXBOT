import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle2, Circle, Check, Eye, EyeOff } from 'lucide-react';

export default function SettingsCodeProxy() {
  const { t } = useLanguage();

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [editingApiKeys, setEditingApiKeys] = useState<Record<string, string>>({});
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});

  const [proxies, setProxies] = useState([
    {
      id: 'gemini-cli',
      name: 'Gemini CLI',
      enabled: true,
      authType: 'rebyte', // 'org' or 'rebyte'
      models: ['gemini-1.5-pro'],
      availableModels: [
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Latest)' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' }
      ]
    },
    {
      id: 'claude-code',
      name: 'Claude Code',
      enabled: true,
      authType: 'rebyte',
      models: ['claude-3-opus'],
      availableModels: [
        { id: 'minimax-2.5', name: 'Minimax 2.5' },
        { id: 'kimi-2.5', name: 'Kimi 2.5' },
        { id: 'glm-5', name: 'GLM 5' },
        { id: 'qwen-3-max', name: 'Qwen 3 Max' },
        { id: 'gpt-5.4', name: 'GPT-5.4' },
        { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex' },
        { id: 'claude-3-opus', name: 'Claude Opus 4.6' },
        { id: 'claude-3-sonnet', name: 'Claude Sonnet 4.6' },
        { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
        { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro' }
      ]
    },
    {
      id: 'openai-scripts',
      name: 'OpenAI Codex',
      enabled: true,
      authType: 'rebyte',
      models: ['gpt-5.4'],
      availableModels: [
        { id: 'gpt-5.4', name: 'GPT-5.4' },
        { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex' }
      ]
    },
    {
      id: 'rebyte-code',
      name: 'Rebyte Code',
      enabled: true,
      authType: 'rebyte', // Rebyte Code might only have 'rebyte' auth type or none if it's internal? Assuming same structure.
      models: ['claude-3-opus'],
      availableModels: [
        { id: 'minimax-2.5', name: 'Minimax 2.5' },
        { id: 'kimi-2.5', name: 'Kimi 2.5' },
        { id: 'glm-5', name: 'GLM 5' },
        { id: 'qwen-3-max', name: 'Qwen 3 Max' },
        { id: 'gpt-5.4', name: 'GPT-5.4' },
        { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex' },
        { id: 'claude-3-opus', name: 'Claude Opus 4.6' },
        { id: 'claude-3-sonnet', name: 'Claude Sonnet 4.6' },
        { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
        { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro' }
      ]
    }
  ]);

  const toggleProxy = (id: string) => {
    setProxies(proxies.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const setAuthType = (id: string, type: string) => {
    setProxies(proxies.map(p => 
      p.id === id ? { ...p, authType: type } : p
    ));
  };

  const toggleModel = (proxyId: string, modelId: string) => {
    setProxies(proxies.map(p => {
      if (p.id === proxyId) {
        const newModels = p.models.includes(modelId)
          ? p.models.filter(m => m !== modelId)
          : [...p.models, modelId];
        return { ...p, models: newModels };
      }
      return p;
    }));
  };

  const handleSaveApiKey = (id: string) => {
    setApiKeys({ ...apiKeys, [id]: editingApiKeys[id] || '' });
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settings.codeProxy.title')}</h1>
        <p className="text-gray-500">{t('settings.codeProxy.description')}</p>
      </div>

      <div className="space-y-6">
        {proxies.map((proxy) => (
          <div key={proxy.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {proxy.id === 'rebyte-code' ? (
                  <div className="w-4 h-4 flex items-center justify-center bg-black rounded-sm text-white text-[10px] font-bold">R</div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                )}
                <h3 className="text-lg font-medium text-gray-900">{proxy.name}</h3>
              </div>
              <button 
                onClick={() => toggleProxy(proxy.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${proxy.enabled ? 'bg-black' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${proxy.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {proxy.enabled && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('settings.codeProxy.enabled')}</label>
                </div>
                {proxy.id !== 'rebyte-code' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">{t('settings.codeProxy.authMethod')}</label>
                    <div className="space-y-3">
                      <div className="border rounded-lg overflow-hidden">
                        <div 
                          className={`flex items-center p-3 cursor-pointer ${proxy.authType === 'org' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                          onClick={() => setAuthType(proxy.id, 'org')}
                        >
                          <div className="mr-3">
                            {proxy.authType === 'org' ? (
                              <CheckCircle2 size={20} className="text-black" />
                            ) : (
                              <Circle size={20} className="text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{t('settings.codeProxy.orgApiKey')}</div>
                            <div className="text-xs text-gray-500">{t('settings.codeProxy.orgApiKeyDesc')}</div>
                          </div>
                        </div>
                        
                        {proxy.authType === 'org' && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <input
                                  type={showApiKeys[proxy.id] ? "text" : "password"}
                                  value={editingApiKeys[proxy.id] !== undefined ? editingApiKeys[proxy.id] : (apiKeys[proxy.id] || '')}
                                  onChange={(e) => setEditingApiKeys({ ...editingApiKeys, [proxy.id]: e.target.value })}
                                  placeholder={t('settings.codeProxy.apiKeyPlaceholder')}
                                  className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowApiKeys({ ...showApiKeys, [proxy.id]: !showApiKeys[proxy.id] })}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showApiKeys[proxy.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                              <button
                                onClick={() => handleSaveApiKey(proxy.id)}
                                className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                              >
                                {t('settings.codeProxy.save')}
                              </button>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              {t('settings.codeProxy.getApiKeyFrom')} {proxy.name.includes('Gemini') ? 'Google AI Studio' : proxy.name.includes('Claude') ? 'Anthropic Console' : 'OpenAI Platform'}
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${proxy.authType === 'rebyte' ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => setAuthType(proxy.id, 'rebyte')}
                      >
                        <div className="mr-3">
                          {proxy.authType === 'rebyte' ? (
                            <CheckCircle2 size={20} className="text-black" />
                          ) : (
                            <Circle size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{t('settings.codeProxy.providedBy')}</div>
                          <div className="text-xs text-gray-500">{t('settings.codeProxy.providedByDesc')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('settings.codeProxy.availableModels')}</label>
                  <div className="space-y-3">
                    {proxy.availableModels.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{model.name}</span>
                          <span className="text-xs text-gray-500">{t('settings.codeProxy.dataSentTo')} {model.name.includes('OpenAI') || model.name.includes('GPT') ? 'OpenAI' : model.name.includes('Claude') ? 'Anthropic' : model.name.includes('Gemini') ? 'Google' : 'OpenRouter'}</span>
                        </div>
                        <button 
                          onClick={() => toggleModel(proxy.id, model.id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${proxy.models.includes(model.id) ? 'bg-black' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${proxy.models.includes(model.id) ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
