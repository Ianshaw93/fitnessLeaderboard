import Image from 'next/image'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'
// import StoreUser from './components/StoreUser'
import { addUser } from "@/lib/getUser";
import { RedirectToSignIn, RedirectToSignUp, SignInButton, SignUp, SignedIn, SignedOut, UserButton, currentUser } from '@clerk/nextjs'
import { AuthUser } from '@/types';
import { getAllPRs } from '@/lib/getAllPRs';
import Tab from './components/Tab'
import { getUserGroups } from '@/lib/getUserGroups';


export default async function Home() {
  // can we send post request to backend?
  const user:AuthUser = await currentUser();
  // console.log("user: ", user.id, user.firstName, user.lastName)

  if (SignedIn && user && user.id) {

    addUser(user.firstName, user.lastName, user.id)
    var userGroups = await getUserGroups(user.id)
  }
  const allPRs = await getAllPRs()
  // perhaps get all groups??
  // get all groups that user is member of

  // pass userDetails down to client components?
  // TODO: add workoutExercise from db etc -> send in via props to leaderboard
  
  return (
    <>
    <SignedOut>
      <RedirectToSignUp />
    </SignedOut>
    <SignedIn>
      {/* <div className='bg-[#DADEDF]'>
        <UserButton />

      </div> */}
      {/* <StoreUser /> */}
    <Navbar />
    { user && user.id &&
    <Tab allPRs={allPRs} userGroups={userGroups}/>
      // <Leaderboard 
      //   allPRs={allPRs}
      //   userGroups={userGroups}
      //   /> 
    }

      </SignedIn>
    </>
  )
}
