export type User = {
    userId: string
    firstName: string
    surname: string
}

export type AuthUser = {
    id: string
    firstName: string
    lastName: string
}

export type Exercise = {
    exerciseId: Number
    name: string
    description: string
}
// export const exercises = mysqlTable("Exercises", {
// 	exerciseId: int("ExerciseID").autoincrement().primaryKey().notNull(),
// 	name: varchar("Name", { length: 100 }).notNull(),
// 	description: text("Description"),
// });

export type WorkoutExercise = {
    workoutId: number
    exerciseId: Number
    notes: string
    result: Number
    // below should be removed??
    reps: Number
    sets: Number
    rest: Number
}
// userId, lastName