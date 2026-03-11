import { Link } from 'react-router-dom';
import { 
  Bot, FileText, BarChart2, Settings, Globe, CheckCircle2, Loader2, ArrowRight, 
  Database, Folder, FileSpreadsheet, Cloud, ArrowDown, Search, Code, PenTool, Rocket, 
  Sparkles, HelpCircle, Moon, Sun, Menu, X, ChevronRight, Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#4A4A4A] overflow-x-hidden">
      {/* Navbar - Floating Pill */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-[#FDFBF7]/80 backdrop-blur-md border border-[#E6E0D0] rounded-full px-6 py-3 flex items-center gap-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#4A3728]" />
            <span className="text-base font-bold tracking-wide text-[#4A3728]">ASKXBOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B6B6B]">
            <a href="#features" className="hover:text-[#4A3728] transition-colors">{t('landing.nav.features')}</a>
            <a href="#agents" className="hover:text-[#4A3728] transition-colors">{t('landing.nav.agents')}</a>
            <a href="#faq" className="hover:text-[#4A3728] transition-colors">{t('landing.nav.faq')}</a>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="px-5 py-1.5 text-sm font-medium text-[#4A3728] hover:bg-[#F5F0E6] rounded-full transition-colors"
            >
              {t('landing.nav.login') || 'Log in'}
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-1.5 bg-[#4A3728] text-white text-sm font-medium rounded-full hover:bg-[#3A2B20] transition-colors"
            >
              {t('landing.nav.signup') || 'Sign up'}
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-24 text-center px-4 relative overflow-hidden">
        <motion.div {...fadeIn}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#4A3728] mb-6 tracking-tight leading-tight">
            {t('landing.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-[#8C8C8C] max-w-3xl mx-auto font-light leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[#F5F0E6] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-40 right-[10%] w-64 h-64 bg-[#E8F3EE] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </section>

      {/* Skill-Driven Section */}
      <section id="features" className="py-24 px-4">
        <motion.div 
          className="max-w-6xl mx-auto bg-[#E8F3EE] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-20 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2C2C2C] mb-6 leading-tight">
              {t('landing.skillDriven.title')}
            </h2>
            <p className="text-[#5C5C5C] text-lg leading-relaxed mb-8">
              {t('landing.skillDriven.description')}
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-6 relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-500">
                  4 {language === 'zh' ? '个技能并行运行中' : 'skills running in parallel'}
                </span>
              </div>
              
              <h3 className="text-sm font-bold text-[#2C2C2C] mb-4">
                {language === 'zh' ? '智能体 + 技能' : 'Agents + Skills'}
              </h3>

              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'landing.skillDriven.tasks.docProcessing', status: 'done' },
                  { icon: BarChart2, label: 'landing.skillDriven.tasks.dataAnalysis', status: 'done' },
                  { icon: Settings, label: 'landing.skillDriven.tasks.complexCoding', status: 'loading' },
                  { icon: Globe, label: 'landing.skillDriven.tasks.webCrawling', status: 'loading' }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F5F2EB] rounded-lg">
                    <div className="flex items-center gap-3">
                      <task.icon size={16} className="text-[#8C8C8C]" />
                      <span className="text-xs font-medium text-[#4A4A4A]">{t(task.label)}</span>
                    </div>
                    {task.status === 'done' ? (
                      <div className="bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>
                    ) : (
                      <Loader2 size={14} className="text-[#D4C5A8] animate-spin" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center text-white text-[8px]">C</div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center text-white text-[8px]">G</div>
                    <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center text-white text-[8px]">X</div>
                  </div>
                  <span>3 {language === 'zh' ? '个智能体异步协作中' : 'agents collaborating'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>2 {t('landing.skillDriven.status.completed')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <span>2 {t('landing.skillDriven.status.running')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Context Lake Section */}
      <section className="py-24 px-4">
        <motion.div 
          className="max-w-6xl mx-auto bg-[#EDEBF5] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-20 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2C2C2C] mb-6 leading-tight">
              {t('landing.contextLake.title')}
            </h2>
            <p className="text-[#5C5C5C] text-lg leading-relaxed mb-8">
              {t('landing.contextLake.description')}
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-medium text-gray-500">{t('landing.contextLake.semanticLayer')}</span>
              </div>
              
              <h3 className="text-sm font-bold text-[#2C2C2C] mb-4">{t('landing.contextLake.yourDataSources')}</h3>

              <div className="space-y-3">
                {[
                  { icon: Database, label: 'landing.contextLake.sources.postgres', checked: true },
                  { icon: Folder, label: 'landing.contextLake.sources.gdrive', checked: true },
                  { icon: FileSpreadsheet, label: 'landing.contextLake.sources.csv', checked: true },
                  { icon: Cloud, label: 'landing.contextLake.sources.s3', checked: false }
                ].map((source, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F5F2EB] rounded-lg">
                    <div className="flex items-center gap-3">
                      <source.icon size={16} className="text-[#8C8C8C]" />
                      <span className="text-xs font-medium text-[#4A4A4A]">{t(source.label)}</span>
                    </div>
                    {source.checked ? (
                      <div className="bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-4">
                <ArrowDown size={16} className="text-orange-400" />
              </div>

              <div className="bg-[#FFF9F0] border border-[#FFE8CC] rounded-lg p-3 text-center">
                <span className="text-xs font-bold text-[#E67E22] block">Context Lake</span>
                <span className="text-[10px] text-[#E67E22]">{t('landing.contextLake.connect')}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>3 {language === 'zh' ? '个数据源已连接' : 'sources connected'}</span>
                </div>
                <span>30+ {language === 'zh' ? '连接器' : 'connectors'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Long Tasks Section */}
      <section className="py-24 px-4">
        <motion.div 
          className="max-w-6xl mx-auto bg-[#E6F0F7] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-20 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2C2C2C] mb-6 leading-tight">
              {t('landing.longTasks.title')}
            </h2>
            <p className="text-[#5C5C5C] text-lg leading-relaxed mb-8">
              {t('landing.longTasks.description')}
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-medium text-gray-500">{t('landing.longTasks.cardTitle')}</span>
              </div>
              
              <h3 className="text-sm font-bold text-[#2C2C2C] mb-4">{t('landing.longTasks.cardSubtitle')}</h3>

              <div className="space-y-4 relative">
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100" />
                
                {[
                  { icon: Search, label: 'landing.longTasks.steps.research', status: 'done', time: '12 min' },
                  { icon: Settings, label: 'landing.longTasks.steps.api', status: 'done', time: '28 min' },
                  { icon: PenTool, label: 'landing.longTasks.steps.test', status: 'active', time: '6 min' },
                  { icon: Rocket, label: 'landing.longTasks.steps.deploy', status: 'pending', time: '--' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                        step.status === 'done' ? 'bg-green-500 border-green-500 text-white' :
                        step.status === 'active' ? 'bg-white border-blue-500 text-blue-500' :
                        'bg-white border-gray-200 text-gray-300'
                      }`}>
                        {step.status === 'done' ? <CheckCircle2 size={14} /> : 
                         step.icon === Search ? <Search size={14} /> :
                         step.icon === Settings ? <Settings size={14} /> :
                         step.icon === PenTool ? <PenTool size={14} /> :
                         <Rocket size={14} />
                        }
                      </div>
                      <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-[#4A4A4A]'}`}>
                        {t(step.label)}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">{step.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>{language === 'zh' ? '已运行 46 分钟' : 'Running for 46m'}</span>
                  <span>63%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[63%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Potential Section */}
      <section id="agents" className="py-24 px-4 text-center">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#4A3728] mb-16 tracking-tight">
            {t('landing.potential.title')}
          </h2>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-x-auto">
            <div className="flex min-w-[800px] justify-between items-start gap-8">
              {/* Column 1: Agents */}
              <div className="flex-1 space-y-3">
                <div className="text-xs font-medium text-gray-500 mb-4 text-left">{t('landing.potential.agents')}</div>
                {['claude', 'gemini', 'codex', 'askxbot'].map((key) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-[#FDFBF7] border border-[#F0E6D2] rounded-lg">
                    <div className="w-6 h-6 rounded bg-[#F5F0E6] flex items-center justify-center">
                      <Bot size={14} className="text-[#4A3728]" />
                    </div>
                    <span className="text-sm text-[#4A4A4A]">{t(`landing.potential.agentList.${key}`)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-20">
                <div className="w-8 h-8 rounded-full bg-[#F5F0E6] flex items-center justify-center text-gray-400">
                  <Plus size={16} />
                </div>
              </div>

              {/* Column 2: Models */}
              <div className="flex-1 space-y-3">
                <div className="text-xs font-medium text-gray-500 mb-4 text-left">{t('landing.potential.models')}</div>
                <div className="grid grid-cols-2 gap-3">
                  {['Sonnet', 'Opus', 'GPT-4o', 'o3', '2.5 Pro', '2.5 Flash', 'Kimi K2', 'Minimax', 'GLM', 'Qwen'].map((model) => (
                    <div key={model} className="px-2 py-1.5 bg-white border border-gray-200 rounded text-[10px] text-gray-600 flex items-center gap-1">
                      <Sparkles size={8} className="text-orange-400" />
                      {model}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-20">
                <div className="w-8 h-8 rounded-full bg-[#F5F0E6] flex items-center justify-center text-gray-400">
                  <Plus size={16} />
                </div>
              </div>

              {/* Column 3: Skills */}
              <div className="flex-1 space-y-3">
                <div className="text-xs font-medium text-gray-500 mb-4 text-left">{t('landing.potential.skills')}</div>
                {['research', 'sec', 'stock', 'browser', 'podcast', 'app'].map((key) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-[#FDFBF7] border border-[#F0E6D2] rounded-lg">
                    <div className="w-6 h-6 rounded bg-[#F5F0E6] flex items-center justify-center">
                      <Code size={14} className="text-[#4A3728]" />
                    </div>
                    <span className="text-sm text-[#4A4A4A]">{t(`landing.potential.skillList.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#4A3728] text-white rounded-lg font-medium hover:bg-[#3A2B20] transition-colors shadow-lg hover:shadow-xl"
            >
              {t('landing.potential.start')}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#4A3728] mb-12 text-center">
            {t('landing.faq.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {(Array.isArray(t('landing.faq.items', { returnObjects: true })) ? t('landing.faq.items', { returnObjects: true }) : []).map((item: {q: string, a: string}, i: number) => (
              <div key={i} className="space-y-3">
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-[#4A3728] shrink-0 mt-0.5" />
                  <h3 className="font-medium text-[#2C2C2C]">{item.q}</h3>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed pl-8">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#E6E0D0] bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs text-[#8C8C8C]">
            <a href="#features" className="hover:text-[#4A3728]">{t('landing.footer.features')}</a>
            <a href="#agents" className="hover:text-[#4A3728]">{t('landing.footer.agents')}</a>
            <a href="#faq" className="hover:text-[#4A3728]">{t('landing.footer.faq')}</a>
            <a href="#" className="hover:text-[#4A3728]">{t('landing.footer.privacy')}</a>
            <a href="#" className="hover:text-[#4A3728]">{t('landing.footer.terms')}</a>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-[#6B6B6B] hover:bg-gray-50">
            <Moon size={12} />
            {t('landing.footer.darkMode')}
          </button>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center text-[10px] text-[#B0B0B0]">
          {t('landing.footer.copyright')}
        </div>
      </footer>
    </div>
  );
}
