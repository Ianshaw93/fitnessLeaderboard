// TODO: have pr; compare to strengthLevels
// show progress for kg to next level
// if no lift show novice

export default function Progressbar({progression, minLevel, maxLevel, pr}) {
    let lowProgression = false
    let highProgression = false
    if (progression < 20) {
        lowProgression = true
    }
    if (progression > 85) { 
        highProgression = true
    }
    pr = (Number(pr)).toFixed(2)
    return(
        <>
        {/* have smaller text for mobile */}
        <div className="relative w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progression}%` }}></div>
            <div className='flex justify-between mt-1'>
                {/* if pr close to levels, don't show levels  - if progression close to 0->15% or 85->100%*/}
                <span className={lowProgression ? "opacity-0" : ""}>{minLevel}kg</span>
                <span className={highProgression ? "opacity-0" : ""}>{maxLevel}kg</span>
            </div>
            <div 
                className="absolute top-full mt-1 font-bold text-center" 
                style={{ left: `calc(${progression}%)`, transform: 'translateX(-50%)' }}
            >
                {pr}kg
            </div>
        </div>
        </>
    )
}
