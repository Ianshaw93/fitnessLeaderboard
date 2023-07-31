"use client"
import { useState } from 'react'
import LeaderboardCard from './LeaderboardCard'


// needs to pass in db data from server component
// TODO: use workoutExercise data only; add sql dummy data; filter by user
// done - send pr data in
// done: use pr exercises as categories
// TODO: use prData for leaderboard data

// need to get 
export default function Leaderboard({allPRs}) {
    // extract username from here?
    console.log("allprs: ", allPRs)
    // const leaderboardData = useApp((state) => state.leaderboardData)

    const [selectedCategory, setSelectedCategory] = useState(allPRs[0]["exerciseName"]) 
    const recordCategories = allPRs.map((item) => item.exerciseName)
    
    const categoryDropdownContent = recordCategories.map((item) => {
        return <option key={item} value={item}>{item.split('_').join(' ')}</option>
    })

    const categoryDropdown = (
        <label className="min-w-full flex items-center justify-center">
            <select
            onChange={handleInput}
            name='selectedCategory'
            value={selectedCategory || ""}
            className="w-9/12 text-center border p-2 mx-2 my-2 text-black"
            >
              { categoryDropdownContent }
            </select>
          </label>
    )
    // todo filter order for highest in particular lift

    function handleInput(event) {
        setSelectedCategory(event.target.value)
    }


    let sortedLeaderboard = allPRs.filter(pr => pr.exerciseName === selectedCategory)
    sortedLeaderboard.sort((a, b) => {
            const aValue = parseFloat(a.maxResult);
            const bValue = parseFloat(b.maxResult);
          
            // If aValue is null or undefined, always move it down
            // If bValue is null or undefined, always move it down unless aValue is also null or undefined
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;
          
            // If neither value is null or undefined, compare as normal
            return bValue - aValue;
          });

    // let sortedLeaderboard = [...allPRs].sort((a, b) => {
    //     const aValue = a.personal_records[selectedCategory];
    //     const bValue = b.personal_records[selectedCategory];
      
    //     // If aValue is null or undefined, always move it down
    //     // If bValue is null or undefined, always move it down unless aValue is also null or undefined
    //     if (aValue === null || aValue === undefined) return 1;
    //     if (bValue === null || bValue === undefined) return -1;
      
    //     // If neither value is null or undefined, compare as normal
    //     return bValue - aValue;
    //   });

// need to change on dropdown between pr's
    return (
      <>
        <div className="form-control" >
            {categoryDropdown}
        </div>
        {/* bg-[#111B1D] [#D6D6D6] drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]*/}
      <div  className="min-h-screen bg-[#111B1D]">
        {/* Title  move to own component or function above*/}
        <div className='grid-cols-3 flex justify-between max-w-full text-2xl font-bold text-[#D6D6D6]'>
            <div className='col-span-1 col-start-1 mx-10'>
                Rank 
            </div>
            <div className='col-span-1 col-start-2 text-left'>
                Name
            </div>
            <div className='mx-10'>
                Result
            </div>
        </div>
        <ul>
            {sortedLeaderboard.map((item, index) => {
                return (
                    <>
                    <li key={item.name}>
                        <LeaderboardCard 
                            key={item.id}
                            rank={index+1}
                            name={item.name} 
                            weightLifted_kg={item.maxResult}

                        /> 

                    </li>
                    </>
                )
            })}
        </ul>
      {/* rank=1, name='Ian Shaw', weightLifted_kg=110, image=null */}
      </div>
      </>
    )
  }