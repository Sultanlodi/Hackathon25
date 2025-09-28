// app/goals/page.tsx
'use client'
import { Goals } from '@/components/goals/goals'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <Goals onNavigate={handleNavigate} />
}
