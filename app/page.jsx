import Image from 'next/image'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'

import { auth } from '@clerk/nextjs';



// TODO: home page
// profile page: pr's and click on lift -> goes to leaderboard for group
// ability to record workout
export default function Home() {
  const { userId } = auth();
  return (
    <>
    {/* Test */}
    <div>User Id: {userId}</div>
    <Navbar />
    <Leaderboard />
    </>
  )
}
