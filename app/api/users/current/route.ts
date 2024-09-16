import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const kindeUser = await getUser()

  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', kindeUser.id)
    .single()

  if (error && error.code === 'PGRST116') {
    // User not found, create a new user record
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        id: kindeUser.id,
        email: kindeUser.email,
        name: kindeUser.given_name ? `${kindeUser.given_name} ${kindeUser.family_name || ''}` : kindeUser.email,
      })
      .single()

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    data = newUser
  } else if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
