'use client';

import { Toast } from 'flowbite-react';

export default function Colors({type="success", message="Exercise Added Successfully."}) {

  return (
    <div className="fixed bottom-20 right-4">
      <Toast>
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${type == "success" ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200" : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"}`}>
          {/* <HiCheck className="h-5 w-5" /> */}
          <i className="fa fa-check" aria-hidden="true"></i>
        </div>
        <div className="ml-3 text-sm font-normal">
          {message}
        </div>
        <Toast.Toggle />
      </Toast> 
    </div>
  )
}


