import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn, signUp } from "../lib/auth-client";

const fieldClasses =
  "w-full rounded-none border-0 border-b border-line bg-transparent py-2.5 transition-colors focus:border-text focus:shadow-[0_1px_0_0_var(--color-text)] focus:outline-none";

// One form for both pages: mode is "login" or "signup"
export function Login({ mode }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const result = isSignup
        ? await signUp.email({ email, password, name })
        : await signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "That did not work. Try again?");
        return;
      }
      navigate("/");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pb-32">
      <div className="max-w-md">
        <h1 className="font-display text-4xl uppercase sm:text-5xl">
          {isSignup ? "Create an account" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          {isSignup && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm text-muted">
                Name
              </label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClasses}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-muted">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClasses}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-muted">
              Password {isSignup && "(at least 8 characters)"}
            </label>
            <input
              type="password"
              id="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClasses}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="cursor-pointer self-start border border-text bg-text px-6 py-3.5 text-bg transition-colors hover:bg-bg hover:text-text disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted">
          {isSignup ? "Already have an account? " : "New here? "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="text-text underline underline-offset-4 hover:text-muted"
          >
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
