import { NextResponse } from "next/server";
import {getAllUsers,addUser} from "@/lib/getUser";

export async function GET(request: Request) {
    const users = await getAllUsers() 
    return NextResponse.json(users)
}

export async function POST(request: Request) {
   // const {firstName,surname}: {firstName: string,surname: string} = await request.body;
    const response = await addUser("Ian","Shaw"); 
    console.log({response})
    return NextResponse.json({
        status: 201,
        result: response,
    })
}
