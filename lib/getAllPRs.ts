import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database";
import { exercises, users, workoutExercises, workouts } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';


export async function getAllPRs() {
const conn = connect(config);
const db = drizzle(conn);

const result= await db.select({
    userId: users.userId,
    firstName: users.firstName,
    surname: users.surname,
    exerciseId: exercises.exerciseId,
    exerciseName: exercises.name,
    maxResult: sql`MAX(${workoutExercises.result})`
  })
  .from(workoutExercises)
  .innerJoin(workouts, eq(workoutExercises.workoutId, workouts.workoutId))
  .innerJoin(users, eq(workouts.userId, users.userId))
  .innerJoin(exercises, eq(workoutExercises.exerciseId, exercises.exerciseId))
  .groupBy(sql`${users.userId}, ${exercises.exerciseId}`);
//   .groupBy([
//     users.userId,
//     exercises.exerciseId
//   ]);

return result
}