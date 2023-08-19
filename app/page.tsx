import Image from 'next/image'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'
// import StoreUser from './components/StoreUser'
import { addUser } from "@/lib/getUser";
import { RedirectToSignIn, RedirectToSignUp, SignInButton, SignUp, SignedIn, SignedOut, UserButton, currentUser } from '@clerk/nextjs'
import { AuthUser } from '@/types';
import { getAllPRs } from '@/lib/getAllPRs';
import AddName from './components/AddName';


export default async function Home() {
  // can we send post request to backend?
  const user:AuthUser = await currentUser();
  // console.log("user: ", user.id, user.firstName, user.lastName)
  if (SignedIn && user && user.id) {
    if (user.firstName != 'null' && user.firstName) {

      addUser(user.firstName, user.lastName, user.id)
    }
    
  }
  const allPRs = await getAllPRs()
  // pass userDetails down to client components?
  // TODO: add workoutExercise from db etc -> send in via props to leaderboard
  console.log("user details: ", user)
  return (
    <>
    <SignedIn>
      {/* if no name -> require first and last name to be inputted */}
      <div className='bg-[#DADEDF]'>
        <UserButton />

      </div>
      {/* { SignedIn && !user || user.firstName === null || user.firstName == "null" || !user.firstName ? <AddName userId={user.id} /> : null} */}
      {/* <StoreUser /> */}
    </SignedIn>
    <SignedOut>
      <RedirectToSignUp />
    </SignedOut>
    <Navbar />
    <Leaderboard 
      allPRs={allPRs}
    />
    </>
  )
}
