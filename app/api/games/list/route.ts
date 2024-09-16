import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const group_id = searchParams.get('group_id')

  if (!group_id) {
    return NextResponse.json({ error: 'Group ID is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('group_id', group_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}