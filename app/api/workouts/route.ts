import { NextResponse } from "next/server";
import {getAllUsers,addUser} from "@/lib/getUser";
import { currentUser, useUser } from "@clerk/nextjs";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import getCurrentDate from "@/lib/getDate";
import { workouts } from "@/drizzle/schema";
// check if user within allUsers
// if not add user
// export async function GET(request: Request) {
//     const users = await getAllUsers() 
//     return NextResponse.json(users)
// }

// add workout
export async function POST(request: Request) {
    const conn = connect(config)
    const db = drizzle(conn)
    const date = getCurrentDate()
    // console.log((request.json()))
    // add workout here
    // call api from frontend
    // const user = await currentUser();
    // let userId = user['userId']
    const req = await request.json()
    let userId = req.userId

    const newWorkout = {
        userId,
        date
    };
    const response = await db.insert(workouts).values(newWorkout); 
    console.log({response})
    return NextResponse.json({
        result: {
            userId,
            date,
            workoutId: response.insertId // replace with correct path if it's different
        },
    })
}
