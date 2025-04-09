import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";

const Topbar = () => {
  const isAdmin = true;
  return (
    <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Left */}
      <div className="text-white font-semibold">Spotify</div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-1 text-sm text-white"
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
      </div>
    </div>
  );
};

export default Topbar;
