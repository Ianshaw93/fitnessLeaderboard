'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { usePathname  } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import ContactModal from './ContactModal'

// TODO: add contact icon to top right
// should be in inline with user icon
export default function Navbar() {
    const pathname = usePathname()
    const gold = 'bg-[#E9DC88]'
    // const gold = 'bg-[#BB0A21]'
    const unselected = 'bg-[#949797]'
    
    // make bottom of page navbar
    {/* <FontAwesomeIcon icon={faDumbbell} /> */}
    return (
      <>
        <div className='bg-[#DADEDF] col-span-2 flex justify-between px-2 pt-2'>
            <div>
                <UserButton />
            </div>
                <ContactModal />
        </div>
        {/*  border border-gray-200 */}
        <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-opacity-0 rounded-full bottom-4 left-1/2">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
            <Link href={'/'} className="flex items-center justify-center">
                <div className={`p-2.5 w-10 h-10 items-center fixed inline-block rounded-full ${pathname === '/' ? gold : unselected}`}>
                    <button>
                    {/* <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"> */}
                        {/* <svg> */}
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z"/>
                        </svg>
                        <span className="sr-only">Home</span>
                    </button>
                </div>
                <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Home
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </Link>
                <div className="flex items-center justify-center">
                    <Link href={'/workout'} className="flex items-center justify-center">
                        <div className={`p-2.5 w-10 h-10 ml-1 items-center fixed inline-block rounded-full ${pathname.startsWith('/workout') ? gold : unselected}`}>
                            <button>
                            {/* <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"> */}
                                <svg className="w-4 h-4 ml-0.5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                </svg>
                                <span className="sr-only">New item</span>
                            </button>
                        </div>
                    </Link>
                </div>
                <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Create new item
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link href={'/profile'} className="flex items-center justify-center">
                    <div className={`p-2.5 w-10 h-10 items-center fixed inline-block rounded-full ${pathname.startsWith('/profile') ? gold : unselected}`}>
                        <button>
                        {/* <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group"> */}
                            <svg className='w-5 h-5 text-black' fill="currentColor">
                            {/* <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> */}
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <span className="sr-only">Profile</span>
                        </button>
                    </div>
                </Link>
                <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Profile
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>

      </>
    )
  }