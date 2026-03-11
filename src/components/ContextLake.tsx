import { useState, useRef } from 'react';
import { ChevronLeft, Database, Search, HelpCircle, Upload, Cloud, Server, HardDrive, RotateCcw, Power, Plus, X, FileText, Table, Code, GripHorizontal, ChevronDown, Check, CreditCard, Calendar, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContextLake() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'tabular' | 'pricing' | 'payment'>('list');
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [activeFormatTab, setActiveFormatTab] = useState('CSV');
  const [isFileFormatDropdownOpen, setIsFileFormatDropdownOpen] = useState(false);
  const [selectedFileFormat, setSelectedFileFormat] = useState('Auto (Detect from extension)');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [teamMembers, setTeamMembers] = useState(1);

  // Pricing Constants
  const PRICING = {
    monthly: { base: 30, seat: 6 },
    yearly: { base: 24, seat: 4.8 }
  };
  
  const getPrice = () => {
    const currentBase = billingCycle === 'monthly' ? PRICING.monthly.base : PRICING.yearly.base;
    const currentSeat = billingCycle === 'monthly' ? PRICING.monthly.seat : PRICING.yearly.seat;
    
    const extraSeats = Math.max(0, teamMembers - 1);
    
    return {
      base: currentBase,
      seats: extraSeats * currentSeat,
      total: currentBase + (extraSeats * currentSeat),
      perSeat: currentSeat,
      billingTotal: (currentBase + (extraSeats * currentSeat)) * (billingCycle === 'monthly' ? 1 : 12)
    };
  };

  const prices = getPrice();

  const handleProClick = () => {
    setCurrentView('pricing');
  };

  const files = [
    { name: t('contextLake.tabularFile'), desc: t('contextLake.tabularFileDesc'), icon: Upload, isPro: false, onClick: () => setCurrentView('tabular') },
    { name: 'Amazon S3', desc: t('contextLake.upgradeToPro'), icon: Cloud, isPro: true, onClick: handleProClick },
    { name: 'Google Cloud Storage', desc: t('contextLake.upgradeToPro'), icon: Cloud, isPro: true, onClick: handleProClick },
    { name: 'Azure Blob Storage', desc: t('contextLake.upgradeToPro'), icon: Cloud, isPro: true, onClick: handleProClick },
    { name: 'HTTP/HTTPS', desc: t('contextLake.upgradeToPro'), icon: Cloud, isPro: true, onClick: handleProClick },
  ];

  const databases = [
    { name: 'Supabase', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'Neon', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'PlanetScale', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'TiDB Cloud', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'PostgreSQL', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'MySQL', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'ClickHouse', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'MongoDB', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'MongoDB Atlas', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'Microsoft SQL Server', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'Oracle', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'DuckDB', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'Amazon DynamoDB', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
    { name: 'FlightSQL', desc: t('contextLake.upgradeToPro'), icon: Database, isPro: true, onClick: handleProClick },
  ];

  const dataLakes = [
    { name: 'Snowflake', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'Databricks', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'Dremio', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'Delta Lake', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'Apache Iceberg', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'AWS Glue', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
    { name: 'Apache Spark', desc: t('contextLake.upgradeToPro'), icon: Server, isPro: true, onClick: handleProClick },
  ];

  const renderCard = (item: any) => (
    <div 
      key={item.name} 
      className="flex items-start p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
      onClick={item.onClick}
    >
      <div className="w-10 h-10 bg-[#F2F1EE] rounded-full flex items-center justify-center mr-4 shrink-0 relative">
        <item.icon size={20} className="text-gray-600" />
        {item.isPro && (
          <div className="absolute -top-1 -right-1 bg-[#D4A35C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
            PRO
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-black">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full bg-white relative">
      {/* Left Sidebar - Sources/Views/Columns */}
      {!['pricing', 'payment'].includes(currentView) && (
      <div className="w-64 border-r border-gray-200 flex flex-col h-full bg-white shrink-0">
        {/* Header with Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title={t('contextLake.restart')}>
              <RotateCcw size={14} />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title={t('contextLake.stop')}>
              <Power size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 rounded transition-colors shadow-sm">
              <Plus size={12} />
              Source
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 rounded transition-colors shadow-sm">
              <Plus size={12} />
              View
            </button>
          </div>
        </div>

        {/* Sources Section */}
        <div className="flex flex-col h-[30%] min-h-[120px]">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('contextLake.sources')}</span>
            <button className="p-0.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded hover:bg-white transition-all bg-white shadow-sm">
              <Plus size={12} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center overflow-y-auto">
            <Database size={24} className="text-gray-300 mb-2" strokeWidth={1.5} />
            <p className="text-xs text-gray-400 font-medium">{t('contextLake.noSources')}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-3 flex items-center justify-center border-y border-gray-100 bg-gray-50 cursor-row-resize hover:bg-gray-100 transition-colors">
          <GripHorizontal size={12} className="text-gray-300" />
        </div>

        {/* Views Section */}
        <div className="flex flex-col h-[30%] min-h-[120px]">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('contextLake.views')}</span>
            <button className="p-0.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded hover:bg-white transition-all bg-white shadow-sm">
              <Plus size={12} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center overflow-y-auto">
            <p className="text-xs text-gray-400">{t('contextLake.noViews')}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-3 flex items-center justify-center border-y border-gray-100 bg-gray-50 cursor-row-resize hover:bg-gray-100 transition-colors">
          <GripHorizontal size={12} className="text-gray-300" />
        </div>

        {/* Columns Section */}
        <div className="flex flex-col flex-1 min-h-[120px]">
           <div className="flex items-center px-4 py-2 bg-gray-50/50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('contextLake.columns')}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center overflow-y-auto">
            <p className="text-xs text-gray-400 leading-relaxed">{t('contextLake.selectItem')}</p>
          </div>
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {currentView === 'tabular' ? (
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentView('list')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h1 className="text-2xl font-semibold text-gray-900">Tabular File</h1>
                </div>
                <button 
                  onClick={() => setIsFormatModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F9EBC7] text-[#8C6B3D] rounded-lg text-sm font-medium hover:bg-[#F2E1B5] transition-colors"
                >
                  <HelpCircle size={16} />
                  How it works
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {uploadStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 mb-2">
                    <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <X size={10} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium">Upload failed</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schema</label>
                    <input 
                      type="text" 
                      defaultValue="public"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      defaultValue="my_data"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-h-[80px]"
                    placeholder="Optional description..."
                  />
                </div>

                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File <span className="text-red-500">*</span></label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={() => setUploadStatus('idle')}
                  />
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                      <Upload size={24} className="text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 max-w-xs">
                      Supports .csv, .tsv, .parquet, .json, .jsonl, .xlsx, .xls, .duckdb, .sqlite
                    </p>
                  </div>
                </div>

                {/* File Format Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format File</label>
                  <div 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer hover:border-gray-400 bg-white"
                    onClick={() => setIsFileFormatDropdownOpen(!isFileFormatDropdownOpen)}
                  >
                    <span className="text-sm text-gray-700">{selectedFileFormat}</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isFileFormatDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isFileFormatDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsFileFormatDropdownOpen(false)} 
                      />
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-y-auto">
                        {[
                          'Auto (Detect from extension)',
                          'CSV',
                          'TSV',
                          'Parquet',
                          'JSON',
                          'JSONL'
                        ].map((format) => (
                          <div 
                            key={format}
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                              setSelectedFileFormat(format);
                              setIsFileFormatDropdownOpen(false);
                            }}
                          >
                            <span>{format}</span>
                            {selectedFileFormat === format && <Check size={14} className="text-blue-600" />}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setCurrentView('list')}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setUploadStatus('error')}
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : currentView === 'pricing' ? (
          <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setCurrentView('list')}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl font-normal text-gray-900 mb-4 font-sans">Plans & Pricing</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Start freely. Upgrade to Team to get all context data lake connectors, more resources, and collaboration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {/* Personal Plan */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col relative group hover:shadow-md transition-shadow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-gray-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{t('plans.personal.title')}</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-normal text-gray-900">{t('plans.personal.price')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={12} /> {t('plans.personal.type')}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(Array.isArray(t('plans.personal.features', { returnObjects: true })) ? t('plans.personal.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-600">
                        <CheckCircle2 size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#F9F8F6] rounded-xl p-4 space-y-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">{t('plans.common.perTask')}</div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <Server size={14} className="text-gray-400" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">2 {t('plans.common.gb')} {t('plans.common.memory')}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <HardDrive size={14} className="text-gray-400" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">20 {t('plans.common.gb')} {t('plans.common.disk')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">{t('plans.common.contextLake')}</div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <Database size={14} className="text-gray-400" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">5 {t('plans.common.gb')} {t('plans.common.storage')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Plan */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col relative group hover:shadow-md transition-shadow">
                  <div className="absolute -top-3 right-8 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {t('plans.team.recommended')}
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{t('plans.team.title')}</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-normal text-gray-900">{t('plans.team.price')}</span>
                      <span className="text-sm text-gray-500">{t('plans.team.period')}</span>
                      <span className="text-xs text-gray-400 ml-1">{t('plans.team.seatPrice')}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(Array.isArray(t('plans.team.features', { returnObjects: true })) ? t('plans.team.features', { returnObjects: true }) : []).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-600">
                        <CheckCircle2 size={14} className="text-gray-900 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#F9F8F6] rounded-xl p-4 space-y-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">{t('plans.common.perTask')}</div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <Server size={14} className="text-gray-900" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">4 {t('plans.common.gb')} {t('plans.common.memory')}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <HardDrive size={14} className="text-gray-900" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">20 {t('plans.common.gb')} {t('plans.common.disk')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">{t('plans.common.contextLake')}</div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                            <Database size={14} className="text-gray-900" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">50 {t('plans.common.gb')} {t('plans.common.storage')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Data Lake Comparison */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-16">
                <div className="flex items-center gap-3 mb-2">
                  <Database size={20} className="text-[#D4A35C]" />
                  <h2 className="text-xl font-bold text-gray-900">Context Data Lake</h2>
                </div>
                <p className="text-sm text-gray-500 mb-8">Give agents the right context.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-gray-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">Personal (Free)</span>
                    </div>
                    <div className="bg-[#F9F8F6] rounded-lg p-4 mb-2">
                      <div className="flex items-start gap-3">
                        <FileText size={16} className="text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-gray-900">Tabular File Upload</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">CSV, Parquet, JSON, Excel</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 px-2">1 data source, 1 view</div>
                  </div>

                  {/* Team */}
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 bg-[#D4A35C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white">
                      PRO
                    </div>
                    <div className="border border-[#D4A35C] rounded-xl p-4 bg-[#FFFCF5]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 rounded-full bg-[#F2E8D5] flex items-center justify-center">
                          <User size={10} className="text-[#8C6B3D]" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{t('plans.contextLake.team')}</span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#F9EBC7] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-[#8C6B3D]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{t('plans.contextLake.databases')}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{t('plans.contextLake.databasesDesc')}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#F9EBC7] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-[#8C6B3D]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{t('plans.contextLake.cloudStorage')}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{t('plans.contextLake.cloudStorageDesc')}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#F9EBC7] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-[#8C6B3D]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{t('plans.contextLake.dataLakes')}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{t('plans.contextLake.dataLakesDesc')}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-[#F9EBC7] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-[#8C6B3D]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{t('plans.contextLake.streaming')}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{t('plans.contextLake.streamingDesc')}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-500">{t('plans.contextLake.unlimited')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator */}
              <div className="bg-[#F2F1EE] rounded-2xl p-8 md:p-12 shadow-sm">
                <div className="text-center mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{t('plans.calculator.title')}</h2>
                  <div className="inline-flex items-center gap-3 bg-white/50 p-1 rounded-full">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>{t('plans.calculator.monthly')}</span>
                    <button 
                      onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                      className={`relative w-10 h-5 rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-[#D4A35C]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-5' : ''}`} />
                    </button>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>{t('plans.calculator.yearly')} ({t('plans.calculator.save')})</span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-900">{t('plans.calculator.teamMembers')}</span>
                      <span className="text-lg font-bold text-gray-900">{teamMembers}</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="50" 
                      step="1"
                      value={teamMembers} 
                      onChange={(e) => setTeamMembers(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
                      <span>2</span>
                      <span>10</span>
                      <span>20</span>
                      <span>30</span>
                      <span>40</span>
                      <span>50</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{t('plans.calculator.base')}</span>
                      <span>${prices.base}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{teamMembers - 1} {t('plans.calculator.extraSeat')} x ${prices.perSeat}</span>
                      <span>${prices.seats.toFixed(2)}/mo</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100 bg-[#F9F8F6] -mx-8 -mb-8 p-8 rounded-b-xl">
                    <span className="text-lg font-bold text-gray-900">{t('plans.calculator.total')}</span>
                    <span className="text-2xl font-normal text-gray-900 font-sans">
                      ${prices.total.toFixed(2)}<span className="text-sm text-gray-500 font-normal">/month</span>
                    </span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto mt-8">
                  <button 
                    onClick={() => setCurrentView('payment')}
                    className="w-full py-4 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    {t('plans.calculator.subscribe')} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : currentView === 'payment' ? (
          <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setCurrentView('pricing')}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900">Rebyte Pro</div>
                          <div className="text-xs text-gray-500">Team Plan ({billingCycle})</div>
                        </div>
                        <div className="font-medium text-gray-900">${prices.base}</div>
                      </div>
                      
                      {teamMembers > 1 && (
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-700">Extra Seats</div>
                            <div className="text-xs text-gray-500">{teamMembers - 1} × ${prices.perSeat}</div>
                          </div>
                          <div className="font-medium text-gray-900">${prices.seats.toFixed(2)}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">${prices.total.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 text-right mt-1">
                      Billed {billingCycle === 'monthly' ? 'monthly' : 'yearly'} (${prices.billingTotal.toFixed(2)})
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 px-2">
                    <Lock size={12} />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="md:col-span-2">
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input 
                          type="email" 
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card information</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent z-10 relative"
                          />
                        </div>
                        <div className="flex -mt-px">
                          <div className="w-1/2 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar size={18} className="text-gray-400" />
                            </div>
                            <input 
                              type="text" 
                              placeholder="MM / YY"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div className="w-1/2 relative -ml-px">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={18} className="text-gray-400" />
                            </div>
                            <input 
                              type="text" 
                              placeholder="CVC"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-br-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>

                      <button className="w-full mt-4 py-3 px-4 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                        Subscribe for ${prices.total.toFixed(2)}
                        <ArrowRight size={16} />
                      </button>
                      
                      <p className="text-center text-xs text-gray-500 mt-4">
                        By subscribing, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">
                {t('contextLake.mainTitle')}
              </div>
              <h1 className="text-4xl md:text-5xl text-[#2C2C2C] mb-8 tracking-tight font-sans">
                {t('contextLake.mainSubtitle')} <span className="font-serif italic">{t('contextLake.mainSubtitleHighlight')}</span>
              </h1>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal text-gray-900">{t('contextLake.sourceType')}</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F2E8D5] text-[#8C6B3D] rounded-full text-xs font-medium hover:bg-[#EADBC0] transition-colors"
                >
                  <HelpCircle size={14} />
                  {t('contextLake.howItWorks')}
                </button>
              </div>

              <div className="relative mb-10">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={t('contextLake.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                />
              </div>

              <div className="mb-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('contextLake.files')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {files.map(renderCard)}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('contextLake.databases')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {databases.map(renderCard)}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('contextLake.dataLakes')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataLakes.map(renderCard)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Format Help Modal */}
      <AnimatePresence>
        {isFormatModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-full overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-b from-[#FDE6BA] to-[#F9EBC7] px-8 pt-8 pb-0 relative shrink-0">
                <button 
                  onClick={() => setIsFormatModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-600" />
                </button>
                
                <h2 className="text-xl text-[#2C2C2C] mb-1 font-sans">
                  <span className="font-bold">File Formats</span> <span className="font-serif italic">& Table Mapping</span>
                </h2>
                <p className="text-sm text-gray-600 mb-6">How your files become queryable tables</p>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { id: 'CSV', icon: FileText, label: 'CSV' },
                    { id: 'TSV', icon: FileText, label: 'TSV' },
                    { id: 'Parquet', icon: FileText, label: 'Parquet' },
                    { id: 'JSON', icon: FileText, label: 'JSON' },
                    { id: 'JSONL', icon: Code, label: 'JSONL' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFormatTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        activeFormatTab === tab.id 
                          ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                      }`}
                    >
                      <tab.icon size={14} className={activeFormatTab === tab.id ? 'text-gray-900' : 'text-gray-400'} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto">
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">What is {activeFormatTab}?</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {activeFormatTab === 'CSV' && 'Comma-Separated Values. A plain text file where each line is a row, and values within a row are separated by commas.'}
                      {activeFormatTab === 'TSV' && 'Tab-Separated Values. Identical to CSV but uses tab characters instead of commas. Common in scientific data and spreadsheet exports.'}
                      {activeFormatTab === 'Parquet' && 'A binary columnar format designed for efficient data storage and retrieval. Column names and exact types are embedded in the file — no guessing needed.'}
                      {activeFormatTab === 'JSON' && 'A single JSON file containing an array of objects. Each object becomes a table row, and the object keys become column names.'}
                      {activeFormatTab === 'JSONL' && 'JSON Lines (also called NDJSON). Each line is a separate, complete JSON object — no wrapping array, no commas between lines.'}
                    </p>
                  </div>

                  {/* Code Example / Features */}
                  {activeFormatTab === 'Parquet' ? (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2C2C2C] flex items-center justify-center text-white font-bold text-xs shrink-0">P</div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Schema is built-in</h4>
                          <p className="text-xs text-gray-600 mt-0.5">Column names, types (string, int64, float64, boolean, timestamp...), and metadata are all part of the file. Nothing to configure.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2C2C2C] flex items-center justify-center text-white font-bold text-xs shrink-0">C</div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Columnar storage</h4>
                          <p className="text-xs text-gray-600 mt-0.5">Data is stored by column, not by row. This means queries that only need a few columns are extremely fast.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2C2C2C] flex items-center justify-center text-white font-bold text-xs shrink-0">Z</div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Built-in compression</h4>
                          <p className="text-xs text-gray-600 mt-0.5">Files are typically 5-10x smaller than equivalent CSV. Faster uploads, less storage.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Your file</h3>
                      <div className="bg-[#2C2C2C] rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto shadow-inner">
                        {activeFormatTab === 'CSV' && (
                          <pre className="leading-relaxed">
                            <span className="text-white font-bold">name,age,city</span><br/>
                            Alice,30,New York<br/>
                            Bob,25,London
                          </pre>
                        )}
                        {activeFormatTab === 'TSV' && (
                          <pre className="leading-relaxed">
                            <span className="text-white font-bold">name    age    city</span><br/>
                            Alice   30     New York<br/>
                            Bob     25     London
                          </pre>
                        )}
                        {activeFormatTab === 'JSON' && (
                          <pre className="leading-relaxed">
                            [<br/>
                            {'  '}<span className="text-[#F9EBC7]">{`{ "name": "Alice", "age": 30, "city": "New York" },`}</span><br/>
                            {'  '}<span className="text-[#F9EBC7]">{`{ "name": "Bob", "age": 25, "city": "London" }`}</span><br/>
                            ]
                          </pre>
                        )}
                        {activeFormatTab === 'JSONL' && (
                          <pre className="leading-relaxed">
                            <span className="text-[#F9EBC7]">{`{"name": "Alice", "age": 30, "city": "New York"}`}</span><br/>
                            <span className="text-[#F9EBC7]">{`{"name": "Bob", "age": 25, "city": "London"}`}</span>
                          </pre>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-gray-100 flex-1"></div>
                    <span className="text-xs text-gray-400 font-medium lowercase italic">becomes</span>
                    <div className="h-px bg-gray-100 flex-1"></div>
                  </div>

                  {/* Table Example */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                      <Table size={14} className="text-gray-500" />
                      Your table
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden text-xs shadow-sm">
                      <div className="grid grid-cols-3 bg-white border-b border-gray-200 font-bold text-gray-900">
                        <div className="p-3 border-r border-gray-100">name <span className="text-gray-400 font-normal text-[10px] ml-1">{activeFormatTab === 'Parquet' ? '(STRING)' : ''}</span></div>
                        <div className="p-3 border-r border-gray-100">age <span className="text-gray-400 font-normal text-[10px] ml-1">{activeFormatTab === 'Parquet' ? '(INT64)' : ''}</span></div>
                        <div className="p-3">city <span className="text-gray-400 font-normal text-[10px] ml-1">{activeFormatTab === 'Parquet' ? '(STRING)' : ''}</span></div>
                      </div>
                      <div className="grid grid-cols-3 border-b border-gray-100 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                        <div className="p-3 border-r border-gray-100">Alice</div>
                        <div className="p-3 border-r border-gray-100">30</div>
                        <div className="p-3">New York</div>
                      </div>
                      <div className="grid grid-cols-3 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                        <div className="p-3 border-r border-gray-100">Bob</div>
                        <div className="p-3 border-r border-gray-100">25</div>
                        <div className="p-3">London</div>
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-600 leading-relaxed shadow-sm">
                    {activeFormatTab === 'CSV' && (
                      <p><span className="font-bold text-gray-900">First row = column headers.</span> The first line of your CSV is used as column names. Remaining lines become data rows. Types (text, number, etc.) are auto-detected by scanning the data.</p>
                    )}
                    {activeFormatTab === 'TSV' && (
                      <p><span className="font-bold text-gray-900">Works just like CSV</span> — first row is headers, remaining rows are data. The only difference is the separator character (tab instead of comma). Useful when your data contains commas.</p>
                    )}
                    {activeFormatTab === 'Parquet' && (
                      <p><span className="font-bold text-gray-900">Best format for large datasets.</span> If you can choose your format, Parquet gives the fastest queries and most accurate types. Tools like Pandas, DuckDB, and Spark all export Parquet natively.</p>
                    )}
                    {activeFormatTab === 'JSON' && (
                      <>
                        <p className="mb-2"><span className="font-bold text-gray-900">Object keys = column names.</span> All unique keys across all objects become columns. If an object is missing a key, that cell is null.</p>
                        <p><span className="font-bold text-gray-900">Nested objects</span> are stored as JSON columns. For example, <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">{"{\"address\": {\"zip\": \"10001\"}}"}</code> creates a column <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">address</code> containing the nested JSON.</p>
                      </>
                    )}
                    {activeFormatTab === 'JSONL' && (
                      <>
                        <p className="mb-2"><span className="font-bold text-gray-900">One object per line = one row.</span> Each line is parsed independently. Column names are the union of all keys across every line.</p>
                        <p><span className="font-bold text-gray-900">Best for streaming data.</span> JSONL is the standard format for log files, event streams, and API exports. Unlike JSON, files can be processed line-by-line without loading everything into memory.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* How It Works Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#F9EBC7] p-8 relative shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
                  {t('contextLake.mainTitle')}
                </div>
                <h2 className="text-3xl md:text-4xl text-[#2C2C2C] mb-4 font-sans tracking-tight">
                  {t('contextLake.modal.title').split('agent context')[0]} 
                  <span className="font-serif italic">agent context.</span>
                </h2>
                <p className="text-gray-700 max-w-2xl leading-relaxed">
                  {t('contextLake.modal.subtitle')}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto">
                {/* Steps */}
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[#F2E8D5] rounded-lg flex items-center justify-center text-[#8C6B3D] font-bold shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t('contextLake.modal.step1Title')}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t('contextLake.modal.step1Desc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[#F2E8D5] rounded-lg flex items-center justify-center text-[#8C6B3D] font-bold shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t('contextLake.modal.step2Title')}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t('contextLake.modal.step2Desc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[#F2E8D5] rounded-lg flex items-center justify-center text-[#8C6B3D] font-bold shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t('contextLake.modal.step3Title')}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t('contextLake.modal.step3Desc')}</p>
                    </div>
                  </div>
                </div>

                {/* Source Types Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 text-xs font-semibold text-gray-700">
                    {t('contextLake.modal.tableTitle')}
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="p-4 flex gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {t('contextLake.modal.filesTitle')} <span className="font-normal text-gray-500 ml-1">CSV, TSV, JSON, JSONL, Parquet</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">First row or object keys become column names. Each row/object/line becomes a data row.</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                        <Database size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {t('contextLake.modal.relationalDBsTitle')} <span className="font-normal text-gray-500 ml-1">PostgreSQL, MySQL, Supabase, etc.</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">Direct 1:1 mapping. Same columns, same types. Tables and views both work.</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                        <Server size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {t('contextLake.modal.dataLakesTitle')} <span className="font-normal text-gray-500 ml-1">Snowflake, Databricks, Iceberg, Delta Lake</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">Query tables and views directly from your data warehouse. Same schema, same types — just like a database.</p>
                      </div>
                    </div>
                    <div className="p-4 flex gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                        <Code size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {t('contextLake.modal.documentDBsTitle')} <span className="font-normal text-gray-500 ml-1">MongoDB, DynamoDB</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">Each document/item becomes a row. Top-level fields become columns. Nested objects stay as JSON.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Table Example */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Database size={14} className="text-gray-500" />
                      {t('contextLake.modal.sourceVisible')}
                    </div>
                    <span className="text-xs text-gray-400 italic">payroll</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                      <div className="p-2">employee</div>
                      <div className="p-2">department</div>
                      <div className="p-2">salary</div>
                      <div className="p-2">ssn</div>
                      <div className="p-2">bank_account</div>
                    </div>
                    <div className="grid grid-cols-5 border-b border-gray-100 text-gray-600">
                      <div className="p-2">Alice</div>
                      <div className="p-2">Engineering</div>
                      <div className="p-2 text-gray-400">$145,000</div>
                      <div className="p-2 text-gray-400">***-**-1234</div>
                      <div className="p-2 text-gray-400">****7890</div>
                    </div>
                    <div className="grid grid-cols-5 border-b border-gray-100 text-gray-600">
                      <div className="p-2">Bob</div>
                      <div className="p-2">Design</div>
                      <div className="p-2 text-gray-400">$120,000</div>
                      <div className="p-2 text-gray-400">***-**-5678</div>
                      <div className="p-2 text-gray-400">****3456</div>
                    </div>
                    <div className="grid grid-cols-5 text-gray-600">
                      <div className="p-2">Carol</div>
                      <div className="p-2">Engineering</div>
                      <div className="p-2 text-gray-400">$135,000</div>
                      <div className="p-2 text-gray-400">***-**-9012</div>
                      <div className="p-2 text-gray-400">****1234</div>
                    </div>
                  </div>
                </div>

                {/* View Table Example */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Table size={14} className="text-gray-500" />
                      {t('contextLake.modal.viewVisible')}
                    </div>
                    <span className="text-xs text-gray-400 italic">team_directory</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                      <div className="p-2">employee</div>
                      <div className="p-2">department</div>
                      <div className="p-2">title</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-100 text-gray-600">
                      <div className="p-2">Alice</div>
                      <div className="p-2">Engineering</div>
                      <div className="p-2">Senior Engineer</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-100 text-gray-600">
                      <div className="p-2">Bob</div>
                      <div className="p-2">Design</div>
                      <div className="p-2">Lead Designer</div>
                    </div>
                    <div className="grid grid-cols-3 text-gray-600">
                      <div className="p-2">Carol</div>
                      <div className="p-2">Engineering</div>
                      <div className="p-2">Engineer</div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <RotateCcw size={16} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {t('contextLake.modal.footerViews')}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {t('contextLake.modal.footerAutoDiscover')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
