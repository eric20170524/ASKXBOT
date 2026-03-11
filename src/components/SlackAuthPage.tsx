import { useState } from 'react';
import { Slack } from 'lucide-react';

export default function SlackAuthPage() {
  const [workspace, setWorkspace] = useState('');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8">
          <Slack size={32} className="text-[#E01E5A]" />
          <span className="text-3xl font-bold text-black tracking-tight">slack</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">登录你的工作区</h1>
        <p className="text-gray-600 mb-8">输入工作区的 Slack 网址</p>

        <div className="w-full">
          <div className="relative flex items-center mb-6">
            <input
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              placeholder="你的工作区"
              className="w-full pl-4 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <span className="absolute right-4 text-gray-500 text-lg">.slack.com</span>
          </div>

          <button className="w-full bg-[#4A154B] hover:bg-[#361036] text-white font-bold py-3 px-4 rounded-lg transition-colors mb-8">
            继续
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-2 text-center">
          <p>不知道你的工作区网址？ <a href="#" className="text-blue-600 hover:underline">查找你的工作区</a></p>
          <p>尝试登录到 <a href="#" className="text-blue-600 hover:underline">GovSlack 工作区</a>？</p>
          <p>想要转为创建工作区？ <a href="#" className="text-blue-600 hover:underline">创建一个新的工作区</a></p>
        </div>
      </div>

      <div className="fixed bottom-8 text-sm text-gray-500 flex items-center gap-4">
        <a href="#" className="hover:underline">隐私和条款</a>
        <a href="#" className="hover:underline">联系我们</a>
        <button className="flex items-center gap-1 hover:underline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          更改地区 ⌄
        </button>
      </div>
    </div>
  );
}
