import { addWorkout } from "@/lib/addWorkout";
import { addUser } from "@/lib/getUser";
import { getAllExercises } from "@/lib/getWorkout";
import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { workoutExercises } from "@/drizzle/schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";

// export async function POST(request: Request) {
//     const user = {
//         "userId": Math.random.toString(),
//         "firstName": "Test",
//         "surname": "User"
//     }
//     // check if in db
//     const response = await addUser(user["userId"], user["firstName"], user["surname"]); 
//     console.log({response})
//     return NextResponse.json({
//         status: 201,
//         result: response,
//     })
// }

// export async function POST(request: Request) {
//     const user = {
//         "userId": "Test ID",
//         "firstName": "Test",
//         "surname": "User"
//     }
//     // check if in db
//     const response = await addWorkout(user["userId"]); 
//     console.log({response})
//     return NextResponse.json({
//         status: 201,
//         result: response,
//     })
// }




export async function GET(request: Request) {
    const exercises = await getAllExercises() 
    return NextResponse.json(exercises)
}

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