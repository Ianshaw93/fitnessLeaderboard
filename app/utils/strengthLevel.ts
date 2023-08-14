import {maleStrengthLevels} from '../data/mockData'

export default function calcStrengthLevel(pr: number, exerciseName: string) {
    const exerciseLevels = maleStrengthLevels.filter(item => item.exerciseName === exerciseName)[0]['weightLevels']
    // find minLevel and maxLevel -> if pr == zero use novice
    let minLevel = 0
    let maxLevel = 0
    let currentLevel = 'Newbie'
    if (pr < exerciseLevels['Beginner']) {
        maxLevel = exerciseLevels['Beginner']
    } else if (pr < exerciseLevels['Novice']) { 
        currentLevel = 'Beginner'
        minLevel = exerciseLevels[currentLevel]
        maxLevel = exerciseLevels['Novice']
    } else if (pr < exerciseLevels['Intermediate']) { 
        currentLevel = 'Novice'
        minLevel = exerciseLevels[currentLevel]
        maxLevel = exerciseLevels['Intermediate']
    } else if (pr < exerciseLevels['Advanced']) { 
        currentLevel = 'Intermediate'
        minLevel = exerciseLevels[currentLevel]
        maxLevel = exerciseLevels['Advanced']
    } else if (pr < exerciseLevels['Elite']) { 
        currentLevel = 'Advanced'
        minLevel = exerciseLevels[currentLevel]
        maxLevel = exerciseLevels['Elite']
    }
    let progression = (pr - minLevel) / (maxLevel - minLevel) * 100
    console.log("progression: ", progression)

    return {progression, currentLevel, minLevel, maxLevel}

}

