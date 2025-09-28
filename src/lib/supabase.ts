import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for better TypeScript support
export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  join_date: string
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

export interface BankConnection {
  id: string
  user_id: string
  provider: string
  institution_name: string | null
  status: string
  last_refreshed: string | null
  external_item_id: string | null
  created_at: string
  updated_at: string
}

export interface Account {
  id: string
  user_id: string
  connection_id: string | null
  name: string
  type:
    | 'checking'
    | 'savings'
    | 'credit'
    | 'loan'
    | 'investment'
    | 'cash'
    | 'other'
  mask: string | null
  currency: string
  current_balance: number
  available_balance: number | null
  external_account_id: string | null
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: number
  user_id: string
  account_id: string
  posted_at: string
  amount: number
  description: string | null
  merchant: string | null
  categories: string[]
  status: 'pending' | 'posted' | 'void'
  external_tx_id: string | null
  created_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  icon: string | null
  target_amount: number
  current_amount: number
  target_date: string | null
  status: 'active' | 'paused' | 'completed' | 'archived'
  created_at: string
  updated_at: string
}

export interface Wallet {
  user_id: string
  address: string | null
  network: string
  token_symbol: string
  token_balance: string
  last_synced: string | null
  created_at: string
  updated_at: string
}
