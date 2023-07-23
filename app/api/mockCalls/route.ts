import { addUser } from "@/lib/getUser";
import { getAllExercises } from "@/lib/getWorkout";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const user = {
        "userId": Math.random.toString(),
        "firstName": "Test",
        "surname": "User"
    }
    // check if in db
    const response = await addUser(user["userId"], user["firstName"], user["surname"]); 
    console.log({response})
    return NextResponse.json({
        status: 201,
        result: response,
    })
}


export async function GET(request: Request) {
    const exercises = await getAllExercises() 
    return NextResponse.json(exercises)
}