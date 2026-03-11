import React, { useState } from 'react';
import { Check, Database, FileSpreadsheet, HardDrive, Layout, Server, Share2, Shield, Zap, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function PlansAndPricing() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [teamMembers, setTeamMembers] = useState(2);
  const { t } = useLanguage();

  const basePrice = 30;
  const seatPrice = 6;
  
  // Calculate price
  // Base includes 1 seat. Extra seats = teamMembers - 1
  const extraSeats = Math.max(0, teamMembers - 1);
  const monthlyTotal = basePrice + (extraSeats * seatPrice);
  
  // Apply yearly discount if selected
  const finalPrice = isYearly ? Math.round(monthlyTotal * 0.8) : monthlyTotal;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-gray-900">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        {t('plans.back')}
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif mb-4">{t('plans.title')}</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('plans.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Personal Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col h-full hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-medium">{t('plans.personal.title')}</h2>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-serif">{t('plans.personal.price')}</span>
              <span className="text-gray-500 ml-2">{t('plans.personal.type')}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {(Array.isArray(t('plans.personal.features', { returnObjects: true })) ? t('plans.personal.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('plans.common.perTask')}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-400 mb-1"><Zap size={16} className="mx-auto" /></div>
                    <div className="font-medium text-sm">2 {t('plans.common.gb')}</div>
                    <div className="text-xs text-gray-500">{t('plans.common.memory')}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-400 mb-1"><HardDrive size={16} className="mx-auto" /></div>
                    <div className="font-medium text-sm">20 {t('plans.common.gb')}</div>
                    <div className="text-xs text-gray-500">{t('plans.common.disk')}</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('plans.common.contextLake')}</p>
                <div className="bg-gray-50 rounded-lg p-4 text-center w-full">
                  <div className="text-gray-400 mb-1"><Database size={16} className="mx-auto" /></div>
                  <div className="font-medium text-sm">5 {t('plans.common.gb')}</div>
                  <div className="text-xs text-gray-500">{t('plans.common.storage')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col h-full relative hover:border-gray-300 transition-colors bg-white shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
              {t('plans.team.recommended')}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-medium">{t('plans.team.title')}</h2>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-serif">${isYearly ? Math.round(30 * 0.8) : 30}</span>
              <span className="text-gray-500 ml-2">{t('plans.team.period')} + ${isYearly ? Math.round(6 * 0.8) : 6}{t('plans.team.seatPrice')}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {(Array.isArray(t('plans.team.features', { returnObjects: true })) ? t('plans.team.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 mt-0.5 text-gray-900 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('plans.common.perTask')}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-400 mb-1"><Zap size={16} className="mx-auto" /></div>
                    <div className="font-medium text-sm">4 {t('plans.common.gb')}</div>
                    <div className="text-xs text-gray-500">{t('plans.common.memory')}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-400 mb-1"><HardDrive size={16} className="mx-auto" /></div>
                    <div className="font-medium text-sm">20 {t('plans.common.gb')}</div>
                    <div className="text-xs text-gray-500">{t('plans.common.disk')}</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('plans.common.contextLake')}</p>
                <div className="bg-gray-50 rounded-lg p-4 text-center w-full">
                  <div className="text-gray-400 mb-1"><Database size={16} className="mx-auto" /></div>
                  <div className="font-medium text-sm">50 {t('plans.common.gb')}</div>
                  <div className="text-xs text-gray-500">{t('plans.common.storage')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Lake Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-medium">{t('plans.contextLake.title')}</h3>
          </div>
          <p className="text-gray-500 mb-6">{t('plans.contextLake.subtitle')}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{t('plans.contextLake.personal')}</span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm text-gray-900">{t('plans.contextLake.tabular')}</div>
                    <div className="text-xs text-gray-500">{t('plans.contextLake.tabularDesc')}</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 pl-1">{t('plans.contextLake.oneSource')}</p>
            </div>

            <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">{t('plans.contextLake.team')}</span>
                <span className="bg-orange-200 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded">{t('plans.contextLake.pro')}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="bg-white rounded-lg p-4 border border-orange-200/50">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{t('plans.contextLake.databases')}</div>
                      <div className="text-xs text-gray-500">{t('plans.contextLake.databasesDesc')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200/50">
                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{t('plans.contextLake.cloudStorage')}</div>
                      <div className="text-xs text-gray-500">{t('plans.contextLake.cloudStorageDesc')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200/50">
                  <div className="flex items-start gap-3">
                    <Layout className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{t('plans.contextLake.dataLakes')}</div>
                      <div className="text-xs text-gray-500">{t('plans.contextLake.dataLakesDesc')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200/50">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{t('plans.contextLake.streaming')}</div>
                      <div className="text-xs text-gray-500">{t('plans.contextLake.streamingDesc')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 pl-1">{t('plans.contextLake.unlimited')}</p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-6">{t('plans.calculator.title')}</h3>
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className={!isYearly ? "font-medium text-gray-900" : "text-gray-500"}>{t('plans.calculator.monthly')}</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isYearly ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
              <span className={isYearly ? "font-medium text-gray-900" : "text-gray-500"}>{t('plans.calculator.yearly')} <span className="text-xs text-green-600 font-medium ml-1">{t('plans.calculator.save')}</span></span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700">{t('plans.calculator.teamMembers')} <span className="text-xl font-serif ml-1">{teamMembers}</span></label>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-700">{t('plans.calculator.orgMembers')} <span className="font-medium">2 {t('plans.calculator.members')}</span>.</p>
              </div>

              <input 
                type="range" 
                min="2" 
                max="50" 
                value={teamMembers} 
                onChange={(e) => setTeamMembers(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
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

            <div className="bg-[#f5f2ed] rounded-xl p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('plans.calculator.base')}</span>
                <span className="font-medium">${isYearly ? Math.round(30 * 0.8) : 30}/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{extraSeats} {t('plans.calculator.extraSeat')} x ${isYearly ? Math.round(6 * 0.8) : 6}</span>
                <span className="font-medium">${extraSeats * (isYearly ? Math.round(6 * 0.8) : 6)}/mo</span>
              </div>
              <div className="border-t border-gray-300 my-3 pt-3 flex justify-between items-baseline">
                <span className="font-medium text-gray-900">{t('plans.calculator.total')}</span>
                <span className="text-2xl font-serif font-medium">${finalPrice}<span className="text-sm font-sans text-gray-500 font-normal">/month</span></span>
              </div>
            </div>

            <button className="w-full bg-black text-white rounded-lg py-3 mt-6 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              {t('plans.calculator.subscribe')}
              <ArrowLeft className="rotate-180 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
