// TODO: have pr; compare to strengthLevels
// show progress for kg to next level
// if no lift show novice
'use client'
// later have serverside version for profile page
import { useEffect, useState } from "react";

export default function Progressbar({progression: initialProgression, minLevel, maxLevel, pr}) {
    const [progression, setProgression] = useState(initialProgression);

    useEffect(() => {
        // send in badge
        // check if new badge > prev badge
        // animate => 100% 
        // start from 0
        //  repeat for number of badges difference
        setProgression(initialProgression);
    }, [pr, initialProgression]);

    let lowProgression = false
    let highProgression = false
    if (progression < 20) {
        lowProgression = true
    }
    if (progression > 85) { 
        highProgression = true
    }
    pr = (Number(pr)).toFixed(0)
    return(
        <>
        {/* have smaller text for mobile */}
        <div className="relative w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-2000 ease-in-out" style={{ width: `${progression}%` }}></div>
            <div className='flex justify-between mt-1 '>
                {/* if pr close to levels, don't show levels  - if progression close to 0->15% or 85->100%*/}
                <span 
                    className={lowProgression ? "opacity-0" : ""}
                    style={{transform: 'translateX(-40%)'}}
                >{minLevel}kg</span>
                <span 
                    className={highProgression ? "opacity-0" : ""}
                    style={{transform: 'translateX(40%)'}}
                >{maxLevel}kg</span>
            </div>
            <div 
                className="absolute top-full mt-1 font-bold text-center" 
                style={{ left: `calc(${progression}%)`, transform: 'translateX(-40%)' }}
            >
                {pr}kg
            </div>
        </div>
        </>
    )
}
