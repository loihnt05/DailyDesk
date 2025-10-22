"use client";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!user && <Link href="/auth/login">Login</Link>}
      {user && (
        <div style={{ textAlign: "center" }}>
          <a href="/auth/logout">Logout</a>

          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: "50%", width: "80px", height: "80px" }}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export function Profile() {
  return <></>;
}
