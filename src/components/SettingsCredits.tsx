import { DollarSign, ShoppingCart, Info, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsCredits() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.credits.title')}</h1>
        <p className="text-sm text-gray-500">{t('settings.credits.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Credit Balance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <DollarSign size={20} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{t('settings.credits.balance')}</div>
                <div className="text-3xl font-bold text-gray-900">17</div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              <ShoppingCart size={16} />
              {t('settings.credits.buy')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-6 mb-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.credits.used')}</div>
              <div className="text-lg font-medium text-gray-900">1 <span className="text-xs text-gray-500 font-normal">{t('layout.credits').toLowerCase()}</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.credits.requests')}</div>
              <div className="text-lg font-medium text-gray-900">1 <span className="text-xs text-gray-500 font-normal">{t('settings.credits.total')}</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t('settings.credits.lifetime')}</div>
              <div className="text-lg font-medium text-gray-900">0 <span className="text-xs text-gray-500 font-normal">{t('layout.credits').toLowerCase()}</span></div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start gap-3">
            <TrendingUp size={16} className="text-orange-500 mt-0.5" />
            <p className="text-xs text-orange-700 font-medium">
              {t('settings.credits.lowBalance')}
            </p>
          </div>
        </div>

        {/* What are Credits? */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 text-[10px] font-bold">?</div>
            <h2 className="text-sm font-medium text-gray-900">{t('settings.credits.whatAre')}</h2>
          </div>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            {t('settings.credits.whatAreDesc')}
          </p>
          <div className="bg-gray-100 rounded p-3 mb-4">
            <p className="text-xs text-gray-600 font-medium">
              {t('settings.credits.otherExecutors')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Info size={12} />
            {t('settings.credits.neverExpire')}
          </div>
        </div>

        {/* Usage by Model */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-1">{t('settings.credits.usageByModel')}</h2>
          <p className="text-xs text-gray-500 mb-6">{t('settings.credits.usageDesc')}</p>

          <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <div className="text-sm font-medium text-gray-900">{t('settings.credits.unknown')}</div>
              <div className="text-xs text-gray-500">0 {t('settings.credits.tokens')}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">1 {t('settings.credits.requestsCount')}</div>
              <div className="text-xs text-gray-500">~0.00 {t('layout.credits').toLowerCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
