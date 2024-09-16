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
  const { group_id, game_datetime, location } = await request.json()

  const { data, error } = await supabase
    .from('games')
    .insert({
      group_id,
      game_datetime,
      location,
      created_by: user.id
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}