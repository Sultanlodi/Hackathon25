import { supabase } from './supabase'

// Simple in-memory store as fallback for demo purposes
const plaidTokens: Record<string, string> = {}

// Store Plaid access tokens in Supabase bank_connections table
export async function setPlaidAccessToken(
  userId: string,
  token: string,
  itemId?: string,
  institutionName?: string
) {
  try {
    // Also store in memory for quick access
    plaidTokens[userId] = token

    const { data, error } = await supabase
      .from('bank_connections')
      .upsert(
        {
          user_id: userId,
          provider: 'plaid',
          external_item_id: itemId || null,
          institution_name: institutionName || null,
          status: 'linked',
          last_refreshed: new Date().toISOString(),
        },
        {
          onConflict: 'external_item_id',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Error storing bank connection:', error)
      throw error
    }

    // For this demo, we'll store the token in a simple way
    // In production, use Supabase Vault or encrypt the token
    const { error: updateError } = await supabase
      .from('bank_connections')
      .update({
        // Store token metadata only - actual token should be in secure storage
        status: 'linked',
        last_refreshed: new Date().toISOString(),
      })
      .eq('id', data.id)

    if (updateError) {
      console.error('Error updating bank connection:', updateError)
    }

    return data.id
  } catch (error) {
    console.error('Failed to store Plaid access token:', error)
    throw error
  }
}

export async function getPlaidAccessToken(
  userId: string,
  itemId?: string
): Promise<string | null> {
  try {
    // First check in-memory store for quick access
    if (plaidTokens[userId]) {
      return plaidTokens[userId]
    }

    let query = supabase
      .from('bank_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', 'plaid')

    if (itemId) {
      query = query.eq('external_item_id', itemId)
    }

    const { data, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null
      }
      console.error('Error fetching bank connection:', error)
      return null
    }

    // In a real app, you would retrieve the actual token from secure storage
    // For now, we'll return null and handle token retrieval differently
    return null
  } catch (error) {
    console.error('Failed to retrieve Plaid access token:', error)
    return null
  }
}

// Compatibility functions for API branch
export function saveAccessToken(userId: string, token: string) {
  plaidTokens[userId] = token
}

export function getAccessToken(userId: string): string | null {
  return plaidTokens[userId] || null
}

export function isLinked(userId: string): boolean {
  return !!plaidTokens[userId]
}

// Helper functions for other database operations
export async function createUserProfile(
  userId: string,
  email?: string,
  fullName?: string
) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email || null,
        full_name: fullName || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to create user profile:', error)
    throw error
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    return null
  }
}

export async function getBankConnections(userId: string) {
  try {
    const { data, error } = await supabase
      .from('bank_connections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bank connections:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch bank connections:', error)
    return []
  }
}

export async function getUserAccounts(userId: string) {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select(
        `
        *,
        bank_connections (
          institution_name,
          provider
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user accounts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch user accounts:', error)
    return []
  }
}
