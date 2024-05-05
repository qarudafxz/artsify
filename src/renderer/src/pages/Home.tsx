/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import React from 'react'

import { Navbar,SidePanel, ImageLoader } from '@renderer/components/index'

const Home:React.FC = () => {
  return (
    <div className='px-12 bg-zinc-900 w-full h-screen overflow-hidden'>
     <Navbar />
     <div className="grid grid-cols-8">
      <div className="col-span-2">
       <SidePanel />
      </div>
      <div className="col-span-6">
        <ImageLoader />
       </div>
     </div>
    </div>
  )
}

export default Home