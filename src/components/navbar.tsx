import Link from "next/link";
import { auth } from "@/auth";
import { Github, LayoutDashboard } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/components/auth-components";
import { ThemeToggle } from "@/components/theme-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="mx-auto flex h-16 w-full items-center justify-between space-x-4 px-4 sm:px-12">
        <div className="flex gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80"
          >
            <span className="text-lg font-bold">JS Tigers</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <nav className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9 cursor-pointer rounded-full">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt="user-image"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-3 mt-1 w-56">
                <DropdownMenuLabel className="truncate">
                  {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="truncate">
                  {session?.user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 size-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="https://github.com/SaadAnzar" target="_blank">
                    <Github className="mr-2 size-4" />
                    <span>GitHub</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
