import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, text, decimal, primaryKey, char } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const exercises = mysqlTable("Exercises", {
	exerciseId: int("ExerciseID").autoincrement().primaryKey().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	notes: text("Notes"),
	result: decimal("Result", { precision: 10, scale: 2 }),
	reps: int("Reps"),
	sets: int("Sets"),
	rest: varchar("Rest", { length: 255 }),
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

export const users = mysqlTable("users", {
	userId: char("user_id", { length: 50 }).primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	surname: varchar("surname", { length: 255 }).notNull(),
});