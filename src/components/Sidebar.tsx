import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, Settings, Moon, Sun, Monitor, User, 
  ChevronDown, LayoutGrid, Folder, Clock, 
  MoreHorizontal, Search, PanelLeftClose,
  Gift, Bell, History, Box, Bot, Database,
  Check, Globe, Star, SlidersHorizontal,
  LogOut, CreditCard, Users, Link as LinkIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { MOCK_TASKS, MOCK_PROJECTS } from '../data/mockData';
import CreateProjectModal from './CreateProjectModal';
import ManageOrganizationModal from './ManageOrganizationModal';
import CreateOrganizationModal from './CreateOrganizationModal';
import InviteMembersModal from './InviteMembersModal';
import AccountModal from './AccountModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useStore } from '../store/useStore';
import api from '../services/api';

interface Project {
  id: string;
  name: string;
  date: string;
  orgId: string;
}

interface Task {
  id: number;
  title: string;
  subtitle: string;
  time?: string;
  date?: string;
  icon: string;
  orgId: string;
  project_id?: string;
}

/**
 * Sidebar 组件
 * 
 * 应用程序的全局侧边栏，提供：
 * 1. 导航（Dashboard, Context Lake, Skills 等）
 * 2. 项目和任务的层级展示与管理
 * 3. 组织和个人账户设置
 * 4. 主题和语言切换
 */
export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  // ---------------------------------------------------------------------------
  // 状态管理
  // ---------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // 模态框和菜单状态
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isManageOrgModalOpen, setIsManageOrgModalOpen] = useState(false);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [isInviteMembersModalOpen, setIsInviteMembersModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  
  // 全局状态 (Zustand store)
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const organizations = useStore((state) => state.organizations);
  const currentOrg = useStore((state) => state.currentOrganization);
  const setCurrentOrg = useStore((state) => state.setCurrentOrganization);
  const setOrganizations = useStore((state) => state.setOrganizations);
  
  // 项目和任务数据
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // ---------------------------------------------------------------------------
  // 副作用处理
  // ---------------------------------------------------------------------------
  
  /**
   * 当当前组织变更时，重新获取该组织下的项目和任务
   */
  useEffect(() => {
    if (currentOrg) {
      // Fetch projects for the current organization
      api.get(`/projects/?organization_id=${currentOrg.id}`)
        .then(res => setProjects(res.data))
        .catch(err => console.error('Failed to fetch projects', err));

      // Fetch tasks for the current organization
      api.get(`/tasks/?organization_id=${currentOrg.id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error('Failed to fetch tasks', err));
    }
  }, [currentOrg]);

  /**
   * 监听全局事件，用于跨组件更新项目和任务列表
   */
  useEffect(() => {
    const handleTaskCreated = (event: CustomEvent) => {
      const newTask = event.detail;
      setTasks(prev => {
        const index = prev.findIndex(t => t.id === newTask.id);
        if (index >= 0) {
            // 如果任务已存在，则更新
            const newTasks = [...prev];
            newTasks[index] = newTask;
            return newTasks;
        }
        // 否则将新任务添加到列表头部
        return [newTask, ...prev];
      });
    };

    const handleProjectCreated = (event: CustomEvent) => {
      const newProject = event.detail;
      setProjects(prev => [newProject, ...prev]);
    };

    window.addEventListener('task-created', handleTaskCreated as EventListener);
    window.addEventListener('project-created', handleProjectCreated as EventListener);
    return () => {
      window.removeEventListener('task-created', handleTaskCreated as EventListener);
      window.removeEventListener('project-created', handleProjectCreated as EventListener);
    };
  }, []);

  // 任务过滤状态
  const [filterType, setFilterType] = useState<'all' | 'non-project' | 'favorites'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [favoriteTaskIds, setFavoriteTaskIds] = useState<Set<number>>(new Set());

  /**
   * 判断当前路由是否激活
   */
  const isActive = (path: string) => location.pathname === path;

  /**
   * 创建新项目
   */
  const handleCreateProject = async (name: string, isGithubConnected: boolean) => {
    if (!currentOrg) return;
    try {
      const res = await api.post('/projects/', {
        name,
        organization_id: currentOrg.id,
        description: ''
      });
      const newProject = res.data;
      setProjects([newProject, ...projects]);
      setIsCreateProjectModalOpen(false);
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  /**
   * 创建新组织
   */
  const handleCreateOrganization = async (name: string) => {
    try {
      const res = await api.post('/organizations/', { name });
      const newOrg = res.data;
      setOrganizations([...organizations, newOrg]);
      setCurrentOrg(newOrg);
      setIsCreateOrgModalOpen(false);
      // 创建成功后自动打开邀请成员模态框
      setIsInviteMembersModalOpen(true);
    } catch (error) {
      console.error('Failed to create organization', error);
    }
  };

  /**
   * 切换任务的收藏状态
   */
  const toggleFavorite = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favoriteTaskIds);
    if (newFavorites.has(taskId)) {
      newFavorites.delete(taskId);
    } else {
      newFavorites.add(taskId);
    }
    setFavoriteTaskIds(newFavorites);
  };

  // 根据过滤条件筛选任务
  const filteredProjects = projects;
  const filteredTasks = tasks.filter(t => {
    if (filterType === 'favorites') return favoriteTaskIds.has(t.id);
    if (filterType === 'non-project') return !t.project_id; // 仅显示未关联项目的任务
    return true;
  });

  /**
   * 切换界面语言
   */
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  /**
   * 处理用户登出
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitials = user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U' : 'U';
  const userName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User' : 'User';

  return (
    <div className={`${isOpen ? 'w-[280px]' : 'w-0'} bg-[#F7F7F5] border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden shrink-0 h-screen relative`}>
      <CreateProjectModal 
        isOpen={isCreateProjectModalOpen} 
        onClose={() => setIsCreateProjectModalOpen(false)} 
        onCreate={handleCreateProject}
      />
      
      {currentOrg && (
        <ManageOrganizationModal 
          isOpen={isManageOrgModalOpen} 
          onClose={() => setIsManageOrgModalOpen(false)}
          orgName={currentOrg.name}
        />
      )}

      <CreateOrganizationModal 
        isOpen={isCreateOrgModalOpen} 
        onClose={() => setIsCreateOrgModalOpen(false)} 
        onCreate={handleCreateOrganization}
      />

      {currentOrg && (
        <InviteMembersModal
          isOpen={isInviteMembersModalOpen}
          onClose={() => setIsInviteMembersModalOpen(false)}
          orgName={currentOrg.name}
        />
      )}

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative z-20">
        <div 
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors w-full" 
          onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
        >
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white shrink-0">
            <Box size={14} />
          </div>
          <span className="font-medium text-sm text-gray-700 truncate flex-1">{currentOrg?.name || 'Select Organization'}</span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOrgDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Organization Dropdown */}
        {isOrgDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOrgDropdownOpen(false)} 
            />
            <div className="absolute top-12 left-2 w-[260px] bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between px-2 py-1.5 text-xs font-medium text-gray-500">
                <span>{t('sidebar.manageOrganization')}</span>
              </div>
              
              {organizations.map(org => (
                <div 
                  key={org.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer group mb-1"
                  onClick={() => {
                    setCurrentOrg(org);
                    setIsOrgDropdownOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
                      <Box size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{org.name}</div>
                      <div className="text-xs text-gray-500">{org.role || 'Member'}</div>
                    </div>
                  </div>
                  {currentOrg?.id === org.id && <Check size={14} className="text-gray-600" />}
                </div>
              ))}

              <div className="h-px bg-gray-100 my-1" />

              {currentOrg && (
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group mb-1">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                       <Settings size={16} />
                     </div>
                     <div className="font-medium text-sm text-gray-700">{t('sidebar.manageOrganization')}</div>
                   </div>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       setIsManageOrgModalOpen(true);
                       setIsOrgDropdownOpen(false);
                     }}
                     className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                   >
                     {t('sidebar.settings')}
                   </button>
                </div>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreateOrgModalOpen(true);
                  setIsOrgDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50 shrink-0">
                  <Plus size={16} />
                </div>
                <span>{t('sidebar.createOrganization')}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Create Agent Button */}
      <div className="px-2 mb-1 shrink-0">
        <div 
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer text-sm group"
          onClick={() => navigate('/dashboard')}
        >
          <Bot size={16} />
          <span>{t('sidebar.dashboard')}</span>
          <span className="ml-auto text-[10px] font-medium text-gray-500 bg-gray-200 px-1.5 rounded border border-gray-300 group-hover:bg-white transition-colors">N</span>
        </div>
      </div>

      {/* Context Lake Button */}
      <div className="px-2 mb-1 shrink-0">
        <div 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${isActive('/context-lake') ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => navigate('/context-lake')}
        >
          <Database size={16} />
          <span>{t('sidebar.contextLake')}</span>
        </div>
      </div>

      {/* Skills Button */}
      <div className="px-2 mb-4 shrink-0">
        <div 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${isActive('/skills') ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => navigate('/skills')}
        >
          <LayoutGrid size={16} />
          <span>{t('sidebar.skills')}</span>
        </div>
      </div>

      {/* Projects */}
      <div className="px-4 py-2 shrink-0">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
          <span>{t('sidebar.projects')}</span>
          <Plus 
            size={12} 
            className="cursor-pointer hover:text-gray-700" 
            onClick={() => setIsCreateProjectModalOpen(true)}
          />
        </div>
        {filteredProjects.map((project) => (
          <div key={project.id} className="mb-1">
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${isActive(`/project/${project.id}`) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <Folder size={16} />
              <span className="truncate flex-1">{project.name}</span>
              <span className="ml-auto text-xs text-gray-400">{project.date}</span>
            </div>
            {/* Render tasks for this project */}
            {tasks.filter(t => t.project_id === project.id).map(task => (
              <div 
                key={task.id}
                className={`flex items-center justify-between px-2 py-1 ml-6 rounded-md cursor-pointer text-xs transition-colors group ${isActive(`/task/${task.id}`) ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <span className="truncate flex-1">{task.title}</span>
                <div className="flex items-center gap-1 shrink-0">
                   <span className="text-[10px] text-gray-400">{task.time || task.date}</span>
                   <LinkIcon size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* All Tasks List */}
      <div className="flex-grow overflow-y-auto px-2">
        <div className="flex items-center justify-between px-2 py-2 text-xs font-medium text-gray-500 sticky top-0 bg-[#F7F7F5] z-10">
          <span>
            {filterType === 'all' ? t('sidebar.allTasks') : 
             filterType === 'favorites' ? t('sidebar.favorites') : 
             t('sidebar.nonProjectTasks')}
          </span>
          <div className="relative">
            <SlidersHorizontal 
              size={12} 
              className="cursor-pointer hover:text-gray-700" 
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            />
            {isFilterDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsFilterDropdownOpen(false)} 
                />
                <div className="absolute right-0 top-5 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                  <div 
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs text-gray-700 flex items-center justify-between"
                    onClick={() => {
                      setFilterType('all');
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    <span>{t('sidebar.allTasks')}</span>
                    {filterType === 'all' && <Check size={12} />}
                  </div>
                  <div 
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs text-gray-700 flex items-center justify-between"
                    onClick={() => {
                      setFilterType('non-project');
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    <span>{t('sidebar.nonProjectTasks')}</span>
                    {filterType === 'non-project' && <Check size={12} />}
                  </div>
                  <div 
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs text-gray-700 flex items-center justify-between"
                    onClick={() => {
                      setFilterType('favorites');
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    <span>{t('sidebar.favorites')}</span>
                    {filterType === 'favorites' && <Check size={12} />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="space-y-0.5">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer group ${isActive(`/task/${task.id}`) ? 'bg-gray-200' : ''}`}
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <div className="flex items-start justify-between mb-0.5">
                <span className="text-sm text-gray-700 font-medium truncate pr-2 flex-1">{task.title}</span>
                
                {/* Icons Container */}
                <div className="shrink-0 mt-1 relative w-4 h-4 flex items-center justify-center">
                    {/* Favorite Star - Visible on hover or if favorited */}
                    <div 
                        className={`absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer z-10 ${favoriteTaskIds.has(task.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        onClick={(e) => toggleFavorite(task.id, e)}
                    >
                        <Star size={12} className={favoriteTaskIds.has(task.id) ? "text-yellow-500 fill-yellow-500" : "text-gray-400 hover:text-yellow-500"} />
                    </div>

                    {/* Original Icon - Hidden on hover if not favorited */}
                    <div className={`transition-opacity ${favoriteTaskIds.has(task.id) ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                        {task.project_id ? (
                            <LinkIcon size={12} className="text-gray-400" />
                        ) : task.icon === 'sun' ? (
                            <Sun size={12} className="text-orange-400" />
                        ) : (
                            <div className="text-gray-400">
                                <div className="w-3 h-1.5 border-2 border-gray-400 rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 truncate max-w-[180px]">{task.subtitle}</span>
                <span className="text-[10px] text-gray-400 shrink-0">{task.time || task.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 shrink-0 flex items-center justify-between relative">
        <div className="flex items-center gap-1">
          <button 
            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-md"
            onClick={() => navigate('/settings')}
            title={t('sidebar.settings')}
          >
            <Settings size={16} />
          </button>
          <button 
            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-md"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button 
            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-md"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
          >
            <Globe size={16} />
            <span className="sr-only">{language === 'en' ? 'ZH' : 'EN'}</span>
          </button>
        </div>
        
        <div 
          className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          {userInitials}
        </div>

        {/* User Menu Popup */}
        {isUserMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsUserMenuOpen(false)} 
            />
            <div className="absolute bottom-12 right-2 w-[240px] bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-gray-100 p-1 z-20 animate-in fade-in zoom-in-95 duration-100">
              {/* User Info */}
              <div className="flex items-center gap-3 p-2 border-b border-gray-100 mb-1">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0">
                  {userInitials}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">{userName}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email || ''}</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5">
                <button 
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    setIsAccountModalOpen(true);
                    setIsUserMenuOpen(false);
                  }}
                >
                  <Settings size={16} className="text-gray-500" />
                  <span>{t('sidebar.manageAccount')}</span>
                </button>
                
                <button 
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    navigate('/settings');
                    setIsUserMenuOpen(false);
                  }}
                >
                  <Settings size={16} className="text-gray-500" />
                  <span>{t('sidebar.settings')}</span>
                </button>

                <button 
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    navigate('/billing');
                    setIsUserMenuOpen(false);
                  }}
                >
                  <CreditCard size={16} className="text-gray-500" />
                  <span>{t('sidebar.billing')}</span>
                </button>

                <button 
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    // navigate('/community'); // Placeholder
                    setIsUserMenuOpen(false);
                  }}
                >
                  <Users size={16} className="text-gray-500" />
                  <span>{t('sidebar.community')}</span>
                </button>

                <div className="h-px bg-gray-100 my-1" />

                <button 
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="text-gray-500" />
                  <span>{t('sidebar.signOut')}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
