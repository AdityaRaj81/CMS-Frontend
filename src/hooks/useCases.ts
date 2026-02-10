import { useState, useEffect, useCallback } from 'react'
import { casesService } from '@/services/api'

export interface CaseData {
  id: string | number
  caseNumber: string
  caseTitle: string
  petitioner?: string
  petitionerName?: string
  respondent?: string
  respondentName?: string
  court: string
  courtName?: string
  category?: string
  caseType?: string
  status: string
  nextHearing?: Date
  nextHearingDate?: Date
}

export const useCases = () => {
  const [cases, setCases] = useState<CaseData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCases = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await casesService.getAll()
      const data = Array.isArray(response.data) ? response.data : response.data.data || []
      setCases(
        data.map((c: any) => ({
          id: c.id,
          caseNumber: c.caseNumber,
          caseTitle: c.caseTitle,
          petitioner: c.petitionerName || c.petitioner,
          petitionerName: c.petitionerName,
          respondent: c.respondentName || c.respondent,
          respondentName: c.respondentName,
          court: c.courtName || c.court,
          courtName: c.courtName,
          category: c.caseType,
          caseType: c.caseType,
          status: c.status,
          nextHearing: c.nextHearingDate ? new Date(c.nextHearingDate) : undefined,
          nextHearingDate: c.nextHearingDate ? new Date(c.nextHearingDate) : undefined,
        }))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cases')
      console.error('Error fetching cases:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  return { cases, loading, error, refetch: fetchCases }
}

export const useMyCases = () => {
  const [cases, setCases] = useState<CaseData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMyCases = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await casesService.getAll({ my: true })
      const data = Array.isArray(response.data) ? response.data : response.data.data || []
      setCases(
        data.map((c: any) => ({
          id: c.id,
          caseNumber: c.caseNumber,
          caseTitle: c.caseTitle,
          petitioner: c.petitionerName,
          petitionerName: c.petitionerName,
          respondent: c.respondentName,
          respondentName: c.respondentName,
          court: c.courtName,
          courtName: c.courtName,
          category: c.caseType,
          caseType: c.caseType,
          status: c.status,
          nextHearing: c.nextHearingDate ? new Date(c.nextHearingDate) : undefined,
          nextHearingDate: c.nextHearingDate ? new Date(c.nextHearingDate) : undefined,
        }))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your cases')
      console.error('Error fetching my cases:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMyCases()
  }, [fetchMyCases])

  return { cases, loading, error, refetch: fetchMyCases }
}
