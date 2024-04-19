import Link from "next/link";
import { auth } from "@/auth";

import { buttonVariants } from "@/components/ui/button";
import { SignIn } from "@/components/auth-components";

export default async function IndexPage() {
  const session = await auth();

  return (
    <section className="size-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-900 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Welcome to JS Tigers
              </h1>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              {session?.user ? (
                <Link href="/dashboard" className={buttonVariants()}>
                  Continue
                </Link>
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
