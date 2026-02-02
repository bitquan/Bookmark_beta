"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/components/navLinks";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/90 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-around px-4 py-2 text-[11px] text-zinc-500">
        {navLinks.slice(0, 5).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition ${
              isActive(link.href)
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <link.Icon className="h-5 w-5" aria-hidden="true" />
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
