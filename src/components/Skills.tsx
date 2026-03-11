import { 
  Search, Sparkles, Users, Download, Plus
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_CARDS, SKILL_LIST } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'featured' | 'explore' | 'team'>('featured');
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-full bg-[#FDFDFC] px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('skills.agentSkills')}</div>
          <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2 tracking-tight">
            {t('skills.title')} <span className="italic font-light">{t('skills.titleHighlight')}</span>
          </h1>
          <p className="text-gray-500 font-light">{t('skills.subtitle')}</p>
        </div>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FEATURED_CARDS.map((skill, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/skills/${skill.title}`)}
              className={`${skill.color} p-6 rounded-2xl flex flex-col justify-between h-48 transition-transform hover:scale-[1.02] cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2">{skill.category}</div>
                  <h3 className="text-lg font-medium mb-2">{skill.title}</h3>
                </div>
                <div className={`${skill.iconBg} p-2 rounded-full shadow-sm`}>
                  {skill.icon}
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100 mb-8">
          <button 
            className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'featured' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('featured')}
          >
            {t('skills.featured')}
          </button>
          <button 
            className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'explore' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('explore')}
          >
            {t('skills.explore')} 3050
          </button>
          <button 
            className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'team' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('team')}
          >
            {t('skills.teamSkills')}
          </button>
        </div>

        {/* Content based on Tab */}
        {(activeTab === 'featured' || activeTab === 'explore') && (
          <>
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder={t('skills.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-6">
              {SKILL_LIST.map((skill, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(`/skills/${skill.title}`)}
                  className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 ${skill.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    {skill.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-sm font-medium text-gray-900">{skill.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Download size={12} />
                        <span>{skill.downloads}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'team' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-full max-w-3xl border border-dashed border-gray-300 rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                 <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-2">{t('skills.createTeamSkills')}</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      {t('skills.createTeamSkillsDesc')}
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        <Sparkles size={16} />
                        {t('skills.createWithAgent')}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Plus size={16} />
                        {t('skills.importFromGithub')}
                      </button>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Users size={32} />
              </div>
              <p className="text-gray-500">{t('skills.noTeamSkills')}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Help Icon */}
      <div className="fixed bottom-6 right-6">
         <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold hover:bg-gray-300 transition-colors">
           ?
         </button>
      </div>
    </div>
  );
}
