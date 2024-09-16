import Link from "next/link";
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AuthButtons = dynamic(() => import('./auth-buttons'), { ssr: false });

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/groups">Groups</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/" className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Athlos
        </Link>

        <nav>
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}
