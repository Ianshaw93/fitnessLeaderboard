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
    const conn = connect(config)
    const db = drizzle(conn)
    const req = await request.json()
    let groupId = req.groupId 
    let userId = req.userId 
    let role = req.role // role: either 'Admin' or 'Member'


    // if unique
    const newMember = {
        groupId,
        userId,
        role
    };
    console.log("newWorkoutExercise", newMember)
    const response = await db.insert(groups).values(newMember); 
    console.log({response})
    return NextResponse.json({
        result: response,
    })
}