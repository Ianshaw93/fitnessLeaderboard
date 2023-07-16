import { create } from 'zustand'
import {
    dummyLeaderboard, 
    dummyWorkoutLog
  } from '../app/data/mockData'

const useApp = create((set) => {
    return {
        leaderboardData: dummyLeaderboard,
        workoutLogData: dummyWorkoutLog,
        
        setLeaderboardData: (newState) => set(() => ({
            leaderboardData: newState
        })),

        setWorkoutLogData: (newState) => set(() => ({
            workoutLogData: newState
        }))
    }
})

export default useApp