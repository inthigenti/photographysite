import { Link } from "react-router";
import { signOut, useSession } from "../lib/auth-client";

export function Header() {
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-10 bg-bg">
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 text-sm sm:px-6 sm:text-base lg:px-8"
      >
        <Link to="/" className="font-medium">
          Carlos Riviera
        </Link>

        {/* Phones: links drop to their own row under the name. sm and up: one row */}
        <ul className="order-last flex w-full gap-4 sm:order-none sm:ml-auto sm:w-auto sm:gap-6">
          <li>
            <a href="/#work" className="transition-colors hover:text-muted">
              Work
            </a>
          </li>
          <li>
            <a href="/#about" className="transition-colors hover:text-muted">
              About
            </a>
          </li>
          <li>
            <a href="/#contact" className="transition-colors hover:text-muted">
              Contact
            </a>
          </li>
        </ul>

        {/* Signed-in state: nothing while checking, then Sign out or Sign in / Sign up */}
        {!isPending &&
          (session ? (
            <div className="ml-auto flex items-center gap-4 sm:ml-0">
              <span className="hidden text-muted sm:inline">
                Hi, {session.user.name}
              </span>
              <button
                type="button"
                onClick={() => signOut()}
                className="cursor-pointer underline underline-offset-4 transition-colors hover:text-muted"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="ml-auto flex items-center gap-4 sm:ml-0">
              <Link to="/login" className="transition-colors hover:text-muted">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="border border-text px-3 py-1 transition-colors hover:bg-text hover:text-bg"
              >
                Sign up
              </Link>
            </div>
          ))}
      </nav>
    </header>
  );
}
