import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Folder, Sparkles, Mic, ChevronDown,
  Gift, Link, Bell, X, Cloud, Check, Terminal, Box, Puzzle,
  ListTodo, Clock, ArrowRight, Search, ChevronLeft, ArrowUp, AudioLines
} from 'lucide-react';
import SkillsModal from './SkillsModal';
import AttachFilesModal from './AttachFilesModal';
import api from '../services/api';
import { useStore } from '../store/useStore';

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

interface ProjectTask {
  id: string;
  title: string;
  timestamp: string;
}

/**
 * ProjectPage 组件
 * 
 * 项目详情页面，用于：
 * 1. 展示项目基本信息（名称、创建时间等）
 * 2. 在项目上下文中创建新任务
 * 3. 关联和管理项目特定的技能
 */
export default function ProjectPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentOrg = useStore((state) => state.currentOrganization);
  
  // ---------------------------------------------------------------------------
  // 状态管理
  // ---------------------------------------------------------------------------
  const [project, setProject] = useState<{ id: string; name: string; date: string } | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('Gemini 3 Flash');
  
  // 菜单和模态框状态
  const [showSkillsMenu, setShowSkillsMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isAttachFilesModalOpen, setIsAttachFilesModalOpen] = useState(false);
  
  // 技能和任务列表
  const [agentSkills, setAgentSkills] = useState<Skill[]>([]);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // 副作用处理
  // ---------------------------------------------------------------------------
  
  /**
   * 获取项目详情及关联的任务列表
   */
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${projectId}`),
          api.get(`/tasks/?project_id=${projectId}`)
        ]);
        
        setProject({
          id: projectRes.data.id,
          name: projectRes.data.name,
          date: new Date(projectRes.data.created_at).toLocaleDateString()
        });
        
        setTasks(tasksRes.data.map((t: any) => ({
          id: t.id,
          title: t.title,
          timestamp: new Date(t.created_at).toLocaleDateString()
        })));
      } catch (error) {
        console.error('Failed to fetch project details:', error);
        // 此处可添加错误处理逻辑或回退 UI
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  /**
   * 处理从其他页面跳转时携带的新任务数据
   * 避免重复添加相同的任务
   */
  useEffect(() => {
    if (location.state?.newTask) {
      const newTask = location.state.newTask;
      
      setTasks(prev => {
        if (prev.find(t => t.id === newTask.id)) return prev;
        return [{
          id: newTask.id,
          title: newTask.title,
          timestamp: 'Just now'
        }, ...prev];
      });
    }
  }, [location.state, projectId]);

  /**
   * 移除已选择的技能
   */
  const handleRemoveSkill = (skillId: string) => {
    setAgentSkills(agentSkills.filter(s => s.id !== skillId));
  };

  /**
   * 提交新任务
   * 1. 创建关联到当前项目的新任务
   * 2. 触发侧边栏更新事件
   * 3. 跳转到新任务详情页
   */
  const handleSubmit = async () => {
    if (!inputValue.trim() || !currentOrg || !projectId) return;

    try {
      const response = await api.post('/tasks/', {
        title: inputValue.substring(0, 50) + (inputValue.length > 50 ? '...' : ''),
        subtitle: inputValue.substring(0, 100),
        organization_id: currentOrg.id,
        project_id: projectId,
        icon: 'sun'
      });

      const newTask = response.data;

      // 触发事件以更新侧边栏
      window.dispatchEvent(new CustomEvent('task-created', { detail: newTask }));

      // 导航到新任务页面，并传递初始提示词
      navigate(`/task/${newTask.id}`, { state: { initialPrompt: inputValue.trim() } });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  /**
   * 处理输入框的回车事件
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center h-screen bg-white">Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden" onClick={() => {
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

      {/* Header */}
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-full"></div>
            </div>
            <span className="font-bold text-sm text-gray-700 tracking-wide">ASKXBOT</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-transparent px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
            <Search size={14} />
            <span>⌘K</span>
          </div>

          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={14} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <div className="relative flex items-center gap-1 text-xs hover:text-gray-600 cursor-pointer">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 border border-white"></div>
            <Gift size={16} />
          </div>
          <div className="flex items-center gap-1 text-xs hover:text-gray-600 cursor-pointer">
            <Link size={16} />
            <span>0</span>
          </div>
          <div className="relative hover:text-gray-600 cursor-pointer">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0 right-0 border border-white"></div>
            <Bell size={16} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 -mt-20">
        {/* Project Icon */}
        <div className="w-20 h-20 bg-[#F7F7F5] rounded-2xl flex items-center justify-center mb-6">
          <Folder size={32} className="text-gray-400" />
        </div>

        {/* Project Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{project?.name || 'Untitled Project'}</h1>

        {/* Metadata */}
        <div className="text-xs text-gray-400 mb-12">
          Created by WY CHENG • Updated {project?.date || 'Just now'}
        </div>

        {/* Input Area */}
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 relative group hover:shadow-md transition-shadow">
          
          {/* Agent Skills & Cloud Icon */}
          <div className="relative flex flex-col gap-2 mb-2">
            {/* Row 1: Selected Skills */}
            {agentSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
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
                <span className="text-xs font-medium text-gray-600">Skills</span>
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
                {['webapp-testing', 'video-producer', 'youtube-summarizer', 'highlight-reel-scripter', 'echarts'].map((tag) => (
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
            onKeyDown={handleKeyDown}
          />

          {/* Bottom Toolbar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
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
                  <ChevronDown size={12} />
                </button>

                {/* Skills Menu */}
                {showSkillsMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                    {[
                      { name: 'Claude Code', icon: <Sparkles size={14} className="text-orange-500" />, active: true },
                      { name: 'Gemini CLI', icon: <Sparkles size={14} className="text-blue-500" /> },
                      { name: 'Codex', icon: <Box size={14} className="text-gray-500" /> },
                      { name: 'Rebyte Code', icon: <Terminal size={14} className="text-black" /> },
                    ].map((item) => (
                      <button 
                        key={item.name}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.active && <Check size={14} className="ml-auto text-gray-900" />}
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
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Minimax 2.5</span>
                      <span className="text-xs text-gray-400">Free</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Kimi 2.5</span>
                      <span className="text-xs text-gray-400">Kimi latest model</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700" onClick={() => setSelectedModel('GLM 5')}>
                      <div className="flex items-center gap-2">
                        {selectedModel === 'GLM 5' && <Check size={14} />}
                        <span>GLM 5</span>
                      </div>
                      <span className="text-xs text-gray-400">Zhipu GLM 5</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Qwen 3 Max</span>
                      <span className="text-xs text-gray-400">With thinking</span>
                    </button>

                    <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">OpenAI</div>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>GPT-5.2 Codex</span>
                      <span className="text-xs text-gray-400">Optimized for code</span>
                    </button>

                    <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Anthropic</div>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Claude Sonnet 4.6</span>
                      <span className="text-xs text-gray-400">Fast and capable</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Claude Opus 4.6</span>
                      <span className="text-xs text-gray-400">Most capable</span>
                    </button>

                    <div className="px-3 py-1 mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Google</div>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Gemini 3 Flash</span>
                      <span className="text-xs text-gray-400">Free</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center justify-between text-gray-700">
                      <span>Gemini 3.1 Pro</span>
                      <span className="text-xs text-gray-400">Most capable</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
                <AudioLines size={16} />
              </button>
              <button 
                className={`p-2 rounded-full transition-colors ${inputValue.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                disabled={!inputValue.trim()}
                onClick={handleSubmit}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {tasks.length > 0 && (
          <div className="w-full max-w-2xl">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tasks</h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => navigate(`/task/${task.id}`)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gray-100 rounded-md text-gray-500">
                      <Link size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-400">{task.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{task.timestamp}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
