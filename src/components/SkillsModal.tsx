import { useState, useEffect } from 'react';
import { X, Search, Github, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Skill {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  downloads: string;
  updated: string;
  featured?: boolean;
}

const MOCK_SKILLS: Skill[] = [
  {
    id: 'web-design-guidelines',
    title: 'web-design-guidelines',
    author: 'vercel-labs',
    description: 'Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design"...',
    tags: ['Featured', 'Design'],
    downloads: '92k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'frontend-design',
    title: 'frontend-design',
    author: 'anthropics',
    description: 'Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web...',
    tags: ['Featured', 'Design'],
    downloads: '62k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'skill-creator',
    title: 'skill-creator',
    author: 'anthropics',
    description: 'Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that...',
    tags: ['Featured', 'Development'],
    downloads: '31k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'pdf',
    title: 'pdf',
    author: 'anthropics',
    description: 'Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs,...',
    tags: ['Featured', 'Documents'],
    downloads: '13k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'pptx',
    title: 'pptx',
    author: 'anthropics',
    description: 'Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, o...',
    tags: ['Featured', 'Documents'],
    downloads: '11k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'docx',
    title: 'docx',
    author: 'anthropics',
    description: 'Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any...',
    tags: ['Featured', 'Documents'],
    downloads: '10k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'xlsx',
    title: 'xlsx',
    author: 'anthropics',
    description: 'Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read,...',
    tags: ['Featured', 'Documents'],
    downloads: '10k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'webapp-testing',
    title: 'webapp-testing',
    author: 'anthropics',
    description: 'Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging ...',
    tags: ['Featured', 'Development'],
    downloads: '9k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'mcp-builder',
    title: 'mcp-builder',
    author: 'anthropics',
    description: 'Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services throug...',
    tags: ['Featured', 'Development'],
    downloads: '8k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'canvas-design',
    title: 'canvas-design',
    author: 'anthropics',
    description: 'Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create...',
    tags: ['Featured', 'Design'],
    downloads: '7k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'doc-coauthoring',
    title: 'doc-coauthoring',
    author: 'anthropics',
    description: 'Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation,...',
    tags: ['Featured', 'Documents'],
    downloads: '6k',
    updated: 'updated 2w ago',
    featured: true
  },
  {
    id: 'tailwind-design-system',
    title: 'tailwind-design-system',
    author: 'wshobson',
    description: 'Build scalable design systems with Tailwind CSS v4, design tokens, component libraries, and responsive patterns. Use when creating...',
    tags: ['Featured', 'Development'],
    downloads: '6k',
    updated: 'updated 2w ago',
    featured: true
  },
];

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (skills: Skill[]) => void;
  onCreateWithAgent?: () => void;
  initialSelectedSkills?: Skill[];
}

export default function SkillsModal({ isOpen, onClose, onSelect, onCreateWithAgent, initialSelectedSkills = [] }: SkillsModalProps) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initialSelectedSkills);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedSkills(initialSelectedSkills);
      setSearchQuery('');
    }
  }, [isOpen, initialSelectedSkills]);

  const toggleSkill = (skill: Skill) => {
    if (selectedSkills.find(s => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredSkills = MOCK_SKILLS.filter(skill => 
    skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-[90vw] h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Agent Skills</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Search and Actions */}
            <div className="p-6 pb-0">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all"
                />
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Create Team Skills</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Team skills are private skills shared across your organization. Link a GitHub repo containing a SKILL.md file to give your entire team access to custom AI capabilities.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={onCreateWithAgent}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Sparkles size={16} />
                    Create with Agent
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Github size={16} />
                    Import from GitHub
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-medium text-gray-500 mb-4">Popular Skills</h3>
            </div>

            {/* Skills Grid */}
            <div className="flex-1 overflow-y-auto px-6 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkills.some(s => s.id === skill.id);
                  return (
                    <div 
                      key={skill.id}
                      onClick={() => toggleSkill(skill)}
                      className={`
                        relative p-4 rounded-xl border cursor-pointer transition-all group flex flex-col h-full
                        ${isSelected 
                          ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`
                          w-5 h-5 rounded border flex items-center justify-center transition-colors
                          ${isSelected ? 'bg-black border-black' : 'border-gray-300 bg-white'}
                        `}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-1 truncate">{skill.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">by {skill.author}</p>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 h-[60px]">
                        {skill.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {skill.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium border border-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-auto">
                        <span className="flex items-center gap-1">
                           ⬇ {skill.downloads}
                        </span>
                        <span>{skill.updated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex items-center justify-between z-10">
              <div className="text-sm text-gray-500">
                {selectedSkills.length > 0 ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected` : 'No skills selected'}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onSelect(selectedSkills)}
                  className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm"
                >
                  Select {selectedSkills.length > 0 && `(${selectedSkills.length})`}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
