import Navbar from '../components/Navbar'
import AddWorkout from '../components/AddWorkout'
import { addWorkout } from '@/lib/addWorkout'
import { getAllExercises } from '@/lib/getWorkout'


export default async function WorkoutPage() {
  const exercises = await getAllExercises()
    return (
      <>

      <AddWorkout exercises={exercises}/>
      <Navbar />
      
      </>
    )
  }