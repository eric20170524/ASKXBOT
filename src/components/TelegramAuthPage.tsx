import { useState } from 'react';
import { Send } from 'lucide-react';

export default function TelegramAuthPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-[#2AABEE] rounded-full flex items-center justify-center mb-6 shadow-md">
          <Send size={40} className="text-white ml-[-4px] mt-[4px]" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect to Telegram</h1>
        <p className="text-gray-600 mb-8">
          You are about to connect your Telegram account to your agent computer.
        </p>

        <div className="w-full space-y-4">
          <button className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Send size={18} />
            Open Telegram App
          </button>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
