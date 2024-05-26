/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react'
import { useSelectImage } from '@renderer/store/select'
import image1 from '@renderer/assets/picasso.jpg'
import image2 from '@renderer/assets/pablo-picasso-girl-before-mirror-painting.jpg'
import image3 from '@renderer/assets/416340982_693397359293930_961719832477421389_n.png'

/**
 * UploadStyleImage component allows users to select a predefined style image,
 * upload an image by dragging and dropping, or by selecting it via a file input.
 * The selected style image is then set for use in the application.
 *
 * @component
 * @example
 * return (
 *   <UploadStyleImage />
 * )
 */
const UploadStyleImage: React.FC = () => {
  // Hook to manage the selected style image state
  const { setSelectedStyleImage } = useSelectImage()

  // State to manage the drag-over effect
  const [dragOver, setDragOver] = useState(false)

  // State to manage the active (selected) predefined image index
  const [activeIndex, setActiveIndex] = useState(0)

  // Ref to access the file input element
  const fileInput = useRef<HTMLInputElement>(null)

  // List of predefined images
  const images = [
    { id: 1, src: image1 },
    { id: 2, src: image2 },
    { id: 3, src: image3 }
  ]

  /**
   * onDrop function handles the drop event.
   * It prevents the default behavior, resets the dragOver state, and processes the dropped files.
   *
   * @param e - The drag event object.
   */
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)

    droppedFiles.forEach((droppedFile: any) => {
      handleFileRead(droppedFile)
    })
  }

  /**
   * handleFileInputChange function handles the file input change event.
   * It processes the selected file.
   *
   * @param e - The change event object from the file input.
   */
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      handleFileRead(selectedFile)
    }
  }

  /**
   * handleFileRead function processes the selected file or URL.
   * If a URL is provided, it fetches the image data from the URL.
   * It sets the selected style image state.
   *
   * @param fileOrUrl - The selected file object or URL string.
   */
  const handleFileRead = async (fileOrUrl: File | string) => {
    let imageData: File | null = null

    if (typeof fileOrUrl === 'string') {
      // If it's a string, it's a URL, not a File
      try {
        const response = await fetch(fileOrUrl)
        const blob = await response.blob()
        imageData = new File([blob], 'image.png', { type: 'image/png' }) // Adjust the file name and type as needed
      } catch (error) {
        console.error('Error fetching image data:', error)
      }
    } else {
      // It's a File object
      imageData = fileOrUrl
    }

    setSelectedStyleImage(imageData)
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Predefined images */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => (
          <button
            onClick={() => {
              handleFileRead(image.src)
              setActiveIndex(image.id)
            }}
            key={image.id}
            className="col-span-1"
          >
            <img
              src={image.src}
              alt="style"
              className={`w-24 h-24 object-cover rounded-lg ${activeIndex === image.id && 'border-2 border-blue-600'}`}
            />
          </button>
        ))}
      </div>
      <div
        className={`text-center w-full rounded-xl text-white ${dragOver ? 'dragover' : ''}`}
        onDrop={onDrop}
      >
        <label className="flex flex-col gap-4" onDragOver={(e) => e.preventDefault()}>
          <input
            type="file"
            name="file"
            ref={fileInput}
            className="opacity-0 text-xs pointer-events-none"
            id="file"
            onChange={handleFileInputChange}
          />

          <div className="flex gap-2 items-center">
            <div className="w-full h-[1px] bg-zinc-400" />
            <p>or</p>
            <div className="w-full h-[1px] bg-zinc-400" />
          </div>

          <button
            className={`px-5 py-2 rounded-full text-xs font-bold bg-white text-blue-600`}
            onClick={() => fileInput.current?.click()}
          >
            Upload Style Image
          </button>
        </label>
      </div>
    </div>
  )
}

export default UploadStyleImage
