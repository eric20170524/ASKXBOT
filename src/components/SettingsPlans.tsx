import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Zap, Link as LinkIcon, ShoppingCart, MessageSquare, Cpu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsPlans() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const handleBuyCredits = (amount: number) => {
    navigate(`/payment?amount=${amount}`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t('settings.plans.title')}</h2>
        <p className="text-gray-500 mt-1">{t('settings.plans.subtitle')}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('settings.plans.currentPlan')}</div>
              <div className="text-2xl font-bold text-gray-900 font-serif">
                {t('settings.plans.personal')}
              </div>
            </div>
          </div>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
            free
          </span>
        </div>

        <div className="mb-6 pl-[60px]">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('settings.plans.status')}</div>
          <div className="font-medium text-gray-900">{t('settings.plans.free')}</div>
        </div>

        <div className="pl-[60px]">
          <button
            onClick={() => navigate('/billing')}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            {t('settings.plans.upgradeToTeam')}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{t('settings.plans.featuresTitle')}</h3>
        <p className="text-gray-500 text-sm mb-6">{t('settings.plans.featuresSubtitle')}</p>

        <div className="space-y-4">
          {[
            t('settings.plans.feature.payAsYouGo'),
            t('settings.plans.feature.unlimitedTasks'),
            t('settings.plans.feature.allAgents'),
            t('settings.plans.feature.contextLake'),
            t('settings.plans.feature.resources')
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <LinkIcon size={20} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{t('settings.plans.totalCredits')}</div>
              <div className="text-3xl font-bold text-gray-900">300</div>
            </div>
          </div>
          <button 
            onClick={() => setIsBuyModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={16} />
            {t('settings.plans.buyCredits')}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8 border-t border-gray-100 pt-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('settings.plans.includedInPlan')}</div>
            <div className="text-lg font-medium text-gray-900">300 <span className="text-xs text-gray-500 font-normal">/ 300</span></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('settings.plans.purchased')}</div>
            <div className="text-lg font-medium text-gray-900">0 <span className="text-xs text-gray-500 font-normal">{t('settings.plans.neverExpire')}</span></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('settings.plans.used30Days')}</div>
            <div className="text-lg font-medium text-gray-900">0 <span className="text-xs text-gray-500 font-normal">{t('settings.plans.credits')}</span></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('settings.plans.requests30Days')}</div>
            <div className="text-lg font-medium text-gray-900">0 <span className="text-xs text-gray-500 font-normal">{t('settings.plans.total')}</span></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{t('settings.plans.howCreditsUsed')}</h3>
        <p className="text-sm text-gray-500 mb-6">{t('settings.plans.creditsConsumedBy')}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-blue-500" />
              <h4 className="font-medium text-gray-900 text-sm">{t('settings.plans.languageModels')}</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('settings.plans.languageModelsDesc')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={16} className="text-green-500" />
              <h4 className="font-medium text-gray-900 text-sm">{t('settings.plans.agentComputers')}</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('settings.plans.agentComputersDesc')}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500">{t('settings.plans.byokExempt')}</p>
      </div>

      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">{t('settings.plans.buyCreditsTitle')}</h3>
              <button 
                onClick={() => setIsBuyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">{t('settings.plans.buyCreditsDesc')}</p>

            <div className="space-y-3 mb-6">
              <button 
                onClick={() => handleBuyCredits(1000)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <div className="font-bold text-gray-900">{t('settings.plans.creditPackSmall')}</div>
                  <div className="text-xs text-gray-500 mt-1">{t('settings.plans.creditPackSmallDesc')}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$10</div>
                  <div className="text-xs text-gray-500 mt-1">$0.01{t('settings.plans.perCredit')}</div>
                </div>
              </button>

              <button 
                onClick={() => handleBuyCredits(5000)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-left relative overflow-hidden"
              >
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {t('settings.plans.creditPackMedium')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium border border-gray-200">{t('settings.plans.save10')}</span>
                    {t('settings.plans.creditPackMediumDesc')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$45</div>
                  <div className="text-xs text-gray-500 mt-1">$0.01{t('settings.plans.perCredit')}</div>
                </div>
              </button>

              <button 
                onClick={() => handleBuyCredits(15000)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-left relative overflow-hidden"
              >
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {t('settings.plans.creditPackLarge')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium border border-gray-200">{t('settings.plans.save20')}</span>
                    {t('settings.plans.creditPackLargeDesc')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$120</div>
                  <div className="text-xs text-gray-500 mt-1">$0.01{t('settings.plans.perCredit')}</div>
                </div>
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">{t('settings.plans.redirectStripe')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
