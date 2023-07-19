import { create } from 'zustand'
import {
    dummyLeaderboard, 
    dummyWorkoutLog
  } from '../app/data/mockData'

const useApp = create((set) => {
    return {
        leaderboardData: dummyLeaderboard,
        workoutLogData: dummyWorkoutLog,
        currentUser: {
            "firstName": null,
            "lastName": null,
            "id": null
        },
        
        setLeaderboardData: (newState) => set(() => ({
            leaderboardData: newState
        })),

        setWorkoutLogData: (newState) => set(() => ({
            workoutLogData: newState
        })),

        setCurrentUser: (newState) => {
            set(() => ({
            currentUser: newState
            }))
            // perhaps replace with api call to db?
            set((state) => {
                let userLog = state.leaderboardData.find(element => element.id=== newState.id)
                if (!userLog || userLog.length === 0) {
                    let initialEntry = {
                                        "id": newState.id, 
                                        "name": `${newState.firstName} ${newState.lastName}`,
                                        // later map through exercises
                                        "personal_records": { 
                                            "barbell_back_squat": null,
                                            "barbell_chest_press": null,
                                            "barbell_power_clean": null
                                            }
                                        }
                    return {
                        leaderboardData: [...state.leaderboardData, initialEntry]
                    }
                }
            })
        }
    }
})

export default useApp