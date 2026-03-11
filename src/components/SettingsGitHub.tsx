import { Github, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsGitHub() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.github.pageTitle')}</h1>
        <p className="text-sm text-gray-500">{t('settings.github.pageDescription')}</p>
      </div>

      <div className="space-y-6">
        {/* CLI Device Flow */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-1">
            <Github size={20} className="text-gray-900" />
            <h2 className="text-sm font-medium text-gray-900">{t('settings.github.cliDeviceFlow')}</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">{t('settings.github.cliDescription')}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('settings.github.notConnected')}</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-500">
              <Lock size={12} />
              {t('settings.github.adminOnly')}
            </div>
          </div>
        </div>

        {/* GitHub App */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-1">
            <Github size={20} className="text-gray-900" />
            <h2 className="text-sm font-medium text-gray-900">{t('settings.github.githubApp')}</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">{t('settings.github.appDescription')}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('settings.github.notInstalled')}</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-500">
              <Lock size={12} />
              {t('settings.github.adminOnly')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
