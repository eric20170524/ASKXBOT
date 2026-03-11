import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MessageSquare, Slack } from 'lucide-react';

export default function SettingsAccessChannels() {
  const { t } = useLanguage();
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [slackConnected, setSlackConnected] = useState(false);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settings.accessChannels.title')}</h1>
        <p className="text-gray-500">{t('settings.accessChannels.description')}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <MessageSquare size={24} className="text-gray-900 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{t('settings.accessChannels.title')}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">{t('settings.accessChannels.description')}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{t('settings.accessChannels.telegram.title')}</div>
                  <div className="text-sm text-gray-500">{t('settings.accessChannels.telegram.description')}</div>
                </div>
                <button 
                  onClick={() => setTelegramEnabled(!telegramEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${telegramEnabled ? 'bg-black' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${telegramEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Slack size={24} className="text-gray-900 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{t('settings.accessChannels.slack.title')}</h3>
                <button 
                  onClick={() => window.open('/slack-auth', '_blank')}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {slackConnected ? t('settings.github.disconnect') : t('settings.accessChannels.slack.connect')}
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">{t('settings.accessChannels.slack.description')}</p>
              <div className="text-sm text-gray-500">
                {t('settings.accessChannels.slack.notConnected')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
