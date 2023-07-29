import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, text, primaryKey, char, decimal, date } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const exercises = mysqlTable("Exercises", {
	exerciseId: int("ExerciseID").autoincrement().primaryKey().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	description: text("Description"),
});

export const groupMembers = mysqlTable("GroupMembers", {
	groupId: int("GroupID").notNull(),
	userId: char("UserID", { length: 50 }).notNull(),
	role: varchar("Role", { length: 50 }),
},
(table) => {
	return {
		groupMembersGroupIdUserId: primaryKey(table.groupId, table.userId)
	}
});

export const groups = mysqlTable("Groups", {
	groupId: int("GroupID").autoincrement().primaryKey().notNull(),
	name: varchar("Name", { length: 100 }),
	description: varchar("Description", { length: 255 }),
});

export const workoutExercises = mysqlTable("WorkoutExercises", {
	// should have a workoutExerciseId too!
	workoutId: int("WorkoutID").notNull(),
	exerciseId: int("ExerciseID").notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	notes: text("Notes"),
	result: decimal("Result", { precision: 10, scale: 2 }),
	reps: int("Reps"),
	sets: int("Sets"),
	rest: varchar("Rest", { length: 255 }),
},
(table) => {
	return {
		workoutExercisesExerciseIdWorkoutId: primaryKey(table.exerciseId, table.workoutId)
	}
});

export const workouts = mysqlTable("Workouts", {
	workoutId: int("WorkoutID").autoincrement().primaryKey().notNull(),
	userId: char("UserID", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date("Date", { mode: 'string' }),
});

// export const a32C656B1F185931Bdb912Bebf0569Bf20230723133911Vrepl = mysqlTable("_a32c656b_1f18_5931_bdb9_12bebf0569bf_20230723133911_vrepl", {
// 	exerciseId: int("ExerciseID").autoincrement().primaryKey().notNull(),
// 	name: varchar("Name", { length: 100 }).notNull(),
// 	notes: text("Notes"),
// 	result: decimal("Result", { precision: 10, scale: 2 }),
// 	reps: int("Reps"),
// 	sets: int("Sets"),
// 	rest: varchar("Rest", { length: 255 }),
// });

export const users = mysqlTable("users", {
	userId: char("user_id", { length: 50 }).primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	surname: varchar("surname", { length: 255 }).notNull(),
});