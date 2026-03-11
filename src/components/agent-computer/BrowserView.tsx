import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

export default function BrowserView() {
  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      <div className="h-8 bg-white border-b border-gray-200 flex items-center px-2 gap-2 shrink-0">
        <div className="flex items-center gap-1 text-gray-400">
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
          <RotateCw size={12} />
        </div>
        <div className="flex-1 bg-gray-100 rounded px-2 py-0.5 text-xs text-gray-500 truncate">
          chrome://newtab
        </div>
      </div>
      <div className="flex-1 bg-[#333] flex flex-col items-center justify-center text-white p-8 overflow-y-auto">
        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl font-bold">oo</span>
        </div>
        <h3 className="text-xl font-medium mb-4">You've gone Incognito</h3>
        <div className="text-sm text-gray-400 max-w-md space-y-4">
          <p>Others who use this device won't see your activity, so you can browse more privately.</p>
          <div className="flex gap-8 text-xs">
             <ul className="list-disc pl-4 space-y-1">
               <li>Chrome won't save:</li>
               <li>Your browsing history</li>
               <li>Cookies and site data</li>
               <li>Information entered in forms</li>
             </ul>
             <ul className="list-disc pl-4 space-y-1">
               <li>Your activity might still be visible to:</li>
               <li>Websites you visit</li>
               <li>Your employer or school</li>
               <li>Your internet service provider</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
