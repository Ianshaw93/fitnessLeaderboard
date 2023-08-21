import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'

export default function LeaderboardCard({rank=1, name='Ian Shaw', weightLifted_kg=110, image=null}) {
    // image default if null
    // rank, athlete (image + name); result
    return (
      <>
      <div className="rounded-xl bg-white py-1 mb-3 shadow-lg shadow-gray-600 grid grid-cols-3 mx-5 max-w-full text-black">
      
      <div className="col-span-1 mt-3 text-xl capitalize font-bold px-5">
        {rank}
      </div>
      <div className="col-span-2 flex justify-between max-w-full" >
        <div className='flex items-start'>

            {/* <div className="w-11 rounded-full flex justify-center items-center">
                <FontAwesomeIcon icon={faCircleUser} size='3x' color='grey'/>
            </div>   */}
            <h2 className="text-xl mr-5">{name}</h2>
            {/* </div> */}
        </div>
        <div className="col-start-3 col-span-1 mt-3 px-2" >
          <h2 className="row-span-1 text-right font-bold ">{parseFloat(weightLifted_kg).toFixed(0)}kg</h2>
        </div>
      </div>
    </div>
      </>
    )
  }