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
      <button className="w-full inline-flex items-center" type="submit">
        <LogOut className="size-4 mr-2" />
        Sign Out
      </button>
    </form>
  );
}
