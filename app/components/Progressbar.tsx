// TODO: have pr; compare to strengthLevels
// show progress for kg to next level
// if no lift show novice
'use client'
// later have serverside version for profile page
import { useEffect, useState } from "react";
import {maleStrengthLevels} from '../data/mockData'

export default function Progressbar({progression: initialProgression, minLevel, maxLevel, pr, levelName}) {
    const [progression, setProgression] = useState(initialProgression);
    const levelNames = Object.keys(maleStrengthLevels[0]['weightLevels'])
    // console.log("levelNames: ", levelNames)
    const [currentLevelIndex, setCurrentLevelIndex] = useState(levelNames.indexOf(levelName));
    // get standard array with

    const [animationPhase, setAnimationPhase] = useState('initial');

    useEffect(() => {
        if (currentLevelIndex < levelNames.indexOf(levelName)) {
            setAnimationPhase('to100');
        } else {
            setProgression(initialProgression);
        }
    }, [pr, initialProgression, levelName, levelNames, currentLevelIndex]);

    const delayedStateUpdate = (stateUpdater, delay) => {
        setTimeout(stateUpdater, delay);
    };

    useEffect(() => {
        if (animationPhase === 'to100') {
            setProgression(100);
            // delayedStateUpdate(() => setProgression(100), 1000);
            delayedStateUpdate(() => setAnimationPhase('to0'), 4000);
        } else if (animationPhase === 'to0') {
            setProgression(0);
            delayedStateUpdate(() => setAnimationPhase('toProgress'), 4000);
        } else if (animationPhase === 'toProgress') {
            setProgression(initialProgression);
            delayedStateUpdate(() => setAnimationPhase('initial'), 4000);
        }
    }, [animationPhase, initialProgression]);

    const handleTransitionEnd = () => {
        switch (animationPhase) {
            case 'to100':
                setAnimationPhase('to0');
                break;
            case 'to0':
                setCurrentLevelIndex(currentLevelIndex + 1);
                setAnimationPhase('toProgress');
                break;
            case 'toProgress':
                setAnimationPhase('initial');
                break;
            default:
                break;
        }
    };

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
            <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-4000 ease-in-out" 
            style={{ width: `${progression}%` }}
            onTransitionEnd={handleTransitionEnd}
            >

            </div>
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
