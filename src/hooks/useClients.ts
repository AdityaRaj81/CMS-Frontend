import { useState, useEffect, useCallback } from 'react'
import { clientsService } from '@/services/api'

export interface ClientData {
  id: string | number
  name: string
  email: string
  phone: string
  type: 'individual' | 'organization'
  address: string
  caseCount?: number
  createdDate?: Date
}

export const useClients = () => {
  const [clients, setClients] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await clientsService.getAll()
      const data = Array.isArray(response.data) ? response.data : response.data.data || []
      setClients(
        data.map((c: any) => ({
          id: c.id,
          name: c.name || c.fullName,
          email: c.email,
          phone: c.phone,
          type: c.type || 'individual',
          address: c.address || '',
          caseCount: c.caseCount || 0,
          createdDate: c.createdDate ? new Date(c.createdDate) : undefined,
        }))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clients')
      console.error('Error fetching clients:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return { clients, loading, error, refetch: fetchClients }
}
