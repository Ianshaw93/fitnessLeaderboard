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
  const subHeaderText = 'text-4xl capitalize font-thin text-gray-500'

  let filteredPRs = allPRs.filter(pr => pr.userId === user.id)
  return (
    <>
      <div className="min-h-screen bg-[#111B1D]">

      <div className="grid items-center justify-center">
        <div className='py-2 mt-3'>
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
      <div className={`py-1 flex justify-center ${subHeaderText}`}>
          {user.firstName} {user.lastName}
      </div>
      </div>
      <span className="px-5 text-3xl capitalize text-gray-500">
        Personal Records
      </span>
      <ul>
            {filteredPRs.map((item, index) => {
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
      </div>
    </>
  )
}