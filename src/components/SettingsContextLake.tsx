import { Database, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsContextLake() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.contextLake.title')}</h1>
        <p className="text-sm text-gray-500">{t('settings.contextLake.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Workspace */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-1">
            <Database size={20} className="text-gray-900" />
            <h2 className="text-sm font-medium text-gray-900">{t('settings.contextLake.workspace')}</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">{t('settings.contextLake.workspaceDesc')}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.contextLake.workspaceId')}</div>
              <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded w-fit">f4a5c7ed-a1f3-42c2-b988-0386dc4f786b</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.contextLake.status')}</div>
              <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded w-fit">ready</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.contextLake.vm')}</div>
              <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded w-fit">ca20fbf6aa962j</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.contextLake.created')}</div>
              <div className="text-sm text-gray-900">2026/2/27 08:37:37</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-1">
            <AlertTriangle size={20} className="text-gray-900" />
            <h2 className="text-sm font-medium text-gray-900">{t('settings.contextLake.actions')}</h2>
          </div>
          <p className="text-xs text-gray-500 mb-6">{t('settings.contextLake.actionsDesc')}</p>

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
            {t('settings.contextLake.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}
