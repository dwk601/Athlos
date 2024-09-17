import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex items-center mb-4">
        <Avatar className="mr-4 h-12 w-12">
          <AvatarImage src={user.picture ?? ''} alt={user.given_name ?? 'User'} />
          <AvatarFallback>{user.given_name?.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">Welcome, {user.given_name}!</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Games</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement upcoming games list */}
            <p>No upcoming games</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement recent activities list */}
            <p>No recent activities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
