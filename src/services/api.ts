import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token')
      document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Strict'
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient

// Auth Service
export const authService = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('auth_token')
    document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Strict'
    return Promise.resolve()
  },
  getCurrentUser: () => apiClient.get('/auth/me'),
}

// Cases Service
export const casesService = {
  getAll: (params?: any) => apiClient.get('/cases', { params }),
  getById: (id: string) => apiClient.get(`/cases/${id}`),
  create: (data: any) => apiClient.post('/cases', data),
  update: (id: string, data: any) => apiClient.put(`/cases/${id}`, data),
  delete: (id: string) => apiClient.delete(`/cases/${id}`),
}

// Documents Service
export const documentsService = {
  getAll: (params?: any) => apiClient.get('/documents', { params }),
  getById: (id: string) => apiClient.get(`/documents/${id}`),
  upload: (data: FormData) =>
    apiClient.post('/documents/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => apiClient.delete(`/documents/${id}`),
}

// Hearings Service
export const hearingsService = {
  getAll: (params?: any) => apiClient.get('/hearings', { params }),
  getById: (id: string) => apiClient.get(`/hearings/${id}`),
  create: (data: any) => apiClient.post('/hearings', data),
  update: (id: string, data: any) => apiClient.put(`/hearings/${id}`, data),
  delete: (id: string) => apiClient.delete(`/hearings/${id}`),
}

// Clients Service
export const clientsService = {
  getAll: (params?: any) => apiClient.get('/clients', { params }),
  getById: (id: string) => apiClient.get(`/clients/${id}`),
  create: (data: any) => apiClient.post('/clients', data),
  update: (id: string, data: any) => apiClient.put(`/clients/${id}`, data),
  delete: (id: string) => apiClient.delete(`/clients/${id}`),
}

// Users Service (Admin)
export const usersService = {
  getAll: (params?: any) => apiClient.get('/users', { params }),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: any) => apiClient.post('/users', data),
  update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  updateProfile: (data: any) => apiClient.put('/users/me', data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
  updatePassword: (id: string, data: any) => apiClient.put(`/users/${id}/password`, data),
}
