import { NextResponse } from "next/server";
import {getAllUsers,addUser} from "@/lib/getUser";
import { currentUser, useUser } from "@clerk/nextjs";
import { getAllExercises } from "@/lib/getWorkout";

// check if user within allUsers
// if not add user
export async function GET(request: Request) {
    const exercises = await getAllExercises() 
    return NextResponse.json(exercises)
}

// export async function POST(request: Request) {
//     const user = await currentUser();
//     // check if in db
//     const response = await addUser(user["userId"], user["firstName"], user["surname"]); 
//     console.log({response})
//     return NextResponse.json({
//         status: 201,
//         result: response,
//     })
// }
