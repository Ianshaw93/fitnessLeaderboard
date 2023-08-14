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
        <div>

        Lvl: {currentLevel}
        </div>
      </div>
      <div className='my-2 mb-7'>
        <Progressbar pr={weightLifted_kg} progression={progression} minLevel={minLevel} maxLevel={maxLevel}/>

      </div>
    </div>
      </>
    )
  }