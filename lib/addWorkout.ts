import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { workouts } from "@/drizzle/schema";

export async function addWorkout(userId: string) { 
// check if workout there already?
    const conn = connect(config)
    const db = drizzle(conn)
    await db.insert(workouts).values({
        userId,
        // date, // is date needed to be sent?
      }).then((result)=> {
        console.log({result});
        return result;
      }).catch((err) => {
        console.log(err)
        return err;
      })
     
}