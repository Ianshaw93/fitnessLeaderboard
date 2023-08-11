import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <>
  {/* Test */}
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </>
  ;
}