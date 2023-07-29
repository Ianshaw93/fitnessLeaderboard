import { connect } from "@planetscale/database";
import { exercises } from "@/drizzle/schema"
import { Exercise } from "@/types"
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless"

export async function getAllExercises(): Promise<Exercise[]> {
    const conn = connect(config)
    const db = drizzle(conn)
  
    const results: Exercise[] = await db.select({
      exerciseId: exercises.exerciseId,
      name: exercises.name,
      description: exercises.description,
    })
    .from(exercises)
  
    return results
  
  }