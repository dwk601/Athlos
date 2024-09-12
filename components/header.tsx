import Link from "next/link";
import { Button } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Athlos
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button variant="outline" asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </nav>
      </div>
    </header>
  );
}
