import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore;
  console.log("Topbar isAdmin", isAdmin);

  return (
    <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Left */}
      <div className="flex gap-2 items-center">
        <img src="/public/spotify.png" alt="Spotify logo" className="size-8" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4" />
            <span>Admin Dashboard</span>
          </Link>
        )}
        <SignedIn>
          <SignInOAuthButtons />
        </SignedIn>
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <span>Sign out</span>
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
