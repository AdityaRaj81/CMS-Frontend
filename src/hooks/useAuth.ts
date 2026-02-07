import { useAuthStore } from '@/store/auth'
import { UserRole } from '@/types'

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, hasRole } = useAuthStore()

  const isAdmin = () => hasRole(UserRole.ADMIN)
  const isAdvocate = () => hasRole(UserRole.ADVOCATE)
  const isClient = () => hasRole(UserRole.CLIENT)
  const isAssociate = () => hasRole(UserRole.ASSOCIATE)

  return {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin,
    isAdvocate,
    isClient,
    isAssociate,
  }
}
