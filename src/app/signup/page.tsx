// app/signup/page.tsx
'use client'
import { SignupPage } from '@/components/auth/signup-page'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    if (page === 'landing') {
      router.push('/')
    } else {
      router.push(`/${page}`)
    }
  }

  return <SignupPage onNavigate={handleNavigate} />
}
