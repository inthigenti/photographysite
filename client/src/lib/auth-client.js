import { createAuthClient } from "better-auth/react";

// Talks to the server's /api/auth routes. Using the page's own address means
// requests go through the Vite proxy in development, and the same site when live.
export const authClient = createAuthClient({
  baseURL: window.location.origin,
});

export const { signIn, signUp, signOut, useSession } = authClient;
