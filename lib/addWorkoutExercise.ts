import { connect } from "@planetscale/database";
import { exercises, workoutExercises } from "@/drizzle/schema"
import { Exercise, WorkoutExercise } from "@/types"
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless"

export async function getAllWorkoutExercises(): Promise<WorkoutExercise[]> {
    const conn = connect(config)
    const db = drizzle(conn)
  
    const results: WorkoutExercise[] = await db.select({
        workoutId: workoutExercises.workoutId,
        exerciseId: workoutExercises.exerciseId,
        name: workoutExercises.name,
        notes: workoutExercises.notes,
        result: workoutExercises.result,
        reps: workoutExercises.reps,
        sets: workoutExercises.sets,
        rest: workoutExercises.rest,
    })
    .from(workoutExercises)
  
    return results
  
  }