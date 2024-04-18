import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}

export default async function IndexPage() {
  const session = await auth();

  return (
    <section className="size-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-900 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                NextJS Starter Template
              </h1>
              <p className="mx-auto max-w-[600px] md:text-xl">
                Use this to make your development easy. Fast, secure, and
                designed for modern life.
              </p>
              {session?.user ? <SignOut /> : <SignIn />}
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/home" className={buttonVariants()}>
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
