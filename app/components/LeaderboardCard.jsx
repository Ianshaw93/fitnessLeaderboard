import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'

export default function LeaderboardCard({rank=1, name='Ian Shaw', weightLifted_kg=110, image=null}) {
    // image default if null
    // rank, athlete (image + name); result
    return (
      <>
      <div className="rounded-xl bg-white px-5 py-1 mb-3 shadow-lg shadow-gray-600 grid grid-cols-3 mx-5 max-w-full text-black">
      
      <div className="col-span-1 mt-3 text-xl capitalize font-bold">
        {rank}
      </div>
      <div className="col-span-2 flex justify-between max-w-full" >
        <div className='flex items-center'>

            <div className="w-11 rounded-full flex justify-center items-center">
                <FontAwesomeIcon icon={faCircleUser} size='3x' color='grey'/>
            </div>  
            <h2 className="mx-5 text-xl">{name}</h2>
            {/* </div> */}
        </div>
        <div className="col-start-3 col-span-1 mt-3" >
          <h2 className="row-span-1 text-right font-bold ">{weightLifted_kg ? weightLifted_kg + "kg" : "n/a"}</h2>
        </div>
      </div>
    </div>
      </>
    )
  }