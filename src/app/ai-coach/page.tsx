// app/ai-coach/page.tsx
'use client'
import { AICoach } from '@/components/ai-coach/ai-coach'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <AICoach onNavigate={handleNavigate} />
}
