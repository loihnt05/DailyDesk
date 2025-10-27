import db from "@/lib/backend/db";
import { usersTable } from "@/lib/backend/db/schema";

export async function GET(request: Request) {
  return Response.json(await db.select().from(usersTable));
}

export async function POST(request: Request) {
  const { name, age, email } = await request.json();
  const result = await db
    .insert(usersTable)
    .values({ name, age, email })
    .returning();
  return Response.json(result);
}