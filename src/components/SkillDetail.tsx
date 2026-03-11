import { ArrowLeft, Github, ExternalLink, Play } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { SKILL_DETAILS } from '../data/mockData';

export default function SkillDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const skill = (id && SKILL_DETAILS[id]) ? SKILL_DETAILS[id] : {
    title: id || 'Unknown Skill',
    description: 'Skill description not found.',
    tags: ['Skill'],
    author: 'Unknown',
    readme: '# No README available'
  };

  const handleUseSkill = () => {
    // Navigate back to dashboard with the selected skill
    navigate('/dashboard', { state: { selectedSkill: skill } });
  };

  return (
    <div className="min-h-full bg-[#FDFDFC] px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/skills')}
          className="flex items-center text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to skills
        </button>

        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">{skill.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl">
            {skill.description}
          </p>
          
          <div className="flex items-center gap-2 mb-6">
            {skill.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
              {skill.author.substring(0, 1).toUpperCase()}
            </div>
            <span>{skill.author}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleUseSkill}
              className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Play size={16} fill="white" />
              Use
            </button>
            <button 
              onClick={() => window.open('/mock-github', '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Github size={16} />
              GitHub
            </button>
            <button 
              onClick={() => window.open('/mock-skills-sh', '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={16} />
              skills.sh
            </button>
          </div>
        </div>

        {/* Readme Section */}
        <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">SKILL.md</div>
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="prose prose-sm max-w-none text-gray-600">
            {/* Simple markdown rendering for demo purposes */}
            {skill.readme.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">{line.replace('# ', '')}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gray-900 mb-3 mt-6">{line.replace('## ', '')}</h2>;
              if (line.startsWith('1. ')) return <div key={i} className="ml-4 mb-1 list-decimal">{line}</div>;
              if (line.startsWith('2. ')) return <div key={i} className="ml-4 mb-1 list-decimal">{line}</div>;
              if (line.startsWith('3. ')) return <div key={i} className="ml-4 mb-1 list-decimal">{line}</div>;
              if (line.startsWith('4. ')) return <div key={i} className="ml-4 mb-1 list-decimal">{line}</div>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="mb-2">{line}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
