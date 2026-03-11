import React from 'react';
import { Github, Copy } from 'lucide-react';

export default function MockSkillsShPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[10px] border-b-black border-r-[6px] border-r-transparent"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">Skills</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Audits</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Install vercel-labs/web-design-guidelines
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-12">
            <Github size={16} />
            <span className="text-sm">GitHub</span>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
            <p className="text-gray-400 text-sm mb-4">Add it to your project with a single command</p>
            
            <div className="bg-black border border-gray-800 rounded-lg p-4 flex items-center justify-between group">
              <code className="text-gray-300 font-mono text-sm">
                <span className="text-gray-500 mr-2">$</span>
                npx skills add vercel-labs/web-design-guidelines
              </code>
              <button className="text-gray-500 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800 opacity-0 group-hover:opacity-100">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
