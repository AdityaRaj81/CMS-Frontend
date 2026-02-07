import { create } from 'zustand'
import { User, UserRole } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  setUser: (user: User | null) => void
  hasRole: (role: UserRole | UserRole[]) => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: (user: User) => {
    set({ user, isAuthenticated: true, isLoading: false })
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user })
  },

  hasRole: (role: UserRole | UserRole[]) => {
    const state = get()
    if (!state.user) return false

    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(state.user.role)
  },
}))
