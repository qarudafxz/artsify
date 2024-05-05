/* eslint-disable prettier/prettier */
import React from 'react'

const Navbar:React.FC = () => {
  return (
    <div className='flex justify-between items-center py-4 border-b border-zinc-700'>
     <h1 className='font-bold text-xl text-white'>Artsify<span className='text-blue-600'>.</span></h1>
    </div>
  )
}

export default Navbar