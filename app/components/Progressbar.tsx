// TODO: have pr; compare to strengthLevels
// show progress for kg to next level
// if no lift show novice

import {maleStrengthLevels} from '../data/mockData'

export default function Progressbar({exerciseName, pr}) {
    // filter data for exerciseName
    const exerciseLevels = maleStrengthLevels.filter(item => item.exerciseName === exerciseName)[0]['weightLevels']
    // find minLevel and maxLevel -> if pr == zero use novice
    let minLevel = 0
    let maxLevel = 0
    if (pr < exerciseLevels['Beginner']) {
        maxLevel = exerciseLevels['Beginner']
    } else if (pr < exerciseLevels['Novice']) { 
        minLevel = exerciseLevels['Beginner']
        maxLevel = exerciseLevels['Novice']
    } else if (pr < exerciseLevels['Intermediate']) { 
        minLevel = exerciseLevels['Novice']
        maxLevel = exerciseLevels['Intermediate']
    } else if (pr < exerciseLevels['Advanced']) { 
        minLevel = exerciseLevels['Intermediate']
        maxLevel = exerciseLevels['Advanced']
    } else if (pr < exerciseLevels['Elite']) { 
        minLevel = exerciseLevels['Advanced']
        maxLevel = exerciseLevels['Elite']
    }
    let progression = (pr - minLevel) / (maxLevel - minLevel) * 100
    console.log("progression: ", progression)
    // find progress % to next level
    return(
        <>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progression}%`}}></div>
        </div>
        </>
    )
}
