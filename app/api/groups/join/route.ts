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
  const { group_id } = await request.json()

  const { data, error } = await supabase
    .from('user_groups')
    .insert({
      user_id: user.id,
      group_id,
      status: 'pending'
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}