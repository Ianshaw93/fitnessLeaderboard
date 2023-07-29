'use client'
import { useState } from 'react'
import {
  dummyLeaderboard, 
  dummyWorkoutLog
} from '../data/mockData'
import useApp from '@/store/useApp'
import { useUser } from '@clerk/nextjs';
// import axios from 'axios'
import { addWorkout } from '@/lib/addWorkout';

// TODO: get exerciseIds for each exercise
export default function AddWorkout({exercises}) { // later control with context or zustand
  // either store users etc on zustand or download fresh each time and this be a serverside component
  const { isLoaded, isSignedIn, user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(exercises[0]["name"])
  const recordCategories = exercises.map((item) => item.name)
  const [result, setResult] = useState(null)

  const leaderboardData = useApp((state) => state.leaderboardData)
  const setLeaderboardData = useApp((state) => state.setLeaderboardData)
  const workoutLogData = useApp((state) => state.workoutLogData)
  const setWorkoutLogData = useApp((state) => state.setWorkoutLogData)
  // const currentUser = useApp((state) => state.currentUser)
  
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
    try {
      if (!workoutAdded) {
        const res = await fetch('http://localhost:3000/api/workouts',{
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
            const res = await fetch('http://localhost:3000/api/workoutExercises', {
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
            console.log("response clientside workoutExercise", response)

  }

const categoryDropdown = (
    <label className="min-w-full flex items-center justify-center">
        <select
        onChange={handleInput}
        name='selectedCategory'
        value={selectedCategory || ""}
        className="w-9/12 text-center border p-2 mx-2 my-2"
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
      
      // TODO: on click i) add to log; 
      // need current category
      // need total of input at enter
      console.log("leaderboardData data: ", leaderboardData)
      console.log("current user id: ", user)
      // user_2Sf9kBd0GnJCj2VgBcGqOcWB8p6
      // check if new workouts
      actionAddWorkout(user.id)
      // actionAddWorkoutExercise()


      // let userLog = workoutLogData.find(element => element.id=== user.id) // returns undefined
      // // add an entry if not present
      // if (!userLog) {
      //   // add blank entry
      //   workoutLogData.push({
      //     "id": user.id,
      //     "log": []
      //   })
      //   userLog = workoutLogData.find(element => element.id=== user.id)
      // }
      // let timeCode = "20230716"
      // console.log(userLog)
      // console.log("workoutLogData data: ", workoutLogData)
      // // if (userLog['log'])
      // let currentLog = userLog['log'].find(element => element["timeCode"]=== timeCode)
      // if (currentLog && currentLog['entries'] && currentLog['entries'].length > 0) {
      //   // if one log for this day exists
      //   currentLog['entries'].push(
      //     {
      //       "activity": selectedCategory,
      //       "result": result,
      //       "sets": 1,
      //       "reps": 1          
      //     }        
      //   )
      // } else {
      //   // if no entry for today exists
  
      //   userLog['log'].push({
      //     "timeCode": timeCode,
      //     "entries": [
      //       {
      //         "activity": selectedCategory,
      //         "result": result,
      //         "sets": 1,
      //         "reps": 1          
      //       }
      //     ]
      //   })
      // }
      // setWorkoutLogData(workoutLogData)
      // // ii) compare to pr
      // let tempLeaderBoard = leaderboardData
      // let userPrEntry = tempLeaderBoard.find(element => element.id=== user.id)
      // let userPr = userPrEntry['personal_records'][selectedCategory]
      // if (userPr === null || userPr < parseFloat(result)) { // if time then would be min
      //   // pr achieved!
      //   // alert/congratulate user
      //   userPrEntry['personal_records'][selectedCategory] = parseFloat(result)
      //   setLeaderboardData(tempLeaderBoard)
  
  
      // }
  
      // console.log(workoutLogData, leaderboardData)

    }
  }

  const headerText = 'text-5xl capitalize font-thin text-gray-500'
  const subHeaderText = 'text-4xl capitalize font-thin text-gray-500'
    return (
      <>
        <div  className="min-h-screen bg-[#DED1BF]">
          <div className='col-span-2 mt-3 py-2 text-2xl capitalize font-thin text-gray-500'>

            <span className={headerText}>

              Add Activity:
            </span>
            <div className="rounded-xl bg-white px-5 py-1 mb-3 shadow-lg shadow-gray-600 grid mx-auto max-w-full">
              <div className='grid grid-cols-2 gap-4'>
                <span className={`justify-self-end ${subHeaderText}`}>
                  Activity: 
                </span>
                <div className="justify-self-start form-control w-100" >
                    {categoryDropdown}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>

                <label  className={`justify-self-end flex items-center ${subHeaderText}`}>
                  {/* later result */}
                  Weight:
                  </label>
                <div className='flex items-center gap-2'>

                <input 
                type="text" 
                className="w-64 border border-gray-300 px-3 py-2 rounded-md mb-4"  
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
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleClick}>
            Add
          </button>   
            </div>
          </div>
        </div>
      </>
    )
  }
            // <div className='flex justify-center'>
              
            //   {/* TODO: have hard coded width of buttons in pixels etc */}
            //   <button className="btn btn-lg" onClick={(event) => handleClick(event)} name="decrement">-</button>
            //   <div className='btn btn-lg bg-white text-black hover:bg-white'>{productTotal}</div>
            //   <button className="btn btn-lg" onClick={handleClick} name="increment">+</button>
            // </div>