import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { exercises, users } from "@/drizzle/schema";
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

function userExists(users: User[], userId:string) {
  return users.some(user => user.userId === userId);
}

export async function addUser(firstName: string,surname: string, userId: string) {
  const conn = connect(config)
  const db = drizzle(conn)
  
  console.log("addUser func")
  const results: User[] = await db.select({
    userId: users.userId,
    firstName: users.firstName,
    surname: users.surname,
  })
  .from(users)

  if (!userExists(results, userId)) {

    await db.insert(users).values({
      userId,
      firstName,
      surname,
    }).then((result)=> {
      console.log("new userInfo:",result);
      return result;
    }).catch((err) => {
      console.log("error adding user: ",err)
      return err;
    })
  } else{
    console.log("user already in db")
    return 
    // returning user flow
  }

}

