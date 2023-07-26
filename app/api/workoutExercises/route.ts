import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { workoutExercises } from "@/drizzle/schema";
import { WorkoutExercise } from "@/types";

export async function getAllWorkoutExercises(): Promise<WorkoutExercise[]> {
    const conn = connect(config)
    const db = drizzle(conn)
  
    const results: WorkoutExercise[] = await db.select({
    //   exerciseId: exercises.exerciseId,
    //   name: exercises.name,
    //   description: exercises.description,
      workoutId: workoutExercises.workoutId, 
      exerciseId: workoutExercises.exerciseId,
      name: workoutExercises.name,
      notes: workoutExercises.notes,
      result: workoutExercises.result,
      reps: workoutExercises.reps,
      sets: workoutExercises.sets,
      rest: workoutExercises.rest
    })
    .from(workoutExercises)
  
    return results
  
  }
// export async function GET(request: Request) {
//     const exercises = await getAllWorkoutExercises() 
//     return NextResponse.json(exercises)
// }
// add workout
export async function POST(request: Request) {
    const conn = connect(config)
    const db = drizzle(conn)
    console.log((await request))
    console.log((await request.json()))
    const req = await request.json()
    let workoutId = req.currentWorkoutId
    let exerciseId = 559
    let name = "test"
    let notes = "test"
    let result = "100.00"
    let reps = 1
    let sets = 1
    let rest = "n/a"    // add workout here

    const newWorkoutExercise = {
        workoutId,
        exerciseId,
        name,
        notes,
        result,
        reps,
        sets,
        rest
    };
    console.log("newWorkoutExercise", newWorkoutExercise)
    const response = await db.insert(workoutExercises).values(newWorkoutExercise); 
    console.log({response})
    return NextResponse.json({
        result: response,
    })
}