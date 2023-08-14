import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import Progressbar from './Progressbar'
import calcStrengthLevel from '../utils/strengthLevel'

export default function ProgressCard({weightLifted_kg=110, exerciseName='Barbell Back Squat'}) {
    // image default if null
    // rank, athlete (image + name); result
    const {progression, currentLevel, minLevel, maxLevel} = calcStrengthLevel(weightLifted_kg, exerciseName)
    return (
      <>
      <div className="rounded-xl bg-white px-5 py-1 mb-3 shadow-lg shadow-gray-600 grid mx-5 max-w-full text-black">
      
      <div className="flex  justify-between mt-3 text-xl capitalize font-bold">
        {/* change to row 1 */}
        <div>

            {exerciseName}
        </div>
        <div className='pl-2' >

        Lvl: 
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{currentLevel}</span>
        </div>
      </div>
      <div className='my-2 mb-7'>
        <Progressbar pr={weightLifted_kg} progression={progression} minLevel={minLevel} maxLevel={maxLevel}/>

      </div>
    </div>
      </>
    )
  }