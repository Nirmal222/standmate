'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setToken } from '@/lib/redux/slices/authSlice'

export default function AuthSuccessPage({
  params
}: {
  params: Promise<{ token: string }>
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  // Unwrap params using React.use() as per Next.js 15 pattern
  const { token } = React.use(params)

  useEffect(() => {
    if (token) {
      // Store in localStorage
      localStorage.setItem('token', token)
      
      // Update Redux state
      dispatch(setToken(token))
      
      // Redirect to dashboard
      router.replace('/dashboard')
    } else {
        // Should not happen if route matches
        router.replace('/signup?error=no_token')
    }
  }, [token, router, dispatch])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authenticating...</h2>
        <p className="text-sm text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  )
}
