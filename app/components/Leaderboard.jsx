"use client"
import { useState } from 'react'
import LeaderboardCard from './LeaderboardCard'
import Tab from './Tab'

// TODO: have avatar icons; with fallback to initials
// TODO: filter pr's by group and it's members
export default function Leaderboard({allPRs, groupMembers=null, groupName=null}) {
    console.log("allprs: ", allPRs)
    // filter all prs by groupMembers
    if (groupMembers) {

        allPRs = allPRs.filter(pr => groupMembers.includes(pr.userId))
    }
    // if group is null, then show all prs
    const [selectedCategory, setSelectedCategory] = useState(allPRs[0]["exerciseName"]) 
    const recordCategories = [...new Set(allPRs.map((item) => item.exerciseName))]
    
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

    console.log("sortedLeaderboard: ", sortedLeaderboard)
    return (
        
        // bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600
      <>
        <div className="form-control bg-[#DADEDF]" >
            {categoryDropdown}
        </div>
        {/* bg-[#111B1D] [#D6D6D6] drop-shadow-[0_1.2px_1.2px_rgba(0,0,2)]*/}
      <div  className="min-h-screen bg-gradient-to-t from-gray-600 via-gray-400 to-gray-600">
        {/* Title  move to own component or function above*/}
        <div className='grid-cols-3 flex justify-between max-w-full text-2xl font-thin text-[#D6D6D6] drop-shadow-[0_4px_4px_rgba(0,0,0)]'>
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
                console.log("item: ", item, index)
                return (
                    <>
                    <li key={item.firstName} className={(sortedLeaderboard.length > 5 && index === sortedLeaderboard.length - 1) ? "pb-20" : ""}>
                        <LeaderboardCard 
                            key={item.id}
                            rank={index+1}
                            name={item.firstName + " " + item.surname} 
                            weightLifted_kg={item.maxResult}

                        /> 

                    </li>
                    </>
                )
            })}
        </ul>
      </div>
      </>
    )
  }