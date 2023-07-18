import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // not sure why doesn't work?
  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}