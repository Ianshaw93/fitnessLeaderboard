import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { groups } from "@/drizzle/schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export async function POST(request: Request) {
    // TODO:
        {/* 
    add groups table to schema
    api call -> add new group
    check that group name is unique 
    allow other users to be added/invited -> search user names?
    or have passkey to join group?
    */}
    console.log("request", request)
    const conn = connect(config)
    const db = drizzle(conn)
    const req = await request.json()
    let name = req.name
    let description = 'description'

    // TODO: access all groups and check if name already exists
    // if unique 

    const newGroup = {
        name,
        description
    };
    console.log("newWorkoutExercise", newGroup)
    const response = await db.insert(groups).values(newGroup); 
    console.log({response})
    return NextResponse.json({
        result: response,
    })
}