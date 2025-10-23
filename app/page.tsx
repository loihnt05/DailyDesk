"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("/api/hello");
      return await res.json();
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  async function createUser() {
    const res = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "John", age: 30, email: "john@example.com" }),
    });
  }

  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button onClick={createUser}>Hello</Button>
    </div>
  );
}
