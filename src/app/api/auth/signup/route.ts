import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createUserProfile } from '@/lib/store'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, full_name } = body

    if (!email) {
      return NextResponse.json(
        {
          error: 'Email is required',
        },
        { status: 400 }
      )
    }

    // Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: body.password || Math.random().toString(36), // Generate temporary password if not provided
      options: {
        data: {
          full_name: full_name || null,
        },
      },
    })

    if (authError) {
      console.error('Supabase auth error:', authError)

      // Handle specific error cases
      if (authError.message?.includes('already registered')) {
        return NextResponse.json(
          {
            error: 'User already exists',
          },
          { status: 409 }
        )
      }

      return NextResponse.json(
        {
          error: 'Failed to create user account',
        },
        { status: 500 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          error: 'Failed to create user',
        },
        { status: 500 }
      )
    }

    // The profile should be created automatically via the trigger,
    // but we can ensure it exists here
    try {
      await createUserProfile(authData.user.id, email, full_name)
    } catch (profileError) {
      // Profile might already exist from the trigger, which is fine
      console.log('Profile creation handled by trigger or already exists')
    }

    return NextResponse.json({
      userId: authData.user.id,
      email: authData.user.email,
      needsVerification: !authData.user.email_confirmed_at,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      {
        error: 'Invalid request',
      },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to create a new user account',
    example: {
      email: 'user@example.com',
      full_name: 'John Doe',
      password: 'optional-password',
    },
  })
}
