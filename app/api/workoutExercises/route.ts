import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { workoutExercises } from "@/drizzle/schema";
import { WorkoutExercise } from "@/types";

export async function GET(): Promise<WorkoutExercise[]> {
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
    // console.log((await request))
    const req = await request.json()
    console.log(req)
    let workoutId = req.currentWorkoutId
    let exerciseId = req.exerciseId
    // all below changin
    let name = req.name
    let notes = req.notes
    let result = req.result
    let reps = req.reps
    let sets = req.sets
    let rest = req.rest    // add workout here

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