// app/rewards/page.tsx
'use client'
import { Rewards } from '@/components/rewards/rewards'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <Rewards onNavigate={handleNavigate} />
}
