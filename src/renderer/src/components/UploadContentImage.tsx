/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react'
import { useSelectImage } from '@renderer/store/select'
import { PiImageFill } from 'react-icons/pi'

/**
 * UploadContentImage component allows users to upload an image either by
 * dragging and dropping the image file or by selecting it via a file input.
 * It provides a visual feedback on the upload process and displays the selected
 * image or a placeholder icon when no image is selected.
 *
 * @component
 * @example
 * return (
 *   <UploadContentImage />
 * )
 */
const UploadContentImage: React.FC = () => {
  // Hook to manage the selected image state
  const { setSelectedImage } = useSelectImage()

  // State to manage the drag-over effect
  const [dragOver, setDragOver] = useState(false)

  // State to store the name of the selected file
  const [selectedFileName, setSelectedFileName] = useState('')

  // State to store the file data of the selected image
  const [imageData, setImageData] = useState<File | null>(null)

  // Ref to access the file input element
  const fileInput = useRef<HTMLInputElement>(null)

  /**
   * onDragEnter function handles the drag enter event.
   * It prevents the default behavior and sets the dragOver state to true.
   *
   * @param e - The drag event object.
   */
  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  /**
   * onDragLeave function handles the drag leave event.
   * It sets the dragOver state to false.
   */
  const onDragLeave = () => {
    setDragOver(false)
  }

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

    droppedFiles.forEach((droppedFile: File) => {
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
   * handleFileRead function processes the selected file.
   * It sets the image data, selected image, and file name states.
   *
   * @param file - The selected file object.
   */
  const handleFileRead = (file: File) => {
    setImageData(file)
    setSelectedImage(file)
    setSelectedFileName(file.name)
  }

  return (
    <div
      className={`col-span-4 relative text-center w-full bg-zinc-800 rounded-xl text-white ${dragOver ? 'dragover' : ''}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <label
        htmlFor="file"
        className={`relative cursor-pointer p-6 flex flex-col items-center justify-center border-3 rounded-lg`}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          name="file"
          ref={fileInput}
          className="opacity-0 text-xs pointer-events-none"
          id="file"
          onChange={handleFileInputChange}
        />
        {imageData ? (
          <img
            src={URL.createObjectURL(imageData)}
            alt="Preview"
            className="w-24 h-auto object-cover rounded-lg"
          />
        ) : (
          <PiImageFill size={90} color={'#FFFFFF'} />
        )}
        <div className="flex flex-col gap-1 justify-center">
          <p>
            {selectedFileName ? (
              <span className="font-bold text-xl">{selectedFileName}</span>
            ) : (
              <span className="font-bold text-xl">Drag and drop images</span>
            )}
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-full h-[1px] bg-zinc-400" />
            <p>or</p>
            <div className="w-full h-[1px] bg-zinc-400" />
          </div>
          <button
            className={`px-5 py-2 rounded-full text-xs font-bold bg-blue-600`}
            onClick={() => fileInput.current?.click()}
          >
            Upload Image
          </button>
        </div>
      </label>
    </div>
  )
}

export default UploadContentImage
