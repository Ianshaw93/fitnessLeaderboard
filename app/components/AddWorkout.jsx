'use client'
import { useState } from 'react'
import {dummyLeaderboard} from '../data/mockData'

export default function AddWorkout() {

  const [selectedCategory, setSelectedCategory] = useState("barbell_back_squat")
  const recordCategories = Object.keys(dummyLeaderboard[0]['personal_records'])
  const [productTotal, setProductTotal] = useState(0)


  const categoryDropdownContent = recordCategories.map((item) => {
    return <option key={item} value={item}>{item.split('_').join(' ')}</option>
})

const categoryDropdown = (
    <label className="min-w-full flex items-center justify-center">
        <select
        onChange={handleInput}
        name='selectedCategory'
        value={selectedCategory || ""}
        className="w-9/12 text-center border p-2 mx-2 my-2"
        >
          { categoryDropdownContent }
        </select>
      </label>
) 

  function handleInput(event) {
    setSelectedCategory(event.target.value)
  }

  function handleClick(event) {
    console.log(event.target.name)
    if (event.target.name == "increment") {
      setProductTotal(productTotal + 1)
      // setBasketItems([...basketItems, product.name])
    } else if (productTotal > 0) {
      // removeProduct(product.name)
      setProductTotal(productTotal - 1)
    }
  }
    return (
      <>
        <div  className="min-h-screen bg-[#DED1BF]">
          <div className='col-span-2 mt-3 py-2 text-5xl capitalize font-thin text-gray-500'>

            Add Activity:
            <div className="rounded-xl bg-white px-5 py-1 mb-3 shadow-lg shadow-gray-600 grid grid-cols-2 mx-auto max-w-full">
            <div className='flex justify-center'>
              Activity: 
              <div className="form-control " >
                  {categoryDropdown}
              </div>
            </div>
            Weight: test
            <div className='flex justify-center'>
              Test
              {/* TODO: have hard coded width of buttons in pixels etc */}
              <button className="btn btn-lg" onClick={(event) => handleClick(event)} name="decrement">-</button>
              <div className='btn btn-lg bg-white text-black hover:bg-white'>{productTotal}</div>
              <button className="btn btn-lg" onClick={handleClick} name="increment">+</button>
            </div>
          </div>
            </div>
        </div>
                  {/* plus / minus and total buttons */}
      </>
    )
  }