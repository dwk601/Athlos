import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await getUser()
  const { game_id, check_in_status } = await request.json()

  const { data, error } = await supabase
    .from('game_attendees')
    .upsert({
      game_id,
      user_id: user.id,
      check_in_status,
      checked_in_at: check_in_status ? new Date().toISOString() : null
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}