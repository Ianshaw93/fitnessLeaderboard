import Navbar from '../components/Navbar'
import AddWorkout from '../components/AddWorkout'
import { getAllExercises } from '@/lib/getWorkout'
import { getAllPRs } from '@/lib/getAllPRs'
import { AuthUser } from '@/types';
import { currentUser } from '@clerk/nextjs';


export default async function WorkoutPage() {
  const user:AuthUser = await currentUser();
  const exercises = await getAllExercises()
  const allPRs = await getAllPRs()
  const userPRs = allPRs.filter(pr => pr.userId === user.id)
    return (
      <>

      <AddWorkout exercises={exercises} userPRs={userPRs}/>
      <Navbar />
      
      </>
    )
  }