import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import StoreUser from './components/StoreUser'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export default function Home() {
  
  return (
    <>
    <SignedIn>
      <UserButton />
      <StoreUser />
    </SignedIn>
    <SignedOut>
      <SignInButton mode='modal'>
        <button>
          Sign In
        </button>
      </SignInButton>
    </SignedOut>
    <Navbar />
    <Leaderboard />
    <UserButton afterSignOutUrl="/"/>
    </>
  )
}
