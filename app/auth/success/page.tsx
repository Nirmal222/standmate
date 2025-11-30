'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setToken } from '@/lib/redux/slices/authSlice'

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      // Store in localStorage
      localStorage.setItem('token', token)
      
      // Update Redux state
      dispatch(setToken(token))
      
      // Redirect to dashboard
      router.replace('/dashboard')
    } else {
        // If no token, something went wrong, go back to signup
        router.replace('/signup?error=no_token')
    }
  }, [searchParams, router, dispatch])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authenticating...</h2>
        <p className="text-sm text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  )
}
