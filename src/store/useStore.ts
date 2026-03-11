import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Organization {
  id: number;
  name: string;
  description: string;
  role: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  organizations: Organization[];
  currentOrganization: Organization | null;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setOrganizations: (orgs: Organization[]) => void;
  setCurrentOrganization: (org: Organization | null) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      organizations: [],
      currentOrganization: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setOrganizations: (organizations) => set({ organizations }),
      setCurrentOrganization: (currentOrganization) => set({ currentOrganization }),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, organizations: [], currentOrganization: null });
      },
    }),
    {
      name: 'nanomate-storage',
    }
  )
);
