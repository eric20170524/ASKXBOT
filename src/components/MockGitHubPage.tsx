import React from 'react';
import { Github, Search } from 'lucide-react';

export default function MockGitHubPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#24292f] text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Github size={32} />
          <div className="hidden md:flex items-center gap-4 text-sm font-semibold">
            <a href="#" className="hover:text-gray-300">Product</a>
            <a href="#" className="hover:text-gray-300">Solutions</a>
            <a href="#" className="hover:text-gray-300">Open Source</a>
            <a href="#" className="hover:text-gray-300">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search or jump to..." 
              className="bg-transparent border border-gray-500 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:bg-white focus:text-black transition-colors"
            />
            <div className="absolute right-2 top-1.5 text-gray-400 text-xs border border-gray-500 rounded px-1">/</div>
          </div>
          <a href="#" className="text-sm hover:text-gray-300">Sign in</a>
          <a href="#" className="text-sm border border-gray-500 rounded-md px-3 py-1 hover:border-gray-300">Sign up</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-[#f6f8fa] py-20 relative overflow-hidden">
        {/* Desert Background Mock */}
        <div className="absolute inset-0 bg-[#e4d5b7] z-0" style={{ height: '400px' }}>
          <div className="absolute bottom-0 w-full h-32 bg-[#d1bfae]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-[120px] font-bold text-white leading-none drop-shadow-md tracking-tighter mb-4">404</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 inline-block transform -rotate-2">
            <p className="text-2xl font-bold text-gray-800">This is not the<br/>web page you<br/>are looking for.</p>
          </div>
          
          {/* Mock Octocat */}
          <div className="w-64 h-64 bg-[#24292f] rounded-full flex items-center justify-center text-white mb-12 relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#24292f] rounded-full"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#24292f] rounded-full"></div>
            <span className="text-2xl font-bold">Octocat</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl px-6 mt-12">
          <p className="text-center text-gray-600 mb-4">Find code, projects, and people on GitHub:</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-gray-100 border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
              Search
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Contact Support — GitHub Status — @githubstatus
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="flex items-center gap-2 text-gray-500">
            <Github size={24} />
            <span className="text-sm">© 2026 GitHub, Inc.</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-blue-600">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Security</a>
            <a href="#" className="hover:underline">Status</a>
            <a href="#" className="hover:underline">Docs</a>
            <a href="#" className="hover:underline">Contact GitHub</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Training</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
