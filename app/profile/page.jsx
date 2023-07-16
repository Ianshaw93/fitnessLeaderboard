import { UserButton } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}