import { create } from 'zustand';

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  challenges: Challenge[];
}

interface User {
  id: string | null;
  username: string | null;
  points: number;
  level: number;
  streak: number;
  isAuthenticated: boolean;
}

interface AppState {
  // User state
  user: User;
  login: (username: string, id: string) => void;
  logout: () => void;
  addPoints: (points: number) => void;
  
  // Modules and challenges
  modules: Module[];
  setModules: (modules: Module[]) => void;
  completeChallenge: (moduleId: string, challengeId: string) => void;
  
  // UI state
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const useStore = create<AppState>((set) => ({
  // Default user state
  user: {
    id: null,
    username: null,
    points: 0,
    level: 1,
    streak: 0,
    isAuthenticated: false,
  },
  
  login: (username, id) => set((state) => ({
    user: {
      ...state.user,
      id,
      username,
      isAuthenticated: true,
    }
  })),
  
  logout: () => set({
    user: {
      id: null,
      username: null,
      points: 0,
      level: 1,
      streak: 0,
      isAuthenticated: false,
    }
  }),
  
  addPoints: (points) => set((state) => {
    const newTotalPoints = state.user.points + points;
    // Simple level calculation - each level requires 100 points
    const newLevel = Math.floor(newTotalPoints / 100) + 1;
    
    return {
      user: {
        ...state.user,
        points: newTotalPoints,
        level: newLevel,
      }
    };
  }),
  
  // Modules and challenges
  modules: [],
  
  setModules: (modules) => set({ modules }),
  
  completeChallenge: (moduleId, challengeId) => set((state) => {
    const updatedModules = state.modules.map(module => {
      if (module.id === moduleId) {
        const updatedChallenges = module.challenges.map(challenge => {
          if (challenge.id === challengeId) {
            return { ...challenge, completed: true };
          }
          return challenge;
        });
        return { ...module, challenges: updatedChallenges };
      }
      return module;
    });
    
    return { modules: updatedModules };
  }),
  
  // UI state
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}));

export default useStore;