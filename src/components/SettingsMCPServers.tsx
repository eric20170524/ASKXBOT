import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsMCPServers() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('settings.mcpServers.filters.all') },
    { id: 'api', label: t('settings.mcpServers.filters.api') },
    { id: 'database', label: t('settings.mcpServers.filters.database') },
    { id: 'finance', label: t('settings.mcpServers.filters.finance') },
    { id: 'points', label: t('settings.mcpServers.filters.points') },
    { id: 'monitoring', label: t('settings.mcpServers.filters.monitoring') },
    { id: 'other', label: t('settings.mcpServers.filters.other') },
    { id: 'productivity', label: t('settings.mcpServers.filters.productivity') },
  ];

  const mcpServers = [
    {
      id: 'cloudflare',
      name: 'Cloudflare AI Gateway',
      icon: '☁️', // Using emoji for now, can replace with actual icons or images
      tags: ['SSE', 'OAuth'],
      description: 'Search your logs, get prompts and replies detailed info',
      category: 'other'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      tags: ['HTTP', 'Human in Loop'],
      description: 'GitHub API access repositories, issues and pull requests',
      category: 'productivity'
    },
    {
      id: 'neon',
      name: 'Neon',
      icon: 'N',
      tags: ['HTTP', 'OAuth'],
      description: 'List, create and delete Neon Postgres projects and branches; execute SQL queries, check schema',
      category: 'database'
    },
    {
      id: 'prisma',
      name: 'Prisma',
      icon: '▲',
      tags: ['HTTP', 'OAuth'],
      description: 'Manage Prisma Postgres database; create, list and restore backups; generate and revoke connection strings; execute SQL queries',
      category: 'database'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'P',
      tags: ['HTTP', 'OAuth'],
      description: 'Manage PayPal merchant operations; disputes; send invoices; create orders, capture and refund; list transactions',
      category: 'finance'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: 'S',
      tags: ['SSE', 'Human in Loop'],
      description: 'Create and manage customers, products, prices, subscriptions, invoices, coupons, payments in Stripe; refunds',
      category: 'finance'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: 'Z',
      tags: ['HTTP', 'Human in Loop'],
      description: 'Trigger Zapier tasks in 8,000+ apps: send Slack messages, update spreadsheets, create calendar events, tasks etc',
      category: 'productivity'
    },
    {
      id: 'sentry',
      name: 'Sentry',
      icon: 'S',
      tags: ['HTTP', 'OAuth'],
      description: 'Retrieve detailed Sentry release and full stack trace. Search and filter issues, update issue status, assign, tag, bookmark and remind',
      category: 'monitoring'
    },
    {
      id: 'browserbase',
      name: 'Browserbase',
      icon: 'B',
      tags: ['HTTP', 'No Auth'],
      description: 'https://docs.browserbase.com/inte...',
      category: 'other'
    },
    {
      id: 'circleci',
      name: 'CircleCI',
      icon: 'C',
      tags: ['STDIO', 'No Auth'],
      description: 'Get detailed build failure logs, identify unstable tests, and get CircleCI project status...',
      category: 'productivity'
    },
    {
      id: 'context7',
      name: 'Context7',
      icon: 'C',
      tags: ['HTTP', 'API Key'],
      description: 'Context7 provides latest library documentation and code examples',
      category: 'other'
    },
    {
      id: 'deepwiki',
      name: 'DeepWiki',
      icon: 'D',
      tags: ['HTTP', 'No Auth'],
      description: 'Architecture, docs, resource links etc, suitable for all your repositories',
      category: 'other'
    }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settings.mcpServers.title')}</h1>
        <p className="text-gray-500">{t('settings.mcpServers.description')}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('settings.mcpServers.installed')}</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500">{t('settings.mcpServers.noInstalled')}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('settings.mcpServers.available')}</h2>
        
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('settings.mcpServers.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mcpServers.map((server) => (
            <div 
              key={server.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer group relative"
              onClick={() => navigate(`/settings/mcp-servers/${server.id}`)}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={16} className="text-gray-400" />
              </div>
              
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                  {server.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{server.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {server.tags.map((tag, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 line-clamp-3">
                {server.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
