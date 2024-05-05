/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react'
import { useSelectImage } from '@renderer/store/select'
import { PiImageFill } from "react-icons/pi";

const UploadContentImage:React.FC = () => {
 const { setSelectedImage } = useSelectImage()
  const [dragOver, setDragOver] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [imageData, setImageData] = useState<File | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

 const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault()
  setDragOver(true)
}

const onDragLeave = () => {
  setDragOver(false)
}

const onDrop = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault()
  setDragOver(false)

  const droppedFiles = Array.from(e.dataTransfer.files)

  droppedFiles.forEach((droppedFile: any) => {
    handleFileRead(droppedFile)

  })
}

const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0]

  if (selectedFile) {

      handleFileRead(selectedFile)
   
  }
}

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
         <PiImageFill size={90} color={"#FFFFFF"}/>
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
         <p>
           or
         </p>
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