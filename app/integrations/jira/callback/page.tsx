"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function JiraCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('Connecting to Jira...')

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code')
            const state = searchParams.get('state')
            const error = searchParams.get('error')

            if (error) {
                setStatus('error')
                setMessage(`Authorization failed: ${error}`)
                return
            }

            if (!code) {
                setStatus('error')
                setMessage('No authorization code received')
                return
            }

            try {
                // The backend callback endpoint will handle the code exchange
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/jira/callback?code=${code}&state=${state}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.detail || 'Failed to connect to Jira')
                }

                setStatus('success')
                setMessage('Successfully connected to Jira!')

                // Redirect to projects page after 2 seconds
                setTimeout(() => {
                    router.push('/projects')
                }, 2000)
            } catch (error: any) {
                setStatus('error')
                setMessage(error.message || 'Failed to connect to Jira')
            }
        }

        handleCallback()
    }, [searchParams, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-lg">
                {status === 'loading' && (
                    <>
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg font-medium">{message}</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                        <p className="text-lg font-medium text-green-500">{message}</p>
                        <p className="text-sm text-muted-foreground">Redirecting...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle className="h-12 w-12 text-destructive" />
                        <p className="text-lg font-medium text-destructive">{message}</p>
                        <button
                            onClick={() => router.push('/projects')}
                            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                        >
                            Return to Projects
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
