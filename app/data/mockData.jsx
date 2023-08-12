export const maleStrengthLevels = [
    {
        "exerciseName": "Barbell Shoulder Press",
        "weightLevels": {
            "Beginner": 31,
            "Novice": 46,
            "Intermediate": 64,
            "Advanced": 86,
            "Elite": 109
        }
    },
    {
        "exerciseName": "Barbell Back Squat",
        "weightLevels": {
            "Beginner": 64,
            "Novice": 93,
            "Intermediate": 130,
            "Advanced": 173,
            "Elite": 219
        }
    },
    {
        "exerciseName": "Barbell Bentover Rows",
        "weightLevels": {
            "Beginner": 41,
            "Novice": 60,
            "Intermediate": 85,
            "Advanced": 115,
            "Elite": 147
        }
    },
    {
        "exerciseName": "Barbell Power Cleans",
        "weightLevels": {
            "Beginner": 46,
            "Novice": 67,
            "Intermediate": 92,
            "Advanced": 121,
            "Elite": 152
        }
    },
    {
        "exerciseName": "Barbell Romanian Deadlift",
        "weightLevels": {
            "Beginner": 55,
            "Novice": 84,
            "Intermediate": 120,
            "Advanced": 164,
            "Elite": 211
        }
    },
    {
        "exerciseName": "Barbell Chest Press",
        "weightLevels": {
            "Beginner": 32,
            "Novice": 57,
            "Intermediate": 90,
            "Advanced": 131,
            "Elite": 177
        }
    },
    {
        "exerciseName": "Barbell Front Squat",
        // just copied the back squat values for now
        "weightLevels": {
            "Beginner": 64,
            "Novice": 93,
            "Intermediate": 130,
            "Advanced": 173,
            "Elite": 219
        }
    }
]


export const dummyLeaderboard = [
    {
    "id": "0000", 
    "name": "user1",
    "personal_records": { 
        "Barbell Back Squat": 110,
        "barbell_back_squat": 110,
        "barbell_chest_press": 80,
        "barbell_power_clean": 80
    }
},
{
    "id": "0001", 
    "name": "user2",
    "personal_records": {
        "Barbell Back Squat": 79, 
        "barbell_back_squat": 90,
        "barbell_chest_press": 100,
        "barbell_power_clean": null
    }        
},
{
    "id": "0003", 
    "name": "user3",
    "personal_records": { 
        "Barbell Back Squat": 84,
        "barbell_back_squat": 90,
        "barbell_chest_press": 100,
        "barbell_power_clean": null
    }        
}
]

export const dummyWorkoutLog = [
    {
        "id": "0000",
        "log": [
            // // group by date or timecode?
            // {
            //     "timeCode": {},
            //     "entries": [
            //         {
            //             "activity": {},
            //             "result": {},
            //             "sets": {},
            //             "reps": {}
            //             // later include reps and sets
            //         },
            //         {
            //             "activity": {},
            //             "result": {},
            //             "sets": {},
            //             "reps": {}
            //         },
            //     ]

            // }
        ]         
    },
    {
        "id": "0001",
        "log": []
    }
]