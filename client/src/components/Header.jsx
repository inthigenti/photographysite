import { useEffect, useState } from "react";
import { Link } from "react-router";
import { signOut, useSession } from "../lib/auth-client";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  // While the drawer is open: Escape closes it, and the page behind can't scroll
  useEffect(() => {
    if (!menuOpen) return;

    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // Cleanup: runs when the drawer closes
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-10 bg-bg">
      <nav
        aria-label="Primary"
        className="flex items-center gap-x-6 px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="font-medium">
          Carlos Riviera
        </Link>

        {/* Tablet and desktop: links and sign-in buttons in one row */}
        <ul className="ml-auto hidden gap-6 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-muted"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {!isPending && (
          <div className="hidden items-center gap-4 sm:flex">
            {session ? (
              <>
                <span className="text-muted">Hi, {session.user.name}</span>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="cursor-pointer underline underline-offset-4 transition-colors hover:text-muted"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="transition-colors hover:text-muted"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="border border-text px-3 py-1 transition-colors hover:bg-text hover:text-bg"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}

        {/* Phones: hamburger button opens the drawer */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="ml-auto cursor-pointer p-1 sm:hidden"
        >
          <img src="/icons/list.svg" alt="" className="size-6" />
        </button>
      </nav>

      {/* Drawer: only on phones, only while open */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 sm:hidden">
          {/* Dark backdrop: tapping it closes the drawer */}
          <div className="absolute inset-0 bg-text/40" onClick={closeMenu} />

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col bg-bg px-6 py-4"
          >
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus
              className="cursor-pointer self-end p-1"
            >
              <img src="/icons/x.svg" alt="" className="size-6" />
            </button>

            <ul className="mt-8 flex flex-col gap-5 font-display text-3xl uppercase">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {!isPending && (
              <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6">
                {session ? (
                  <>
                    <p className="text-muted">
                      Signed in as {session.user.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className="cursor-pointer self-start underline underline-offset-4"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="border border-text px-4 py-3 text-center"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="bg-text px-4 py-3 text-center text-bg"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
