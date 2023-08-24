import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import * as Avatar from '@radix-ui/react-avatar';


export default function LeaderboardCard({rank=1, name='Ian Shaw', weightLifted_kg=110, image=null}) {
    // image default if null
    // rank, athlete (image + name); result
    const initials = name.split(' ').map((n) => n[0]).join('')
    // const shortName = name.slice(0, 14)
    const shortName = name
    return (
      <>
      <div className="rounded-xl bg-white py-1 mb-3 shadow-lg shadow-gray-600 grid grid-cols-3 mx-5 max-w-full text-black">
      
      <div className="col-span-1 mt-3 text-xl capitalize font-bold px-5">
        {rank}
      </div>
      <div className="col-span-2 flex justify-between max-w-full" >
        <div className='flex justify-between mt-2'>
            {/* <div className="w-11 rounded-full flex justify-center items-center"> */}
          <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden w-7 h-7 rounded-full bg-black bg-opacity-30">
            {/* <Avatar.Image
              className="w-full h-full object-cover rounded-full"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
            /> */}
            <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-100 text-base leading-none font-semibold" delayMs={600}>
              {initials}
            </Avatar.Fallback>
          </Avatar.Root>
                {/* <FontAwesomeIcon icon={faCircleUser} size='3x' color='grey'/> */}
            {/* </div>   */}
          <h2 className="text-xl mr-1 ">{shortName}</h2>
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