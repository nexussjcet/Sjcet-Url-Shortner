"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LinkIcon, LogIn, LogOut, Menu } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="backdrop-blur-sm bg-background/80 sticky top-0 z-50 w-full border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center">
          <LinkIcon className="h-6 w-6 mr-2" />
          <span className="font-bold bg-clip-text text-white">
            ShortX
          </span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/shorten">
                  <Button variant="outline" className="hover:bg-slate-800/50">
                    Shorten URL
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="hover:bg-slate-800/50">
                    Profile
                  </Button>
                </Link>
                <Button
                  onClick={() => signOut()}
                  className="hover:bg-slate-800/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => signIn()}
                className="hover:bg-slate-800/50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {session ? (
              <>
                <Link href="/shorten" className="block px-3 py-2">
                  <Button variant="outline" className="w-full justify-start">
                    Shorten URL
                  </Button>
                </Link>
                <Link href="/profile" className="block px-3 py-2">
                  <Button variant="outline" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                <div className="px-3 py-2">
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-3 py-2">
                <Button
                  onClick={() => signIn()}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
