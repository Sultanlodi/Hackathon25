// app/bank-linking/page.tsx
'use client'
import { BankLinking } from '@/components/bank-linking/bank-linking'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return <BankLinking onNavigate={handleNavigate} />
}
