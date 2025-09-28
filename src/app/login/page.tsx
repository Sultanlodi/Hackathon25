// app/login/page.tsx
'use client'
import { LoginPage } from '@/components/auth/login-page'
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

  return <LoginPage onNavigate={handleNavigate} />
}
