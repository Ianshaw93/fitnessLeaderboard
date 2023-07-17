// 'use client'
import Image from 'next/image'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'


import { useUser } from '@clerk/nextjs';
import useApp from '@/store/useApp';

export default function Home() {
  // const setCurrentUser = useApp((state) => state.setCurrentUser)

  // const { isLoaded, isSignedIn, user } = useUser();
  // if (!isLoaded || !isSignedIn) {
  //   return null
  // } else {
    
  //   setCurrentUser({
  //     "firstName": user.firstName,
  //     "lastName": user.lastName,
  //     "id": user.id
  //   })
  // }
  
  return (
    <>
    <Navbar />
    <Leaderboard />
    </>
  )
}
