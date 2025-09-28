// app/budget/page.tsx
'use client'
import { Budget } from '@/components/budget/budget'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <Budget onNavigate={handleNavigate} />
}
