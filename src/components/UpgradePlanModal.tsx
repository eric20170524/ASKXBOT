import { X, Check, Database, Cloud, Server, FileText, Users, Sparkles, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradePlanModal({ isOpen, onClose }: UpgradePlanModalProps) {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [teamMembers, setTeamMembers] = useState(2);

  const basePrice = 30;
  const seatPrice = 6;
  const totalPrice = basePrice + (teamMembers - 1) * seatPrice;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="min-h-screen bg-[#FDFDFC] pb-20">
              {/* Header */}
              <div className="sticky top-0 bg-[#FDFDFC]/80 backdrop-blur-sm z-10 px-6 py-4 border-b border-gray-100 flex items-center">
                <button 
                  onClick={onClose}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>{t('plans.back')}</span>
                </button>
              </div>

              <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="text-center mb-16">
                  <h1 className="text-4xl font-serif text-gray-900 mb-4">{t('plans.title')}</h1>
                  <p className="text-gray-500">{t('plans.subtitle')}</p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {/* Personal Plan */}
                  <div className="bg-[#F5F5F4] rounded-2xl p-8 border border-transparent">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="text-gray-900" size={24} />
                      <h2 className="text-xl font-medium text-gray-900">{t('plans.personal.title')}</h2>
                    </div>
                    <div className="mb-8">
                      <span className="text-3xl font-serif text-gray-900">{t('plans.personal.price')}</span>
                      <span className="text-gray-500 text-sm ml-2">{t('plans.personal.type')}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {(Array.isArray(t('plans.personal.features', { returnObjects: true })) ? t('plans.personal.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className="mt-0.5 w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 bg-gray-400 rounded-full opacity-0"></div>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#EBEAE8] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">2 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.memory')}</div>
                      </div>
                      <div className="bg-[#EBEAE8] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">20 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.disk')}</div>
                      </div>
                      <div className="bg-[#EBEAE8] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">5 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.storage')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Team Plan */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 relative shadow-sm">
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                      {t('plans.team.recommended')}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="text-gray-900" size={24} />
                      <h2 className="text-xl font-medium text-gray-900">{t('plans.team.title')}</h2>
                    </div>
                    <div className="mb-8">
                      <span className="text-3xl font-serif text-gray-900">{t('plans.team.price')}</span>
                      <span className="text-gray-500 text-sm ml-2">{t('plans.team.period')} {t('plans.team.seatPrice')}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {(Array.isArray(t('plans.team.features', { returnObjects: true })) ? t('plans.team.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className="mt-0.5 w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#F5F5F4] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">4 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.memory')}</div>
                      </div>
                      <div className="bg-[#F5F5F4] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">20 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.disk')}</div>
                      </div>
                      <div className="bg-[#F5F5F4] rounded-xl p-4 text-center">
                        <div className="text-gray-900 font-medium mb-1">50 {t('plans.common.gb')}</div>
                        <div className="text-xs text-gray-500">{t('plans.common.storage')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Context Data Lake */}
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="text-orange-500" size={24} />
                    <h2 className="text-xl font-medium text-gray-900">{t('plans.contextLake.title')}</h2>
                  </div>
                  <p className="text-gray-500 mb-8">{t('plans.contextLake.subtitle')}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Lake */}
                    <div className="bg-[#F5F5F4] rounded-2xl p-8">
                      <div className="flex items-center gap-2 mb-4 text-gray-500">
                        <Sparkles size={16} />
                        <span className="text-sm font-medium">{t('plans.contextLake.personal')}</span>
                      </div>
                      
                      <div className="bg-[#EBEAE8] rounded-xl p-4 mb-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{t('plans.contextLake.tabular')}</div>
                          <div className="text-xs text-gray-500">{t('plans.contextLake.tabularDesc')}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">{t('plans.contextLake.oneSource')}</div>
                    </div>

                    {/* Team Lake */}
                    <div className="bg-[#FFFBF0] rounded-2xl p-8 border border-orange-100">
                      <div className="flex items-center gap-2 mb-4 text-orange-600">
                        <Users size={16} />
                        <span className="text-sm font-medium">{t('plans.contextLake.team')} ({t('plans.contextLake.pro')})</span>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-orange-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{t('plans.contextLake.databases')}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{t('plans.contextLake.databasesDesc')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-orange-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{t('plans.contextLake.cloudStorage')}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{t('plans.contextLake.cloudStorageDesc')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-orange-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{t('plans.contextLake.dataLakes')}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{t('plans.contextLake.dataLakesDesc')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-orange-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{t('plans.contextLake.streaming')}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{t('plans.contextLake.streamingDesc')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">{t('plans.contextLake.unlimited')}</div>
                    </div>
                  </div>
                </div>

                {/* Calculator */}
                <div className="bg-[#F5F5F4] rounded-2xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">{t('plans.calculator.title')}</h2>
                    <div className="inline-flex bg-gray-200 p-1 rounded-full">
                      <button 
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {t('plans.calculator.monthly')}
                      </button>
                      <button 
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                          billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {t('plans.calculator.yearly')}
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{t('plans.calculator.save')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                      <div className="flex justify-between text-sm font-medium text-gray-900 mb-4">
                        <span>{t('plans.calculator.teamMembers')} {teamMembers}</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="50" 
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>2</span>
                        <span>10</span>
                        <span>20</span>
                        <span>30</span>
                        <span>40</span>
                        <span>50</span>
                      </div>
                    </div>

                    <div className="bg-[#EBEAE8] rounded-xl p-6 mb-8">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{t('plans.calculator.base')}</span>
                        <span>${basePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>{teamMembers - 1} {t('plans.calculator.extraSeat')} x ${seatPrice}</span>
                        <span>${(teamMembers - 1) * seatPrice}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-300/50">
                        <span className="font-medium text-gray-900">{t('plans.calculator.total')}</span>
                        <span className="text-2xl font-serif text-gray-900">${totalPrice}</span>
                      </div>
                    </div>

                    <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      {t('plans.calculator.subscribe')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
