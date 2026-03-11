import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, Search, Plus, X } from 'lucide-react';

interface Memory {
  id: string;
  key: string;
  value: string;
  timestamp: string;
}

export default function SettingsMemory() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [newMemoryKey, setNewMemoryKey] = useState('');
  const [newMemoryValue, setNewMemoryValue] = useState('');
  const [memories, setMemories] = useState<Memory[]>([]);

  const handleSaveMemory = () => {
    if (!newMemoryKey.trim() || !newMemoryValue.trim()) return;
    
    const newMemory: Memory = {
      id: Date.now().toString(),
      key: newMemoryKey,
      value: newMemoryValue,
      timestamp: 'Just now'
    };
    
    setMemories([newMemory, ...memories]);
    setIsAddingMemory(false);
    setNewMemoryKey('');
    setNewMemoryValue('');
  };

  const filteredMemories = memories.filter(m => 
    m.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="max-w-4xl mx-auto py-12 px-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.memory')}</h1>
          <button 
            onClick={() => setIsAddingMemory(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            {t('settings.memory.addMemory')}
          </button>
        </div>
        <p className="text-gray-500 mb-8">{t('settings.memory.description')}</p>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t('settings.memory.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        {memories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Brain size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">{t('settings.memory.emptyState')}</p>
            <button 
              onClick={() => setIsAddingMemory(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Plus size={16} />
              {t('settings.memory.addFirstMemory')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMemories.map(memory => (
              <div key={memory.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                  <Brain size={20} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{memory.key}</span>
                    <span className="text-xs text-gray-400">{memory.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{memory.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Memory Modal */}
      {isAddingMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">{t('settings.memory.addMemory')}</h2>
              <button 
                onClick={() => setIsAddingMemory(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">{t('settings.memory.addMemoryDesc')}</p>

            <div className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder={t('settings.memory.keyPlaceholder')}
                  value={newMemoryKey}
                  onChange={(e) => setNewMemoryKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
              <div>
                <textarea
                  placeholder={t('settings.memory.valuePlaceholder')}
                  value={newMemoryValue}
                  onChange={(e) => setNewMemoryValue(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsAddingMemory(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={handleSaveMemory}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
