'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OAuthSuccess() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/')
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return <p>Signing you in…</p>
}
