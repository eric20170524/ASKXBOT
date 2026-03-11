import { useParams, Link } from 'react-router-dom';
import { 
  Terminal, Folder, Search, Settings, Play, 
  ChevronRight, ChevronDown, FileCode, FileJson, 
  Menu, X, Send, Sparkles, LayoutPanelLeft, MonitorPlay
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Workspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('editor'); // editor, terminal, preview
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-gray-300 font-mono overflow-hidden no-invert">
      {/* IDE Header */}
      <header className="h-12 bg-[#252526] border-b border-[#333] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hover:bg-[#333] p-1.5 rounded-md transition-colors">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white">
              <div className="bg-blue-600 text-white p-0.5 rounded">
                <Terminal size={14} />
              </div>
              <span className="font-sans font-medium text-sm">rebyte</span>
            </div>
          </Link>
          <div className="h-4 w-[1px] bg-[#444]"></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-400 font-medium">{id}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">src</span>
            <span className="text-gray-500">/</span>
            <span className="text-white">App.tsx</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#333] rounded-md px-2 py-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-300">{t('workspace.connected')}</span>
          </div>
          <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Play size={12} fill="currentColor" />
            {t('workspace.run')}
          </button>
          <button className="p-1.5 hover:bg-[#333] rounded text-gray-400 hover:text-white">
            <Settings size={16} />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-sans text-xs font-medium ml-2">
            JD
          </div>
        </div>
      </header>

      {/* Main IDE Area */}
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar (File Explorer) */}
        {isSidebarOpen && (
          <div className="w-64 bg-[#252526] border-r border-[#333] flex flex-col shrink-0">
            <div className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between items-center">
              {t('workspace.explorer')}
              <button onClick={() => setIsSidebarOpen(false)} className="hover:text-white">
                <X size={14} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <div className="px-2 py-1">
                <div className="flex items-center gap-1 py-1 px-2 text-gray-300 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                  <ChevronDown size={14} />
                  <span className="text-sm font-bold">{id}</span>
                </div>
                <div className="pl-4">
                  <div className="flex items-center gap-1 py-1 px-2 text-gray-300 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                    <ChevronRight size={14} />
                    <Folder size={14} className="text-blue-400" />
                    <span className="text-sm">src</span>
                  </div>
                  <div className="pl-4">
                    <div className="flex items-center gap-2 py-1 px-2 bg-[#37373d] text-white cursor-pointer rounded-sm">
                      <FileCode size={14} className="text-yellow-400" />
                      <span className="text-sm">App.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-2 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                      <FileCode size={14} className="text-blue-400" />
                      <span className="text-sm">index.css</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-2 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                      <FileCode size={14} className="text-yellow-400" />
                      <span className="text-sm">main.tsx</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-2 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                    <FileJson size={14} className="text-yellow-400" />
                    <span className="text-sm">package.json</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-2 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer rounded-sm">
                    <FileJson size={14} className="text-blue-400" />
                    <span className="text-sm">tsconfig.json</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-grow flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex bg-[#252526] border-b border-[#333]">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-r border-[#333]"
              >
                <LayoutPanelLeft size={16} />
              </button>
            )}
            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white text-sm flex items-center gap-2 min-w-[120px]">
              <FileCode size={14} className="text-yellow-400" />
              App.tsx
              <X size={14} className="ml-auto text-gray-500 hover:text-white cursor-pointer" />
            </div>
            <div className="px-4 py-2 text-gray-500 text-sm flex items-center gap-2 hover:bg-[#2d2d2d] cursor-pointer min-w-[120px] border-r border-[#333]">
              <FileJson size={14} className="text-yellow-400" />
              package.json
            </div>
          </div>

          {/* Code Content (Mock) */}
          <div className="flex-grow p-4 font-mono text-sm overflow-auto">
            <div className="text-gray-400 select-none float-left mr-4 text-right">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13
            </div>
            <div className="text-gray-300 whitespace-pre">
              <span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ useState }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;<br/>
              <span className="text-purple-400">import</span> <span className="text-yellow-300">reactLogo</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./assets/react.svg'</span>;<br/>
              <span className="text-purple-400">import</span> <span className="text-green-400">'./App.css'</span>;<br/>
              <br/>
              <span className="text-blue-400">function</span> <span className="text-yellow-300">App</span>() {`{`}<br/>
              &nbsp;&nbsp;<span className="text-blue-400">const</span> [<span className="text-blue-300">count</span>, <span className="text-blue-300">setCount</span>] = <span className="text-yellow-300">useState</span>(<span className="text-orange-400">0</span>);<br/>
              <br/>
              &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">div</span> <span className="text-blue-300">className</span>=<span className="text-green-400">"App"</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">h1</span>&gt;Vite + React&lt;/<span className="text-blue-300">h1</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">div</span> <span className="text-blue-300">className</span>=<span className="text-green-400">"card"</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">button</span> <span className="text-blue-300">onClick</span>={'{'}() =&gt; <span className="text-yellow-300">setCount</span>((<span className="text-blue-300">count</span>) =&gt; <span className="text-blue-300">count</span> + <span className="text-orange-400">1</span>){'}'}&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count is {'{'}<span className="text-blue-300">count</span>{'}'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">button</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">div</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">div</span>&gt;<br/>
              &nbsp;&nbsp;);<br/>
              {`}`}
            </div>
          </div>
        </div>

        {/* Right Panel (Agent Chat / Terminal) */}
        <div className="w-96 bg-[#1e1e1e] border-l border-[#333] flex flex-col shrink-0">
          <div className="flex border-b border-[#333]">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white border-b-2 border-blue-500 bg-[#252526]">
              {t('workspace.agentChat')}
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-[#252526]">
              {t('workspace.terminal')}
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="bg-[#252526] rounded-lg p-3 text-sm text-gray-300 border border-[#333]">
                  <p>Hello! I'm Claude. I've set up your React environment.</p>
                  <p className="mt-2">I can help you write code, debug issues, or explain concepts. What would you like to build today?</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-xs font-bold text-white">
                  JD
                </div>
                <div className="bg-[#2b3245] rounded-lg p-3 text-sm text-gray-200 border border-blue-900/30">
                  <p>Can you add a button that changes the background color randomly?</p>
                </div>
              </div>

              {/* AI Thinking/Typing */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="bg-[#252526] rounded-lg p-3 text-sm text-gray-300 border border-[#333]">
                  <p className="mb-2">Sure! I'll modify <code className="bg-[#1e1e1e] px-1 rounded text-yellow-400">App.tsx</code> to add a random color generator function.</p>
                  <div className="bg-[#1e1e1e] p-2 rounded border border-[#333] font-mono text-xs">
                    <div className="text-green-400 flex items-center gap-2">
                      <Terminal size={10} />
                      <span>Writing to src/App.tsx...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#333] bg-[#252526]">
              <div className="relative">
                <textarea 
                  className="w-full bg-[#1e1e1e] border border-[#444] rounded-lg pl-3 pr-10 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 resize-none h-20"
                  placeholder={t('workspace.askPlaceholder')}
                ></textarea>
                <button className="absolute bottom-2 right-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MonitorPlay size={12} />
            <span>{t('workspace.remote')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <span>main*</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>{t('workspace.ln')} 12, {t('workspace.col')} 34</span>
          <span>UTF-8</span>
          <span>TypeScript React</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span>Prettier</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
