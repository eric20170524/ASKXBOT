import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsMCPDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverUrl, setServerUrl] = useState('https://ai-gateway.mcp.cloudflare.com/sse');

  // Mock data - in a real app this would come from an API or context
  const mcpData = {
    id: 'cloudflare',
    name: 'Cloudflare AI Gateway',
    icon: '☁️',
    isOfficial: true,
    description: 'Search your logs, get prompts and replies detailed info',
    transport: 'SSE',
    auth: 'OAuth',
    docsUrl: '#',
    websiteUrl: '#',
    config: {
      type: 'HTTP',
      fields: [
        { label: 'Server URL', value: 'https://ai-gateway.mcp.cloudflare.com/sse' }
      ]
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/settings/mcp-servers')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          {t('settings.mcpServers.title')}
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
              {mcpData.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{mcpData.name}</h1>
                {mcpData.isOfficial && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded border border-gray-200">
                    {t('settings.mcpDetail.official')}
                  </span>
                )}
              </div>
              <p className="text-gray-500 mb-2">{mcpData.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{t('settings.mcpDetail.transport')}: {mcpData.transport}</span>
                <span>{t('settings.mcpDetail.auth')}: {mcpData.auth}</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <a href={mcpData.docsUrl} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <FileText size={14} className="mr-1" />
                  {t('settings.mcpDetail.docs')}
                </a>
                <a href={mcpData.websiteUrl} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <Globe size={14} className="mr-1" />
                  {t('settings.mcpDetail.website')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('settings.mcpDetail.httpConfig')}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('settings.mcpDetail.serverUrl')}
            </label>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-400" />
              <input
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate('/settings/mcp-servers')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {t('settings.mcpDetail.cancel')}
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
        >
          {t('settings.mcpDetail.install')}
        </button>
      </div>
    </div>
  );
}
