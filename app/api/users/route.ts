import { NextResponse } from "next/server";
import getAllUsers from "@/lib/getUser";

export async function GET(request: Request) {
    const users = await getAllUsers() 

    return NextResponse.json(users)
}
