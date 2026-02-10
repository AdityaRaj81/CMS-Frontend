'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Select, Card, Alert } from '@/components/ui'
import { ArrowLeft, Save, UploadCloud } from 'lucide-react'
import { documentsService, casesService } from '@/services/api'
import { DOCUMENT_TYPES } from '@/constants'
import { useAuthStore } from '@/store/auth'

export default function UploadDocumentPage() {
    const router = useRouter()
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [cases, setCases] = useState<any[]>([])

    const [formData, setFormData] = useState({
        caseId: '',
        documentType: '',
        description: '',
    })
    const [file, setFile] = useState<File | null>(null)

    // Fetch cases for selection
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await casesService.getAll()
                setCases(response.data)
            } catch (err) {
                console.error('Failed to fetch cases', err)
            }
        }
        fetchCases()
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (!formData.caseId || !formData.documentType || !file) {
                throw new Error('Please fill in all required fields')
            }

            const uploadData = new FormData()
            uploadData.append('file', file)
            uploadData.append('caseId', formData.caseId)
            uploadData.append('documentType', formData.documentType.toUpperCase()) // Enum expects uppercase

            await documentsService.upload(uploadData)

            router.push('/dashboard/documents')
        } catch (err: any) {
            console.error('Error uploading document:', err)
            setError(err.response?.data?.message || err.message || 'Failed to upload document')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/documents">
                    <Button variant="secondary" size="sm">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="font-serif text-2xl font-bold text-legal-navy">Upload Document</h1>
                    <p className="text-gray-600">Add a new document to a case</p>
                </div>
            </div>

            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Select
                            label="Select Case *"
                            name="caseId"
                            value={formData.caseId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Case' },
                                ...cases.map((c: any) => ({ value: String(c.id), label: `${c.caseNumber} - ${c.caseTitle}` })),
                            ]}
                            required
                        />

                        <Select
                            label="Document Type *"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Type' },
                                ...DOCUMENT_TYPES,
                            ]}
                            required
                        />

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload File (PDF) *
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-legal-gold transition-colors">
                                <div className="space-y-1 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-legal-gold hover:text-legal-navy focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-legal-gold"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PDF up to 10MB
                                    </p>
                                    {file && (
                                        <p className="text-sm font-semibold text-legal-navy mt-2">
                                            Selected: {file.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Link href="/dashboard/documents">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" loading={loading} className="gap-2">
                            <Save className="h-4 w-4" />
                            Upload Document
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
