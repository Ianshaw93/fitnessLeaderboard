import { authMiddleware } from "@clerk/nextjs";
// TODO: have landing page where signin/sign up button is present

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/", "/:locale/sign-in", "/api/users", "/api/mockCalls", "/api/workoutExercises", "/api/workouts", "/api/newGroup", "/api/addGroupMember"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};