"use client";

import { Button } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function AuthButtons() {
  const { isAuthenticated } = useKindeAuth();

  return (
    <>
      {isAuthenticated ? (
        <Button variant="outline" asChild>
          <LogoutLink>Log out</LogoutLink>
        </Button>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button variant="outline" asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </>
      )}
    </>
  );
}
