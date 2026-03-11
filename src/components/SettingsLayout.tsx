import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Github, DollarSign, Database, Bell, Code, Shield, MessageSquare, Key, Server, Layout, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsLayout() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const sidebarItems = [
    {
      category: t('sidebar.account'),
      items: [
        { name: t('sidebar.account'), path: '/settings/account', icon: User },
        { name: t('sidebar.memory'), path: '/settings/memory', icon: Brain }
      ]
    },
    {
      category: t('sidebar.manageOrganization'),
      items: [
        { name: t('sidebar.codeProxy'), path: '/settings/code-proxy', icon: Code },
        { name: t('sidebar.github'), path: '/settings/github', icon: Github },
        { name: t('sidebar.proxySecurity'), path: '/settings/proxy-security', icon: Shield },
        { name: t('sidebar.accessChannels'), path: '/settings/access-channels', icon: MessageSquare },
        { name: t('sidebar.apiKeys'), path: '/settings/api-keys', icon: Key },
        { name: t('sidebar.mcpServers'), path: '/settings/mcp-servers', icon: Server },
        { name: t('sidebar.plans'), path: '/settings/plans', icon: Layout },
        { name: t('sidebar.contextLake'), path: '/settings/context-lake', icon: Database }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F9F9F8]">
      {/* Settings Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-[#F7F7F5] flex flex-col">
        <div className="p-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            {t('common.cancel')}
          </button>

          <div className="space-y-6">
            {sidebarItems.map((section, idx) => (
              <div key={idx}>
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.category}
                </h3>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-gray-200 text-gray-900 font-medium'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`
                      }
                    >
                      <item.icon size={16} />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
