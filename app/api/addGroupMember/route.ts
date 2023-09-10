import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { groupMembers } from "@/drizzle/schema";
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
    try {
        console.log("Add group member");
        const conn = connect(config)
        const db = drizzle(conn)
        const req = await request.json()
        let groupId = req.groupId 
        let userIds = req.userIds 
        let roles = req.roles // role: either 'Admin' or 'Member'
    
        console.log("Received groupId:", groupId);
        console.log("Received userId:", userIds);
        console.log("Received role:", roles);
    
        // Validation
        if (!groupId || !userIds || !roles) {
            throw new Error("Missing required fields");
          }
      
        // if unique
        const newMembers = userIds.map((userId, index) => ({
            groupId,
            userId: userId,
            role: roles[index]
        }));
        // console.log("newWorkoutExercise", newMember)
        const responses = []
        for (const newMember of newMembers) { 
            const response = await db.insert(groupMembers).values(newMember); 
            responses.push(response)
            
        }
        console.log({responses})
        return NextResponse.json({
            result: responses,
        }) 
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            error: "An error occurred while adding the group member.",
        });
    }
}