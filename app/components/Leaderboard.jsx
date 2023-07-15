import LeaderboardCard from './LeaderboardCard'

export default function Leaderboard() {
    const dummyLeaderboard = [{
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
    return (
      <>
      <div  className="min-h-screen bg-[#DED1BF]">

        <LeaderboardCard />
      {/* Leaderboard */}
      </div>
      </>
    )
  }