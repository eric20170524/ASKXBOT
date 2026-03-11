import { AlertCircle } from 'lucide-react';

export default function TerminalView() {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-xs p-4 overflow-y-auto">
      <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-2 rounded mb-4 border border-red-900/30">
        <AlertCircle size={14} />
        <span>[Not Implemented] HTTP 404 - Reconnecting...</span>
      </div>
      <div className="space-y-1 opacity-80">
        <p className="text-yellow-500">Connection failed: [Not Implemented] HTTP 404</p>
        <p>Retrying connection (Attempt 1/5)...</p>
        <p className="text-yellow-500">Connection failed: [Not Implemented] HTTP 404</p>
        <p>Retrying connection (Attempt 2/5)...</p>
        <p className="text-yellow-500">Connection failed: [Not Implemented] HTTP 404</p>
        <p>Retrying connection (Attempt 3/5)...</p>
        <p className="text-yellow-500">Connection failed: [Not Implemented] HTTP 404</p>
        <p>Retrying connection (Attempt 4/5)...</p>
        <p className="text-yellow-500">Connection failed: [Not Implemented] HTTP 404</p>
        <p>Retrying connection (Attempt 5/5)...</p>
      </div>
    </div>
  );
}
