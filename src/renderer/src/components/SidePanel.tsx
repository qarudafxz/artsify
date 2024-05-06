/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelectImage } from '@renderer/store/select'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import UploadContentImage from './UploadContentImage'
import UploadStyleImage from './UploadStyleImage'
import { toast, Toaster } from 'sonner'

const SidePanel: React.FC = () => {
  const [numOfSteps, setNumOfSteps] = useState<number>(100)
  const [styleWeight, setStyleWeight] = useState<number>(1000)
  const { selectedImage, selectedStyleImage, setImageResult } = useSelectImage()

  const artsify = async () => {
    if (!selectedImage || !selectedStyleImage) {
      toast.error('Please upload an image and select a style image')
      return
    }

    try {
      toast.loading('Processing Image, Please wait...')
      const formData = new FormData()
      formData.append('input_image', selectedImage)
      formData.append('style_image', selectedStyleImage)

      // formData.append('numOfSteps', numOfSteps.toString())
      // formData.append('styleWeight', styleWeight.toString())
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Error processing the image')
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)

      toast.dismiss()
      toast.success('Image Processed Successfully')
      setImageResult(imageUrl)
    } catch (err) {
      console.error(err)
      toast.dismiss()
      toast.error('Error processing image')
    }
  }

  const handleNumOfSteps = (_event: Event, val: number | number[]) => {
    setNumOfSteps(val as number)
  }

  const handleStyleWeight = (_event: Event, val: number | number[]) => {
    setStyleWeight(val as number)
  }

  return (
    <div className="w-full h-full border-r pr-4 border-zinc-600 py-4">
      <Toaster richColors position="top-center" />
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="font-bold text-white text-md">
          Upload your Image to <span className="text-blue-600">transform</span>
        </h1>
        <UploadContentImage />
        <div className="w-full h-[1px] bg-zinc-600" />
        <h1 className="font-bold text-white text-md text-center">
          Upload or Select the style you want to use to transform{' '}
          <span className="text-blue-600">image</span>
        </h1>
        <UploadStyleImage />
      </div>
      <div className="flex gap-4 items-center w-full mt-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-white">Number of steps</h1>
          <Box sx={{ width: 150 }}>
            <Slider
              value={numOfSteps}
              onChange={handleNumOfSteps}
              min={100}
              max={700}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-white">Style Weight</h1>
          <Box sx={{ width: 150 }}>
            <Slider
              value={styleWeight}
              onChange={handleStyleWeight}
              min={1000}
              max={1000000}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-lg p-4 flex flex-col justify-center items-center mt-2 absolute w-[240px] bottom-10 right-10">
        <button
          onClick={artsify}
          className="font-bold text-md py-2 bg-blue-600 text-white text-center w-full rounded-full"
        >
          ✨ Artsify
        </button>
      </div>
    </div>
  )
}

export default SidePanel
