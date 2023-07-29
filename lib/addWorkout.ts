import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { workouts } from "@/drizzle/schema";
import { Workout } from "@/types";
import getCurrentDate from "./getDate";

// TODO: call from AddWorkout i.e. add exercise component
export async function addWorkout(userId: string): Promise<Workout> { 

    const conn = connect(config)
    const db = drizzle(conn)
    const date = getCurrentDate()

    const newWorkout = {
        userId,
        date
    };


    try {
        const result = await db.insert(workouts).values(newWorkout);
        console.log({result});

        return {
            userId,
            date,
            workoutId: result.insertId // replace with correct path if it's different
        };
    } catch (err) {
        console.error(err);
        throw err; // This will cause the returned Promise to be rejected
    }


}







