import Image from 'next/image'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'
// import StoreUser from './components/StoreUser'
import { addUser } from "@/lib/getUser";
import { SignInButton, SignedIn, SignedOut, UserButton, currentUser } from '@clerk/nextjs'
import { AuthUser } from '@/types';
import { getAllPRs } from '@/lib/getAllPRs';


export default async function Home() {
  // can we send post request to backend?
  const user:AuthUser = await currentUser();
  // console.log("user: ", user.id, user.firstName, user.lastName)
  if (SignedIn && user && user.id) {

    addUser(user.id, user.firstName, user.lastName)
  }
  const allPRs = await getAllPRs()
  // pass userDetails down to client components?
  // TODO: add workoutExercise from db etc -> send in via props to leaderboard
  
  return (
    <>
    <SignedIn>
      <UserButton />
      {/* <StoreUser /> */}
    </SignedIn>
    <SignedOut>
      <SignInButton mode='modal'>
        <button className='bg-[#d4af37] rounded font-bold py-2 px-4'>
        Sign In
        </button>
        </SignInButton>
      </SignedOut>
    <Navbar />
    <Leaderboard 
      allPRs={allPRs}
    />
    </>
  )
}
