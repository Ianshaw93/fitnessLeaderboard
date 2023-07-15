"use client"
import { useState } from 'react'
import LeaderboardCard from './LeaderboardCard'

const dummyLeaderboard = [
    {
    "id": "0000", 
    "name": "user1",
    "personal_records": { // should be accessible in both lbs and kgs
        "barbell_back_squat": 110,
        "barbell_chest_press": 80,
        "barbell_power_clean": 80
    }
},
{
    "id": "0001", 
    "name": "user2",
    "personal_records": { 
        "barbell_back_squat": 90,
        "barbell_chest_press": 100,
        "barbell_power_clean": null
    }        
}
]
export default function Leaderboard() {

    const [selectedCategory, setSelectedCategory] = useState("barbell_back_squat")
    const recordCategories = Object.keys(dummyLeaderboard[0]['personal_records'])

    
    const categoryDropdownContent = recordCategories.map((item) => {
        return <option key={item} value={item}>{item}</option>
    })

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
    // todo filter order for highest in particular lift

    function handleInput(event) {
        setSelectedCategory(event.target.value)
    }

// need to change on dropdown between pr's
    return (
      <>
        <div className="form-control" >
            {categoryDropdown}
        </div>
      <div  className="min-h-screen bg-[#DED1BF]">
        {/* Title  move to own component or function above*/}
        <div className='grid-cols-3 flex justify-between max-w-full text-2xl font-bold'>
            <div className='col-span-1 col-start-1 mx-5'>
                Rank
            </div>
            <div className='col-span-1 col-start-2 text-left'>
                Name
            </div>
            <div className='mx-5'>
                Result
            </div>
        </div>
        <ul>
            {dummyLeaderboard.map((item, index) => {
                return (
                    <>
                    <li>
                        <LeaderboardCard 
                            key={item.id}
                            rank={index+1}
                            name={item.name}
                            weightLifted_kg={item.personal_records[selectedCategory]}

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