"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import http from "@/lib/http";
import { faker } from "@faker-js/faker";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await http.get("/hello");
      return await res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  async function createUser() {
    await http.post("/hello", {
      name: faker.person.firstName(),
      age: 30,
      email: faker.internet.email(),
    });
  }

  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button onClick={createUser}>Hello</Button>
    </div>
  );
}
