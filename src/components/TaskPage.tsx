import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FileText, Clock, ChevronLeft, Github, Sparkles, 
  ChevronDown, Monitor, Globe, Paperclip, ArrowUp,
  MoreHorizontal, Share, Plus, Copy, ThumbsUp, ThumbsDown,
  Image as ImageIcon, Cloud, Gift, Lock, Bell, Link, X
} from 'lucide-react';
import AgentComputerSidebar, { Tab } from './AgentComputerSidebar';
import SkillsModal, { Skill } from './SkillsModal';
import VisibilitySettingsPopover from './VisibilitySettingsPopover';
import api from '../services/api';
import { useStore } from '../store/useStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * TaskPage 组件
 * 
 * 任务详情和对话页面，用户可以在此：
 * 1. 与 Agent 进行对话交流
 * 2. 查看和管理任务的技能
 * 3. 访问 Agent 电脑视图（查看代码、浏览器等）
 * 4. 将任务转换为项目
 */
export default function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentOrg = useStore((state) => state.currentOrganization);
  
  // ---------------------------------------------------------------------------
  // 状态管理
  // ---------------------------------------------------------------------------
  const [task, setTask] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 侧边栏和模态框状态
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarActiveTab, setSidebarActiveTab] = useState<Tab>('source');
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [agentSkills, setAgentSkills] = useState<Skill[]>([]);
  const [isVisibilityPopoverOpen, setIsVisibilityPopoverOpen] = useState(false);
  
  // DOM 引用
  const visibilityButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // 副作用处理
  // ---------------------------------------------------------------------------
  
  /**
   * 获取任务详情并初始化对话
   */
  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      try {
        const response = await api.get(`/tasks/${taskId}`);
        setTask(response.data);
        
        // 如果从其他页面跳转时携带了初始提示词，则使用该提示词作为第一条消息
        if (location.state?.initialPrompt) {
          const initialUserMsg: Message = {
            id: 'msg-1',
            role: 'user',
            content: location.state.initialPrompt,
            timestamp: new Date()
          };
          setMessages([initialUserMsg]);
          
          setIsLoading(true);
          // 模拟 Agent 响应
          setTimeout(() => {
            const agentMsg: Message = {
              id: 'msg-2',
              role: 'assistant',
              content: `I've started working on your request: "${location.state.initialPrompt}". \n\nThis is a simulated response for task ${taskId}.`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, agentMsg]);
            setIsLoading(false);
          }, 1000);
        } else {
          // 否则仅显示任务标题作为初始消息
          setMessages([
            {
              id: 'msg-1',
              role: 'user',
              content: response.data.title || 'Task ' + taskId,
              timestamp: new Date(response.data.created_at || Date.now())
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch task:', error);
      }
    };

    fetchTask();
  }, [taskId, location.state]);

  /**
   * 滚动到最新消息
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 当消息列表更新或加载状态改变时，自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /**
   * 发送用户消息并模拟 Agent 响应
   */
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    // 模拟 Agent 延迟响应
    setTimeout(() => {
      const newAgentMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I received your message: "${newUserMsg.content}"`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAgentMsg]);
      setIsLoading(false);
    }, 1000);
  };

  /**
   * 移除已选择的技能
   */
  const handleRemoveSkill = (skillId: string) => {
    setAgentSkills(agentSkills.filter(s => s.id !== skillId));
  };

  /**
   * 将当前任务转换为项目
   * 1. 创建新项目
   * 2. 更新当前任务关联到新项目
   * 3. 触发侧边栏更新事件
   * 4. 跳转到新项目页面
   */
  const handleCreateTaskInProject = async () => {
    if (!taskId || !currentOrg || !task) return;

    try {
      // 1. 创建新项目
      const projectName = task.title.substring(0, 50) || `Project for Task ${taskId}`;
      const projectRes = await api.post('/projects/', {
        name: projectName,
        description: task.subtitle || '',
        organization_id: currentOrg.id
      });
      
      const newProject = projectRes.data;

      // 2. 更新任务，将其关联到新项目
      await api.put(`/tasks/${taskId}`, {
        ...task,
        project_id: newProject.id
      });

      // 3. 触发事件以更新侧边栏
      window.dispatchEvent(new CustomEvent('project-created', { detail: newProject }));
      
      // 4. 导航到项目页面
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      console.error('Failed to create project from task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
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
      <div className="flex flex-col flex-1 min-w-0 h-full">
        {/* Header */}
        <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-900">Task Identifier {taskId}</span>
            </div>
            
            <div className="h-4 w-[1px] bg-gray-200"></div>
            
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Sparkles size={14} className="text-orange-500" />
              <span>Gemini 3 Flash</span>
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {!task?.project_id && (
              <button 
                onClick={handleCreateTaskInProject}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Plus size={14} />
                在项目中创建任务
              </button>
            )}
            
            <div className="flex items-center gap-1 text-gray-400 text-xs hover:text-gray-600 cursor-pointer">
              <Link size={14} />
              <span>0</span>
            </div>
            
            <button 
              ref={visibilityButtonRef}
              onClick={() => setIsVisibilityPopoverOpen(!isVisibilityPopoverOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Lock size={14} />
              私有
            </button>
            
            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">{taskId}</span>
                </div>
              )}
              
              <div className={`max-w-3xl ${msg.role === 'user' ? 'bg-white' : 'w-full'}`}>
                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'text-right text-gray-800 text-lg' : 'text-gray-800'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>

              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-2">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <Copy size={14} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <Share size={14} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <ImageIcon size={14} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <ThumbsDown size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:px-8 md:pb-8 bg-white">
          <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl shadow-sm bg-white p-3 relative focus-within:ring-1 focus-within:ring-gray-200 transition-shadow">
            {/* Selected Skills */}
            {agentSkills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2 px-1">
                {agentSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1 bg-orange-50 border border-orange-100 rounded-md px-2 py-0.5 shadow-sm">
                    <Sparkles size={12} className="text-orange-500" />
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

            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-2">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  isSidebarOpen 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Monitor size={12} />
                <span>Agent Computer</span>
              </button>
              <button 
                onClick={() => setIsSkillsModalOpen(true)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  isSkillsModalOpen || agentSkills.length > 0
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Sparkles size={12} />
                <span>Skills</span>
              </button>
              <button 
                onClick={() => {
                  setIsSidebarOpen(true);
                  setSidebarActiveTab('changes');
                }}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Github size={12} />
                <span>查看变化</span>
              </button>
              <button 
                onClick={() => {
                  setIsSidebarOpen(true);
                  setSidebarActiveTab('browser');
                }}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Globe size={12} />
                <span>查看浏览器</span>
              </button>
            </div>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Send a message to AskXbot Code"
              className="w-full max-h-60 min-h-[60px] resize-none outline-none text-gray-700 placeholder:text-gray-400 text-sm bg-transparent"
            />

            <div className="flex items-center justify-between mt-2">
               <div className="flex items-center gap-2">
                  {/* Upload button (Cloud icon as requested/shown in screenshot context) */}
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                     <Paperclip size={16} />
                  </button>
               </div>
               
               <button 
                 onClick={handleSendMessage}
                 disabled={!inputValue.trim()}
                 className={`p-1.5 rounded-md transition-colors ${
                   inputValue.trim() 
                     ? 'bg-black text-white hover:bg-gray-800' 
                     : 'bg-gray-100 text-gray-400'
                 }`}
               >
                 <ArrowUp size={16} />
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <VisibilitySettingsPopover 
        isOpen={isVisibilityPopoverOpen}
        onClose={() => setIsVisibilityPopoverOpen(false)}
        anchorRef={visibilityButtonRef}
      />

      <AgentComputerSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={sidebarActiveTab}
        onTabChange={setSidebarActiveTab}
        onQuoteFile={(fileName) => {
          setInputValue(prev => {
            const prefix = prev ? prev + ' ' : '';
            return prefix + `/${fileName}`;
          });
        }}
      />
    </div>
  );
}
