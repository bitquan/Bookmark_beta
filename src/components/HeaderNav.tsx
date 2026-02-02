"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { navLinks } from "@/components/navLinks";

export default function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const alertsLink = navLinks.find((link) => link.href === "/notifications");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(!!data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthed(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold text-zinc-900">
            Bookmark
          </Link>
          <span className="hidden text-xs text-zinc-400 sm:inline">
            Social learning app
          </span>
        </div>

        <nav className="hidden items-center gap-2 text-sm text-zinc-600 md:flex">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <link.Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {alertsLink ? (
            <Link
              href={alertsLink.href}
              className={`hidden items-center justify-center rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium transition md:inline-flex ${
                isActive(alertsLink.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
              aria-label={alertsLink.label}
            >
              <alertsLink.Icon className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {isAuthed ? (
            <Link
              href="/account"
              className={`hidden rounded-full px-3 py-1.5 text-sm font-medium transition md:inline-flex ${
                isActive("/account")
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              Account
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 md:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-full bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 md:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`border-t border-zinc-100 bg-white px-6 py-3 text-sm text-zinc-600 md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="grid gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-2 font-medium ${
                isActive(link.href) ? "bg-zinc-900 text-white" : "hover:bg-zinc-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <link.Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {isAuthed ? (
            <Link
              href="/account"
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive("/account")
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200 text-zinc-700"
              }`}
            >
              Account
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
