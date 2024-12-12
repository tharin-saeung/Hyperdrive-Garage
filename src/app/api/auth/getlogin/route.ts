import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET() {
  try {
    // Get the current session
    const session = await getSession()

    if (session) {
      return NextResponse.json({ 
        isLoggedIn: true,
        userId: session.userId 
      }, { status: 200 })
    }

    return NextResponse.json({ 
      isLoggedIn: false 
    }, { status: 200 })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ 
      isLoggedIn: false,
      error: 'Failed to check session' 
    }, { status: 500 })
  }
}