'use client'
import { useState } from 'react'

import useApp from '@/store/useApp'
import { useUser } from '@clerk/nextjs';
import Toast from './Toast'
// import axios from 'axios'
import { addWorkout } from '@/lib/addWorkout';
const serverUrl = {
  "remote": 'https://fitness-leaderboard.vercel.app/',
  "localHost": 'http://localhost:3000/'
}
const baseUrl = process.env["NEXT_PUBLIC_BASE_URL"]
console.log("baseUrl: ", baseUrl)

// TODO: get pr's for each exercise
// if new pr then show pr toast with fire emoji
export default function AddWorkout({exercises, userPRs}) { // later control with context or zustand
  // either store users etc on zustand or download fresh each time and this be a serverside component
  const { isLoaded, isSignedIn, user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(exercises[0]["name"])
  const recordCategories = exercises.map((item) => item.name)
  const [result, setResult] = useState(null)
  const [ showToast, setShowToast ] = useState({ visible: false, type: '', message: '' })
  const [ showPrToast, setShowPrToast ] = useState({ visible: false, type: '', message: '' })
  
  console.log("userPRs", userPRs.filter((item) => item.exerciseName === selectedCategory)[0]['maxResult'])

  const categoryDropdownContent = recordCategories.map((item) => {
    return <option key={item} value={item}>{item.split('_').join(' ')}</option>
})
  const [ workoutAdded, setWorkoutAdded] = useState(false)
  const [ currentWorkoutId, setCurrentWorkoutId] = useState(null)

  function filterExercisesByName(name) {
    return exercises
      .filter(exercise => exercise.name === name)
      .map(exercise => exercise.exerciseId);
  }

  // run async function througn axios call
  const actionAddWorkout = async (userId) => {
    // needs to return workout id!!
    console.log("uID addWorkout: ", userId)
    try {
      if (!workoutAdded) {
        // use env variables remote and local!!
        // process.env["BASE_URL"]
        const res = await fetch(`${baseUrl}api/workouts`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId
        })          
        });

        const response = await res.json();
        console.log("response clientside", response)
        // console.log("addWorkout response: ", response)
        setWorkoutAdded(true);
        setCurrentWorkoutId(response.result.workoutId)
        actionAddWorkoutExercise(
          response.result.workoutId,
          selectedCategory,
          "notes",
          parseFloat(result).toFixed(2),
          1,
          1,
          "n/a"
          )
        // var currentWorkoutId = response.workoutId
      } else {
        console.error('Workout added already: ')
        actionAddWorkoutExercise(
          currentWorkoutId,
          selectedCategory,
          "notes",
          parseFloat(result).toFixed(2),
          1,
          1,
          "n/a"
          )
      }
      
    } catch (error) {
      console.error('Error: ', error);
    }

  };  

  const actionAddWorkoutExercise = async (currentWorkoutId, name, notes, result, reps, sets, rest) => {
    console.log("currentWorkoutId", currentWorkoutId)
    let exerciseId = filterExercisesByName(name)
    console.log("head of workoutExercises fetch call", workoutAdded, JSON.stringify({
      currentWorkoutId,
  }))


            console.log("workoutExercises fetch call")
            const res = await fetch(`${baseUrl}api/workoutExercises`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                currentWorkoutId,
                exerciseId,// need to get from category chosen!!
                name,
                notes,
                result, // get userEntered number
                reps,
                sets,
                rest

              })
            });
            const response = await res.json();
            // Further checks based on the content of the response (Optional)
            if (response.error) {
              // Handle the error (e.g., show a toast with the error message)
              setShowToast({ visible: true, type: 'error', message: response.error });
            } else {
              console.log("successfully added workout")
              // Handle the success (e.g., show a toast with a success message)
              setShowToast({ visible: true, type: 'success', message: 'Successfully added!' });
              // setShowPrToast({ visible: true, type: 'success', message: 'New PR! 🔥' });
              // check if new pr
              if (userPRs.filter((item) => item.exerciseName === selectedCategory)[0]['maxResult'] < result) {
                setShowPrToast({ visible: true, type: 'success', message: 'New PR! 🔥' });
              }
              // if new pr then show pr toast with fire emoji
            }
            // place logic here to check if exercise added successfully
            console.log("response clientside workoutExercise", response)

  }

const categoryDropdown = (
    <label className="min-w-full flex items-center justify-center">
        <select
        onChange={handleInput}
        name='selectedCategory'
        value={selectedCategory || ""}
        className="w-30 text-center border p-2 mx-2 my-2"
        >
          { categoryDropdownContent }
        </select>
      </label>
) 

  function handleInput(event) {
    setSelectedCategory(event.target.value)
  }

  function handleClick(event) {
    if (isLoaded && isSignedIn) {

      console.log("current user id: ", user.emailAddresses[0])
      // user_2Sf9kBd0GnJCj2VgBcGqOcWB8p6
      // check if new workouts
      actionAddWorkout(user.id)

    }
  }

  const headerText = 'text-5xl capitalize font-thin text-[#D6D6D6] drop-shadow-[0_4px_4px_rgba(0,0,0)]'
  const subHeaderText = 'text-4xl capitalize font-thin text-gray-500'
  // performance would be improved by including layout
    return (
      <>
        <div  className="min-h-screen bg-gradient-to-t from-gray-600 via-gray-400 to-gray-600">
            <div className={headerText}>

              Add Activity:
            </div>
          <div className='col-span-2 mt-3 py-2 px-5 text-2xl capitalize font-thin text-gray-500'>

            <div className="rounded-xl bg-white px-20 py-1 mb-3 shadow-lg shadow-gray-600 grid mx-auto">
              <div className='grid grid-cols-1 gap-4'>
                    {categoryDropdown}

              </div>
              <div className='grid grid-cols-2 gap-4'>

                <label  className={`justify-self-end flex items-center ${subHeaderText}`}>
                  {/* later result */}
                  Weight:
                  </label>
                <div className='px-5 flex items-center gap-2'>

                <input 
                type="text" 
                className="w-24 border border-gray-300 px-3 py-2 rounded-md mb-4"  
                value={result ? result : ""}
                onChange={(e) => {
                  setResult(e.target.value)
                }

                }
                />
                {/* later changeable to lbs and other units such as time durations */}
                <span>
                  kg
                </span>
                </div>
                  </div>
              <div>
              </div>
              {/* font turns gold on press */}
              <button className="px-4 py-2 bg-[#949797] text-black hover:text-[#E9DC88] rounded-lg" onClick={handleClick}>
            Add
          </button>   
            </div>
          </div>
        </div>
        {/* TODO: second toast for pr */}
        {showToast.visible && 
          <Toast type={showToast.type} message={showToast.message} index={0}/>
        }
        {/* for some reason neither toast showing on android when one was showing before */}
        {showPrToast.visible &&
          <Toast type={showPrToast.type} message={showPrToast.message} index={1}/>
        }
      </>
    )
  }
            // <div className='flex justify-center'>
              
            //   {/* TODO: have hard coded width of buttons in pixels etc */}
            //   <button className="btn btn-lg" onClick={(event) => handleClick(event)} name="decrement">-</button>
            //   <div className='btn btn-lg bg-white text-black hover:bg-white'>{productTotal}</div>
            //   <button className="btn btn-lg" onClick={handleClick} name="increment">+</button>
            // </div>