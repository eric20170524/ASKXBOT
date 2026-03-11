import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useRef, useEffect } from 'react';
import { PanelLeftOpen, PanelLeftClose, Search, ChevronLeft, ChevronRight, Clock, Gift, Bell, X, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import api from '../services/api';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const inviteRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const token = useStore((state) => state.token);
  const setUser = useStore((state) => state.setUser);
  const setOrganizations = useStore((state) => state.setOrganizations);
  const setCurrentOrganization = useStore((state) => state.setCurrentOrganization);
  const currentOrganization = useStore((state) => state.currentOrganization);

  const isWorkspace = location.pathname.startsWith('/workspace');
  const isTaskPage = location.pathname.startsWith('/task/');
  const isProjectPage = location.pathname.startsWith('/project/');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchInitialData = async () => {
      try {
        // Fetch user profile
        const profileRes = await api.get('/account/profile');
        setUser(profileRes.data);

        // Fetch organizations
        const orgsRes = await api.get('/organizations/');
        setOrganizations(orgsRes.data);
        
        if (orgsRes.data.length > 0 && !currentOrganization) {
          setCurrentOrganization(orgsRes.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, [token, navigate, setUser, setOrganizations, setCurrentOrganization, currentOrganization]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inviteRef.current && !inviteRef.current.contains(event.target as Node)) {
        setIsInviteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isWorkspace) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-[#FDFDFC] overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-grow flex flex-col h-full relative">
        {/* Top Navigation Bar (Minimal) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <PanelLeftOpen size={20} />
            </button>
          )}
          {isSidebarOpen && (
             <button 
             onClick={() => setIsSidebarOpen(false)}
             className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors md:hidden"
           >
             <PanelLeftClose size={20} />
           </button>
          )}
        </div>

        {/* Top Right Actions */}
        {!isTaskPage && !isProjectPage && (
        <div className="absolute top-4 right-6 z-20 flex items-center gap-4 text-gray-500">
           {/* Search Bar (Hidden on mobile, visible on desktop if needed, or just icon) */}
           <div className="hidden md:flex items-center gap-1 text-xs text-gray-400 bg-transparent px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
             <Search size={14} />
             <span>⌘K</span>
           </div>
           
           <div className="flex items-center gap-1 text-xs text-gray-400 bg-transparent px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
              <ChevronLeft size={14} />
           </div>

           <div className="h-4 w-[1px] bg-gray-200"></div>

           <div className="flex items-center gap-3 relative">
             {/* Invite Friends */}
             <div className="relative" ref={inviteRef}>
               <button 
                 onClick={() => setIsInviteOpen(!isInviteOpen)}
                 className={`flex items-center gap-1 cursor-pointer hover:text-gray-800 transition-colors ${isInviteOpen ? 'text-gray-800' : ''}`}
                 title={t('layout.inviteFriends')}
               >
                 <Gift size={20} />
               </button>

               {/* Popover */}
               {isInviteOpen && (
                 <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="font-semibold text-gray-900">{t('layout.inviteFriends')}</h3>
                     <button onClick={() => setIsInviteOpen(false)} className="text-gray-400 hover:text-gray-600">
                       <X size={16} />
                     </button>
                   </div>
                   <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                     {t('layout.inviteDesc')}
                   </p>
                   <button 
                     className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors active:scale-95 transform"
                     onClick={() => {
                       navigator.clipboard.writeText('https://askxbot.com/ref/wy123');
                       setIsInviteOpen(false);
                     }}
                   >
                     <Copy size={16} />
                     {t('layout.copyLink')}
                   </button>
                 </div>
               )}
             </div>

             {/* Credits */}
             <button 
               onClick={() => navigate('/settings/credits')}
               className="flex items-center gap-1.5 cursor-pointer hover:text-gray-800 transition-colors px-1 py-0.5 rounded hover:bg-gray-50"
               title={t('layout.credits')}
             >
               <Clock size={18} />
               <span className="text-xs font-medium">17</span>
             </button>

             {/* Notifications */}
             <button 
               onClick={() => navigate('/settings/notifications')}
               className="relative cursor-pointer hover:text-gray-800 transition-colors p-1 rounded hover:bg-gray-50"
               title={t('sidebar.notifications')}
             >
               <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0.5 right-0.5 border border-white"></div>
               <Bell size={20} />
             </button>
           </div>
        </div>
        )}

        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
