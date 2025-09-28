// app/page.tsx
'use client'
import { Header } from '@/components/header'
import { LandingPage } from '@/components/landing-page'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    if (page === 'landing') {
      router.push('/')
    } else {
      router.push(`/${page}`)
    }
  }

  return (
    <>
      <Header onNavigate={handleNavigate} currentPage="landing" />
      <LandingPage onNavigate={handleNavigate} />
    </>
  )
}
