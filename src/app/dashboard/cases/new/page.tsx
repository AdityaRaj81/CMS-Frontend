'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Input, Select, Card, Alert } from '@/components/ui'
import { ArrowLeft, Save } from 'lucide-react'
import { casesService } from '@/services/api'
import { COURT_LIST, CASE_CATEGORIES, CASE_STATUSES } from '@/constants'
import { useAuthStore } from '@/store/auth'

export default function NewCasePage() {
    const router = useRouter()
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        caseNumber: '',
        cnrNumber: '',
        caseTitle: '',
        courtName: '',
        caseType: '',
        status: 'active',
        petitionerName: '',
        respondentName: '',
        nextHearingDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Validate required fields
            if (!formData.caseNumber || !formData.caseTitle || !formData.courtName) {
                throw new Error('Please fill in all required fields')
            }

            await casesService.create({
                ...formData,
                assignedAdvocateId: user?.id
            })

            router.push('/dashboard/cases')
        } catch (err: any) {
            console.error('Error creating case:', err)
            setError(err.response?.data?.message || err.message || 'Failed to create case')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/cases">
                    <Button variant="secondary" size="sm">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="font-serif text-2xl font-bold text-legal-navy">New Case</h1>
                    <p className="text-gray-600">Add a new legal case to your records</p>
                </div>
            </div>

            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Case Number *"
                            name="caseNumber"
                            value={formData.caseNumber}
                            onChange={handleChange}
                            placeholder="e.g. WP(C) 1234/2024"
                            required
                        />

                        <Input
                            label="CNR Number"
                            name="cnrNumber"
                            value={formData.cnrNumber}
                            onChange={handleChange}
                            placeholder="e.g. BRHC010012342024"
                        />

                        <div className="md:col-span-2">
                            <Input
                                label="Case Title *"
                                name="caseTitle"
                                value={formData.caseTitle}
                                onChange={handleChange}
                                placeholder="e.g. Ramesh Kumar vs State of Bihar"
                                required
                            />
                        </div>

                        <Select
                            label="Court *"
                            name="courtName"
                            value={formData.courtName}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Court' },
                                ...COURT_LIST.map((c) => ({ value: c.name, label: c.name })),
                            ]}
                            required
                        />

                        <Select
                            label="Case Category"
                            name="caseType"
                            value={formData.caseType}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Category' },
                                ...CASE_CATEGORIES,
                            ]}
                        />

                        <Input
                            label="Petitioner Name"
                            name="petitionerName"
                            value={formData.petitionerName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Respondent Name"
                            name="respondentName"
                            value={formData.respondentName}
                            onChange={handleChange}
                        />

                        <Select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={CASE_STATUSES}
                        />

                        <Input
                            label="Next Hearing Date"
                            name="nextHearingDate"
                            type="date"
                            value={formData.nextHearingDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description / Notes
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 p-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold"
                            placeholder="Enter any additional details about the case..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Link href="/dashboard/cases">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" loading={loading} className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Case
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
