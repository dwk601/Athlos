import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import GroupList from "@/components/group-list";
import CreateGroupButton from "@/components/create-group-button";

export default async function GroupsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>
      <CreateGroupButton />
      <GroupList />
    </div>
  );
}