import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { group_name, description } = await request.json();

    if (!group_name || !description) {
      return NextResponse.json({ error: "Group name and description are required" }, { status: 400 });
    }

    // Use the authenticated user's ID as the leader_id
    const { data, error } = await supabase
      .from('groups')
      .insert([
        { 
          group_name, 
          description, 
          leader_id: user.id,  // Use the authenticated user's ID
          created_at: new Date().toISOString() 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
    }

    // Insert the user as a member of the group
    const { error: memberError } = await supabase
      .from('user_groups')
      .insert({
        user_id: user.id,
        group_id: data.id,
        status: 'accepted'
      });

    if (memberError) {
      console.error("Error adding user to group:", memberError);
      // We don't return here as the group was already created
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}