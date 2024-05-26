/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelectImage } from '@renderer/store/select'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import UploadContentImage from './UploadContentImage'
import UploadStyleImage from './UploadStyleImage'
import { toast, Toaster } from 'sonner'

/**
 * SidePanel component provides a UI for uploading an image and a style image,
 * setting parameters for image processing, and triggering the image transformation process.
 *
 * @component
 * @example
 * return (
 *   <SidePanel />
 * )
 */
const SidePanel: React.FC = () => {
  // State to manage the number of steps for the image transformation
  const [numOfSteps, setNumOfSteps] = useState<number>(100)

  // State to manage the style weight for the image transformation
  const [styleWeight, setStyleWeight] = useState<number>(1000)

  // Custom hook to select images and set the resulting image
  const { selectedImage, selectedStyleImage, setImageResult } = useSelectImage()

  /**
   * artsify function is triggered when the "Artsify" button is clicked.
   * It checks if both the content and style images are selected,
   * then sends these images along with the parameters to the server for processing.
   * Displays appropriate toast notifications based on the process outcome.
   */
  const artsify = async () => {
    // Check if both images are selected
    if (!selectedImage || !selectedStyleImage) {
      toast.error('Please upload an image and select a style image')
      return
    }

    try {
      // Notify the user that the image is being processed
      toast.loading('Processing Image, Please wait...')

      // Create a FormData object to send the images and parameters to the server
      const formData = new FormData()
      formData.append('input_image', selectedImage)
      formData.append('style_image', selectedStyleImage)
      formData.append('numOfSteps', numOfSteps.toString())
      formData.append('styleWeight', styleWeight.toString())

      // Send a POST request to the server
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        body: formData
      })

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Error processing the image')
      }

      // Convert the response to a blob and create a URL for the resulting image
      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)

      // Notify the user of the success and update the resulting image
      toast.dismiss()
      toast.success('Image Processed Successfully')
      setImageResult(imageUrl)
    } catch (err) {
      console.error(err)
      toast.dismiss()
      toast.error('Error processing image')
    }
  }

  /**
   * handleNumOfSteps function updates the number of steps for the image transformation.
   *
   * @param _event - The event object from the Slider component.
   * @param val - The new value for the number of steps.
   */
  const handleNumOfSteps = (_event: Event, val: number | number[]) => {
    setNumOfSteps(val as number)
  }

  /**
   * handleStyleWeight function updates the style weight for the image transformation.
   *
   * @param _event - The event object from the Slider component.
   * @param val - The new value for the style weight.
   */
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
