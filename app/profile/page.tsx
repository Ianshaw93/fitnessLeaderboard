import { getAllPRs } from "@/lib/getAllPRs";
import { UserButton, currentUser } from "@clerk/nextjs";
import LeaderboardCard from "../components/LeaderboardCard";
import { AuthUser, PR } from "@/types";
import Navbar from "../components/Navbar";

export default async function ProfilePage() {
  // TODO: profile image
  // name
  // pr's -> filter for user name
  const user:AuthUser = await currentUser();
  const allPRs = await getAllPRs()
  // need a client component for image likely
  return (
    <>
      <div className="grid items-center justify-center">
        <div className='py-5'>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox:
                  "h-40 w-40",
              },
            }}
          />
        </div>
      {/* </div>
      <div> */}
      <div className="py-5 flex justify-center">
          {user.firstName} {user.lastName}
      </div>
      </div>
      <span className="px-5">
        Personal Records:
      </span>
      <ul>
            {allPRs.map((item, index) => {
                return (
                    <>
                    <li key={item.userId}>
                        <LeaderboardCard 
                            key={index}
                            rank={index+1}
                            name={item.exerciseName} 
                            weightLifted_kg={(item.maxResult as number)}
                            

                        /> 

                    </li>
                    </>
                )
            })}
        </ul>
        <Navbar/>
    </>
  )
}