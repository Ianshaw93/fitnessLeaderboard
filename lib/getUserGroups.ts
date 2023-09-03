import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database";
import { exercises, groupMembers, groups, users, workoutExercises, workouts } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';


export async function getUserGroups(targetUserId?: string ) {
const conn = connect(config);
const db = drizzle(conn);

// Step 1: Find all group IDs that the target user is part of
const userGroups = await db
.select({
  groupId: groupMembers.groupId,
})
.from(groupMembers)
.where(eq(groupMembers.userId, targetUserId));

const groupIds = userGroups.map(group => group.groupId);

// Step 2: Find all user IDs for each of those groups
if (groupIds.length > 0) {
const allMembers = await db
  .select({
    groupId: groupMembers.groupId,
    userId: groupMembers.userId,
    groupName: groups.name,
  })
  .from(groupMembers)
  .innerJoin(groups, eq(groupMembers.groupId, groups.groupId))
  .where(sql` ${groupMembers.groupId} IN ${groupIds};`);

// Group the user IDs by groupId and groupName
const groupedMembers: Record<string, { groupName: string, userIds: string[] }> = {};

for (const member of allMembers) {
  const key = member.groupId;
  if (!groupedMembers[key]) {
    groupedMembers[key] = { groupName: member.groupName, userIds: [] };
  }
  groupedMembers[key].userIds.push(member.userId);
}

return groupedMembers;
}}