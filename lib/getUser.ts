import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { exercises, users } from "@/drizzle/schema";
import { eq } from 'drizzle-orm'
import { User } from "@/types";

export async function getAllUsers(): Promise<User[]> {
  const conn = connect(config)
  const db = drizzle(conn)

  const results: User[] = await db.select({
    userId: users.userId,
    firstName: users.firstName,
    surname: users.surname,
  })
  .from(users)

  return results

}

export async function addUser(firstName: string,surname: string) {
  const conn = connect(config)
  const db = drizzle(conn)

  await db.insert(users).values({
    userId: Math.random().toString(),
    firstName,
    surname,
  }).then((result)=> {
    console.log({result});
    return result;
  }).catch((err) => {
    console.log(err)
    return err;
  })

}

