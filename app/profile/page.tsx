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
  const subHeaderText = 'text-4xl capitalize font-thin text-[#D6D6D6] drop-shadow-[0_4px_4px_rgba(0,0,0)]'

  let filteredPRs = allPRs.filter(pr => pr.userId === user.id)
  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-gray-600 via-gray-400 to-gray-600">

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
      <span className="px-5 text-2xl capitalize text-[#D6D6D6] font-thin drop-shadow-[0_4px_4px_rgba(0,0,0)]">
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