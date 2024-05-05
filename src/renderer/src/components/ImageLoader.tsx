/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelectImage } from '@renderer/store/select'

const ImageLoader: React.FC = () => {
  const { imageResult } = useSelectImage()
  return (
    <div className='w-full h-screen grid place-items-center jusify-center'>
      {imageResult && (
       <img src={imageResult} alt='result' className='w-96 h-96 object-contain' />
      )}
    </div>
  )
}

export default ImageLoader