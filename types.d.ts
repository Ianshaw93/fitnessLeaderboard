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
    exerciseId: number
    name: string
    notes: string
    result: string
    reps: Number
    sets: Number
    rest: string
}

export type Workout = {
    workoutId: string
    userId: string
    date: date
}
// userId, lastName

export type PR = {
    userId: string
    firstName: string
    surname: string
    exerciseId: number
    exerciseName: string
    maxResult: number
}