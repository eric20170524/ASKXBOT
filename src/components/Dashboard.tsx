import { 
  Github, Mic, ChevronDown, Sparkles, Check, Terminal, Puzzle, Briefcase, Box, X, Cloud, RefreshCw, ArrowUp, Copy
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SUGGESTIONS, 
  BUILD_SUGGESTIONS, 
  PROFESSIONAL_CATEGORIES, 
  WORKFLOWS,
  EXAMPLES,
  BUILD_EXAMPLES,
  SKILL_SUGGESTIONS,
  SKILL_EXAMPLES
} from '../data/mockData';
import SkillsModal from './SkillsModal';
import AttachFilesModal from './AttachFilesModal';
import UpgradePlanModal from './UpgradePlanModal';
import OrganizationModal from './OrganizationModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import api from '../services/api';

type Mode = 'knowledge' | 'build' | 'skills';

interface Skill {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  downloads: string;
  updated: string;
  featured?: boolean;
}

/**
 * Dashboard 组件
 * 
 * 这是应用程序的主工作区，用户可以在此：
 * 1. 输入提示词创建新任务
 * 2. 浏览和选择不同的 AI 模型和 Agent
 * 3. 从预设的知识库、构建示例和技能模板中获取灵感
 * 4. 管理团队和个人设置
 */
export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const user = useStore((state) => state.user);
  const currentOrg = useStore((state) => state.currentOrganization);
  
  // ---------------------------------------------------------------------------
  // 状态管理
  // ---------------------------------------------------------------------------
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('GLM 5');
  const [selectedAgent, setSelectedAgent] = useState('Claude Code');
  const [activeMode, setActiveMode] = useState<Mode>('knowledge');
  const [selectedSkill, setSelectedSkill] = useState<{title: string} | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>(['webapp-testing', 'video-producer', 'youtube-summarizer', 'highlight-reel-scripter', 'echarts']);
  
  // 菜单和模态框的显示状态
  const [showSkillsMenu, setShowSkillsMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [agentSkills, setAgentSkills] = useState<Skill[]>([]);
  const [isAttachFilesModalOpen, setIsAttachFilesModalOpen] = useState(false);
  const [isGitModalOpen, setIsGitModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  
  // 用于刷新示例列表的触发器
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // GitHub 授权和应用安装状态
  const [githubAuthState, setGithubAuthState] = useState<'idle' | 'waiting'>('idle');
  const [githubAppInstallState, setGithubAppInstallState] = useState<'idle' | 'installing'>('idle');
  const [copied, setCopied] = useState(false);

  /**
   * 处理复制授权码操作
   */
  const handleCopyCode = () => {
    navigator.clipboard.writeText('150A-71B3');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * 模拟 GitHub 授权流程
   */
  const handleGithubAuth = () => {
    setGithubAuthState('waiting');
    window.open('/mock-github', '_blank');
  };

  /**
   * 模拟 GitHub App 安装流程
   */
  const handleGithubInstall = () => {
    setGithubAppInstallState('installing');
    window.open('/mock-github', '_blank');
  };

  /**
   * 动态计算并随机打乱当前选定分类的示例列表
   * 每次 refreshTrigger 更新时重新计算
   */
  const displayedExamples = useMemo(() => {
    if (activeMode === 'build') return []; // Handled by displayedBuildExamples
    if (!selectedCategory || !EXAMPLES[selectedCategory]) return [];
    
    const shuffled = [...EXAMPLES[selectedCategory]];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  }, [selectedCategory, refreshTrigger, activeMode]);

  /**
   * 动态计算并随机打乱当前选定分类的构建示例列表
   */
  const displayedBuildExamples = useMemo(() => {
    if (activeMode !== 'build' || !selectedCategory || !BUILD_EXAMPLES[selectedCategory]) return [];
    
    const shuffled = [...BUILD_EXAMPLES[selectedCategory]];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  }, [selectedCategory, refreshTrigger, activeMode]);

  // ---------------------------------------------------------------------------
  // 副作用处理
  // ---------------------------------------------------------------------------
  
  // 处理从其他页面跳转过来时携带的初始状态（例如选中的技能）
  useEffect(() => {
    if (location.state && location.state.selectedSkill) {
      setSelectedSkill(location.state.selectedSkill);
      // 清除 state，避免刷新页面时重复应用
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 点击外部关闭菜单的逻辑（此处仅作占位，实际由 onClick 处理）
  useEffect(() => {
    const handleClickOutside = () => {
      // 在实际应用中，我们会检查点击目标是否在菜单内部
    };
  }, []);

  // 根据当前激活的模式选择对应的建议列表
  const currentSuggestions = activeMode === 'build' ? BUILD_SUGGESTIONS : activeMode === 'skills' ? SKILL_SUGGESTIONS : SUGGESTIONS;

  /**
   * 移除已选择的 Agent 技能
   */
  const handleRemoveSkill = (skillId: string) => {
    setAgentSkills(agentSkills.filter(s => s.id !== skillId));
  };

  /**
   * 创建新任务并跳转到任务详情页
   * 包含当前输入的提示词、选中的模型和技能等上下文信息
   */
  const handleCreateTask = async () => {
    if (!inputValue.trim() || !currentOrg) return;
    
    try {
      const response = await api.post('/tasks/', {
        title: inputValue.substring(0, 50) + (inputValue.length > 50 ? '...' : ''),
        subtitle: inputValue.substring(0, 100),
        organization_id: currentOrg.id,
        icon: 'bot'
      });
      
      const newTask = response.data;
      
      // Dispatch event for sidebar to update
      window.dispatchEvent(new CustomEvent('task-created', { detail: newTask }));
      
      navigate(`/task/${newTask.id}`, { 
        state: { 
          initialPrompt: inputValue,
          model: selectedModel,
          skills: agentSkills,
          selectedSkill: selectedSkill
        } 
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const userName = user?.first_name || 'User';

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-12 md:py-20" onClick={() => {
      if (showSkillsMenu) setShowSkillsMenu(false);
      if (showModelMenu) setShowModelMenu(false);
    }}>
      
      <SkillsModal 
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        onSelect={(skills) => {
          setAgentSkills(skills);
          setIsSkillsModalOpen(false);
        }}
        onCreateWithAgent={() => {
          const newSkill: Skill = {
            id: 'team-skill-workflow',
            title: 'team-skill-workflow',
            author: 'Team',
            description: 'Custom team workflow created with Agent',
            tags: ['Custom', 'Workflow'],
            downloads: '0',
            updated: 'Just now',
            featured: true
          };
          
          if (!agentSkills.find(s => s.id === newSkill.id)) {
            setAgentSkills([...agentSkills, newSkill]);
          }
          setIsSkillsModalOpen(false);
        }}
        initialSelectedSkills={agentSkills}
      />

      <AttachFilesModal 
        isOpen={isAttachFilesModalOpen}
        onClose={() => setIsAttachFilesModalOpen(false)}
      />

      <UpgradePlanModal 
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      <OrganizationModal 
        isOpen={isOrganizationModalOpen}
        onClose={() => setIsOrganizationModalOpen(false)}
      />

      {/* Team Banner */}
      <div className="mb-8 flex items-center gap-2 bg-[#F2F1EF] px-4 py-1.5 rounded-full text-xs text-gray-600">
        <button 
          onClick={() => setIsOrganizationModalOpen(true)}
          className="flex items-center gap-1 hover:text-black transition-colors"
        >
          <span className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center text-[8px] text-white">{t('dashboard.user')}</span>
          邀请你的团队
        </button>
        <span className="w-[1px] h-3 bg-gray-300"></span>
        <button 
          onClick={() => setIsUpgradeModalOpen(true)}
          className="font-medium hover:text-black transition-colors"
        >
          {t('dashboard.upgrade')}
        </button>
      </div>

      {/* Greeting */}
      <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-10 text-center tracking-tight">
        {t('dashboard.welcome')}, <span className="italic">{userName}</span>
      </h1>

      {/* Input Box */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 relative group hover:shadow-md transition-shadow">
        {/* Selected Skill Chip (Legacy/Single) */}
        {/* Agent Skills & Cloud Icon */}
        <div className="relative flex flex-col gap-2 mb-2">
          {/* Row 1: Selected Skills */}
          {(agentSkills.length > 0 || selectedSkill) && (
            <div className="flex flex-wrap gap-1">
              {/* Render selectedSkill if present */}
              {selectedSkill && (
                <div className="flex items-center gap-1 bg-orange-50 border border-orange-100 rounded-md px-2 py-0.5 shadow-sm">
                  <Puzzle size={12} className="text-orange-500" />
                  <span className="text-xs font-medium text-orange-700">{selectedSkill.title}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkill(null);
                    }}
                    className="ml-0.5 text-orange-400 hover:text-orange-600"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* Render agentSkills */}
              {agentSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1 bg-orange-50 border border-orange-100 rounded-md px-2 py-0.5 shadow-sm">
                  <Puzzle size={12} className="text-orange-500" />
                  <span className="text-xs font-medium text-orange-700">{skill.title}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSkill(skill.id);
                    }}
                    className="ml-0.5 text-orange-400 hover:text-orange-600"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Row 2: Skills Button & Cloud Icon */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSkillsModalOpen(true)}
              className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Sparkles size={12} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{t('sidebar.skills')}</span>
            </button>

            <button 
              onClick={() => setIsAttachFilesModalOpen(true)}
              className="flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
               <Cloud size={12} className="text-blue-400" />
            </button>
          </div>

          {/* Row 3: Suggested Skills (Conditional) */}
          {inputValue.trim().length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-gray-400 shrink-0 uppercase tracking-wider font-medium">Suggested:</span>
              {suggestedSkills.map((tag) => (
                <button 
                  key={tag}
                  onClick={() => {
                    if (!agentSkills.find(s => s.title === tag)) {
                      setAgentSkills([...agentSkills, {
                        id: tag,
                        title: tag,
                        author: 'System',
                        description: 'Suggested skill',
                        tags: ['Suggested'],
                        downloads: '0',
                        updated: 'Just now'
                      }]);
                    }
                  }}
                  className="text-xs text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 px-2 py-0.5 rounded-md transition-colors whitespace-nowrap border border-gray-200 shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-32 pb-10 resize-none outline-none text-gray-700 placeholder:text-gray-300 text-base bg-transparent no-scrollbar"
          placeholder="Describe what you want to build in detail"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* Bottom Toolbar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsGitModalOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <Github size={18} />
            </button>
            
            <div className="h-4 w-[1px] bg-gray-200"></div>
            
            {/* Skills Dropdown Trigger */}
            <div className="relative">
              <button 
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md transition-colors ${showSkillsMenu ? 'bg-orange-50 text-orange-600' : 'text-orange-600 hover:bg-orange-50'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSkillsMenu(!showSkillsMenu);
                  setShowModelMenu(false);
                }}
              >
                <Sparkles size={14} />
                {selectedAgent}
                <ChevronDown size={12} />
              </button>

              {/* Skills Menu */}
              {showSkillsMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                  {[
                    { name: 'Claude Code', icon: <Sparkles size={14} className="text-orange-500" /> },
                    { name: 'Gemini CLI', icon: <Sparkles size={14} className="text-blue-500" /> },
                    { name: 'Codex', icon: <Box size={14} className="text-gray-500" /> },
                    { name: 'Rebyte Code', icon: <Terminal size={14} className="text-black" /> },
                  ].map((item) => (
                    <button 
                      key={item.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAgent(item.name);
                        setShowSkillsMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      {selectedAgent === item.name && <Check size={14} className="ml-auto text-gray-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Model Dropdown Trigger */}
            <div className="relative">
              <button 
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md transition-colors ${showModelMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModelMenu(!showModelMenu);
                  setShowSkillsMenu(false);
                }}
              >
                {selectedModel}
                <ChevronDown size={12} />
              </button>

              {/* Model Menu */}
              {showModelMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-sm max-h-96 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Open Source</div>
                  <button onClick={() => { setSelectedModel('Minimax 2.5'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Minimax 2.5' && <Check size={14} />}
                      <span>Minimax 2.5</span>
                    </div>
                    <span className="text-xs text-gray-400">Free</span>
                  </button>
                  <button onClick={() => { setSelectedModel('Kimi 2.5'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Kimi 2.5' && <Check size={14} />}
                      <span>Kimi 2.5</span>
                    </div>
                    <span className="text-xs text-gray-400">Kimi latest model</span>
                  </button>
                  <button onClick={() => { setSelectedModel('GLM 5'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'GLM 5' && <Check size={14} />}
                      <span>GLM 5</span>
                    </div>
                    <span className="text-xs text-gray-400">Zhipu GLM 5</span>
                  </button>
                  <button onClick={() => { setSelectedModel('Qwen 3 Max'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Qwen 3 Max' && <Check size={14} />}
                      <span>Qwen 3 Max</span>
                    </div>
                    <span className="text-xs text-gray-400">With thinking</span>
                  </button>

                  <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">OpenAI</div>
                  <button onClick={() => { setSelectedModel('GPT-5.2 Codex'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'GPT-5.2 Codex' && <Check size={14} />}
                      <span>GPT-5.2 Codex</span>
                    </div>
                    <span className="text-xs text-gray-400">Optimized for code</span>
                  </button>

                  <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Anthropic</div>
                  <button onClick={() => { setSelectedModel('Claude Sonnet 4.6'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Claude Sonnet 4.6' && <Check size={14} />}
                      <span>Claude Sonnet 4.6</span>
                    </div>
                    <span className="text-xs text-gray-400">Fast and capable</span>
                  </button>
                  <button onClick={() => { setSelectedModel('Claude Opus 4.6'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Claude Opus 4.6' && <Check size={14} />}
                      <span>Claude Opus 4.6</span>
                    </div>
                    <span className="text-xs text-gray-400">Most capable</span>
                  </button>

                  <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Google</div>
                  <button onClick={() => { setSelectedModel('Gemini 3 Flash'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Gemini 3 Flash' && <Check size={14} />}
                      <span>Gemini 3 Flash</span>
                    </div>
                    <span className="text-xs text-gray-400">Free</span>
                  </button>
                  <button onClick={() => { setSelectedModel('Gemini 3.1 Pro'); setShowModelMenu(false); }} className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      {selectedModel === 'Gemini 3.1 Pro' && <Check size={14} />}
                      <span>Gemini 3.1 Pro</span>
                    </div>
                    <span className="text-xs text-gray-400">Most capable</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
              <Mic size={16} />
            </button>
            {inputValue.trim() && (
              <button 
                onClick={handleCreateTask}
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                <ArrowUp size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-1 bg-[#F2F1EF] p-1 rounded-lg mb-8">
        <button 
          onClick={() => { setActiveMode('knowledge'); setSelectedCategory(null); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeMode === 'knowledge' 
              ? 'bg-[#E8E6E3] text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          <Briefcase size={14} />
          {activeMode === 'knowledge' && <span>{t('dashboard.modes.knowledge')}</span>}
        </button>
        
        <button 
          onClick={() => { setActiveMode('build'); setSelectedCategory(null); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeMode === 'build' 
              ? 'bg-[#FADFA1] text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          <span className="font-mono">{'>_'}</span>
          {activeMode === 'build' && <span>{t('dashboard.modes.build')}</span>}
        </button>
        
        <button 
          onClick={() => { setActiveMode('skills'); setSelectedCategory(null); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeMode === 'skills' 
              ? 'bg-[#FADFA1] text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          <Puzzle size={14} />
          {activeMode === 'skills' && <span>{t('dashboard.modes.skills')}</span>}
        </button>
      </div>

      {/* Suggestions Grid */}
      <div className="w-full max-w-3xl">
          <>
            {activeMode !== 'skills' && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {currentSuggestions.map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      setSelectedCategory(item.label);
                      setSelectedSkill(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm transition-all ${
                      selectedCategory === item.label 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {item.icon}
                    {t(item.label)}
                  </button>
                ))}
              </div>
            )}

            {activeMode === 'knowledge' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#FDFDFC] px-4 text-xs text-gray-400 italic font-serif">{t('dashboard.professional')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {PROFESSIONAL_CATEGORIES.map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => {
                        setSelectedCategory(item.label);
                        setSelectedSkill({ title: t(item.label) });
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm transition-all ${
                        selectedCategory === item.label 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {item.icon}
                      {t(item.label)}
                    </button>
                  ))}
                </div>

                {selectedCategory && EXAMPLES[selectedCategory] && (
                  <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-lg font-serif italic text-gray-500">{t('dashboard.examples')}</h3>
                      <button 
                        onClick={() => setRefreshTrigger(prev => prev + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Refresh examples"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {displayedExamples.map((example, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setInputValue(example.prompt);
                            setSelectedSkill({ title: example.skill });
                            setSuggestedSkills(example.suggested);
                          }}
                          className="text-left p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white flex flex-col h-full group"
                        >
                          <h4 className="font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{example.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-auto pt-2">
                             {example.suggested.slice(0, 3).map(tag => (
                               <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">{tag}</span>
                             ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCategory && WORKFLOWS[selectedCategory] && (
                  <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-4">
                      <h3 className="text-lg font-serif italic text-gray-500">{t('dashboard.workflows')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {WORKFLOWS[selectedCategory].map((workflow, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setInputValue(workflow.description)}
                          className="text-left p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white flex flex-col h-full group"
                        >
                          <h4 className="font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{workflow.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-3">{workflow.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeMode === 'build' && (
              <>
                {selectedCategory && BUILD_EXAMPLES[selectedCategory] && (
                  <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-lg font-serif italic text-gray-500">{t('dashboard.examples')}</h3>
                      <button 
                        onClick={() => setRefreshTrigger(prev => prev + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Refresh examples"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {displayedBuildExamples.map((example, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setInputValue(example.description)}
                          className="text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white flex flex-col h-full group overflow-hidden"
                        >
                          <div className="h-32 w-full bg-gray-100 relative overflow-hidden">
                             <img src={example.image} alt={example.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h4 className="font-medium text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">{example.title}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{example.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                               {example.tags.map(tag => (
                                 <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">{tag}</span>
                               ))}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {activeMode === 'skills' && (
              <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm">
                    {t('dashboard.skills.createDesc')}
                  </p>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <h3 className="text-lg font-serif italic text-gray-500">{t('dashboard.examples')}</h3>
                  <button 
                    onClick={() => setRefreshTrigger(prev => prev + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Refresh examples"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SKILL_EXAMPLES.map((example, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setInputValue(t(example.description))}
                      className="text-left p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white flex flex-col h-full group"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{t(example.title)}</h4>
                      <p className="text-xs text-gray-500 line-clamp-3">{t(example.description)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
      </div>

      {/* Help Icon */}
      <div className="fixed bottom-6 right-6">
         <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold hover:bg-gray-300 transition-colors">
           ?
         </button>
      </div>

      {/* Git Modal */}
      <AnimatePresence>
        {isGitModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGitModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">{t('dashboard.githubModal.title')}</h2>
                <button onClick={() => setIsGitModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* CLI Device Flow */}
                <div className="border border-gray-200 rounded-xl p-5 flex gap-4">
                  <div className="mt-1 shrink-0">
                    <Github size={24} className="text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base">{t('dashboard.githubModal.cliFlow')}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{t('dashboard.githubModal.cliDesc')}</p>
                    <div className="flex items-center justify-between mt-6">
                      {githubAuthState === 'idle' ? (
                        <span className="text-sm text-gray-500">{t('dashboard.githubModal.notConnected')}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw size={14} className="animate-spin text-gray-400" />
                          <span className="text-sm text-gray-500">{t('dashboard.githubModal.waitingAuth')}</span>
                        </div>
                      )}
                      
                      {githubAuthState === 'idle' ? (
                        <button 
                          onClick={handleGithubAuth}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {t('dashboard.githubModal.authorize')}
                        </button>
                      ) : (
                        <button 
                          onClick={handleCopyCode}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          <span className="font-mono tracking-wider">150A-71B3</span>
                          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* GitHub App */}
                <div className="border border-gray-200 rounded-xl p-5 flex gap-4">
                  <div className="mt-1 shrink-0">
                    <Github size={24} className="text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base">{t('dashboard.githubModal.githubApp')}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{t('dashboard.githubModal.appDesc')}</p>
                    <div className="flex items-center justify-between mt-6">
                      {githubAppInstallState === 'idle' ? (
                        <span className="text-sm text-gray-500">{t('dashboard.githubModal.notInstalled')}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw size={14} className="animate-spin text-gray-400" />
                          <span className="text-sm text-gray-500">{t('dashboard.githubModal.installing')}</span>
                        </div>
                      )}
                      
                      {githubAppInstallState === 'idle' ? (
                        <button 
                          onClick={handleGithubInstall}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {t('dashboard.githubModal.install')}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

