// app/dashboard/page.tsx
'use client'
import { Dashboard } from '@/components/dashboard/dashboard'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <Dashboard onNavigate={handleNavigate} />
}
