import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST() {
  try {
    // Delete the session
    await deleteSession()

    return NextResponse.json({ 
      message: 'Logged out successfully' 
    }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}