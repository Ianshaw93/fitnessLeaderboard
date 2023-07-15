import Image from 'next/image'
import AddWorkout from './components/AddWorkout'
import Leaderboard from './components/Leaderboard'



// TODO: home page
// profile page: pr's and click on lift -> goes to leaderboard for group
// ability to record workout
export default function Home() {
  return (
    <>
    {/* Test
    <AddWorkout /> */}
    <Leaderboard />
    </>
  )
}
