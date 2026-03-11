import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Plus, X } from 'lucide-react';

export default function SettingsProxySecurity() {
  const { t } = useLanguage();
  const [allowNetworkAccess, setAllowNetworkAccess] = useState(true);
  const [domainWhitelist, setDomainWhitelist] = useState('package-managers');
  const [additionalDomains, setAdditionalDomains] = useState('');
  const [allowedDomainsList, setAllowedDomainsList] = useState<string[]>([]);

  const handleAddDomain = () => {
    if (additionalDomains.trim() && !allowedDomainsList.includes(additionalDomains.trim())) {
      setAllowedDomainsList([...allowedDomainsList, additionalDomains.trim()]);
      setAdditionalDomains('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setAllowedDomainsList(allowedDomainsList.filter(d => d !== domain));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settings.proxySecurity.title')}</h1>
        <p className="text-gray-500">{t('settings.proxySecurity.description')}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-6">
          <Shield size={24} className="text-gray-400 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{t('settings.proxySecurity.networkPolicy')}</h3>
            <p className="text-sm text-gray-500">{t('settings.proxySecurity.networkPolicyDesc')}</p>
          </div>
        </div>

        <div className="space-y-6 pl-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{t('settings.proxySecurity.allowNetworkAccess')}</div>
              <div className="text-xs text-gray-500">{t('settings.proxySecurity.allowNetworkAccessDesc')}</div>
            </div>
            <button 
              onClick={() => setAllowNetworkAccess(!allowNetworkAccess)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${allowNetworkAccess ? 'bg-black' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${allowNetworkAccess ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {allowNetworkAccess && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.proxySecurity.domainWhitelist')}</label>
                <select 
                  value={domainWhitelist}
                  onChange={(e) => setDomainWhitelist(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-white"
                >
                  <option value="none">{t('settings.proxySecurity.noDomainsAllowed')}</option>
                  <option value="package-managers">{t('settings.proxySecurity.onlyPackageManagers')}</option>
                  <option value="all">{t('settings.proxySecurity.allowAllDomains')}</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">{t('settings.proxySecurity.whitelistDesc')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.proxySecurity.additionalAllowedDomains')}</label>
                <p className="text-xs text-gray-500 mb-2">{t('settings.proxySecurity.additionalAllowedDomainsDesc')}</p>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={additionalDomains}
                    onChange={(e) => setAdditionalDomains(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDomain();
                      }
                    }}
                    placeholder={t('settings.proxySecurity.addDomainPlaceholder')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  />
                  <button 
                    onClick={handleAddDomain}
                    className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {t('settings.proxySecurity.add')}
                  </button>
                </div>
                
                {allowedDomainsList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allowedDomainsList.map((domain, index) => (
                      <div key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                        <span>{domain}</span>
                        <button 
                          onClick={() => handleRemoveDomain(domain)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
