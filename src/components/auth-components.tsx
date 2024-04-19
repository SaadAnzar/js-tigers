import { signIn, signOut } from "@/auth";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit">Sign In with Google</Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="inline-flex w-full items-center" type="submit">
        <LogOut className="mr-2 size-4" />
        Sign Out
      </button>
    </form>
  );
}
