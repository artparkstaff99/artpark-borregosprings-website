import React from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  return (
    <SessionProvider>
      <div>
        <LoginOnNavbar />
        <h1>Login Page</h1>
      </div>
    </SessionProvider>
  );
}

function LoginOnNavbar() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <a
          className="nav-link"
          href="/api/auth/signout"
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <b>Logout:</b> {session?.user.email}
        </a>
      ) : (
        <a
          className="nav-link"
          href="/api/auth/signin"
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <b>Login </b>
        </a>
      )}
    </div>
  );
}
