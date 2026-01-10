"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function AtlassianCallbackPage() {
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
            <div className="flex flex-col items-center gap-6 text-center max-w-md">
                {status === 'loading' && (
                    <>
                        <Spinner className="size-8" />
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold tracking-tight">{message}</h2>
                            <p className="text-sm text-muted-foreground">
                                Please wait while we set things up
                            </p>
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="size-12 text-green-500" strokeWidth={1.5} />
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold tracking-tight text-green-500">
                                {message}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                                Redirecting to projects
                                <Spinner className="size-3" />
                            </p>
                        </div>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="size-12 text-destructive" strokeWidth={1.5} />
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold tracking-tight text-destructive">
                                    Connection Failed
                                </h2>
                                <p className="text-sm text-muted-foreground">{message}</p>
                            </div>
                            <Button
                                onClick={() => router.push('/projects')}
                                variant="outline"
                                className="mt-2"
                            >
                                Return to Projects
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
