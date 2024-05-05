/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react'
import { useSelectImage } from '@renderer/store/select'
import image1 from '@renderer/assets/picasso.jpg';
import image2 from '@renderer/assets/pablo-picasso-girl-before-mirror-painting.jpg'

const UploadStyleImage:React.FC = () => {
 const { setSelectedStyleImage } = useSelectImage()
 const [dragOver, setDragOver] = useState(false)
 const [activeIndex, setActiveIndex] = useState(0);
 const fileInput = useRef<HTMLInputElement>(null)

 const images = [
    { id: 1, src: image1 },
    { id: 2, src: image2 },
 ]

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

const handleFileRead = async (fileOrUrl: File | string) => {
 let imageData: File | null = null;

 if (typeof fileOrUrl === 'string') {
   // If it's a string, it's a URL, not a File
   try {
     const response = await fetch(fileOrUrl);
     const blob = await response.blob();
     imageData = new File([blob], 'image.png', { type: 'image/png' }); // Adjust the file name and type as needed
   } catch (error) {
     console.error('Error fetching image data:', error);
   }
 } else {
   // It's a File object
   imageData = fileOrUrl;
 }

 setSelectedStyleImage(imageData);
};




  return (

   <div className="flex flex-col gap-4 w-full">
    {/* pre defined images */}
    <div className="grid grid-cols-6 gap-4">
     {images.map((image) => (
      <button 
      onClick={() => {
       handleFileRead(image.src)
       setActiveIndex(image.id)
      }}
      
      key={image.id} className='col-span-1'>
       <img src={image.src} alt="style" className={`w-14 h-auto object-fit rounded-lg ${activeIndex === image.id && 'border-2 border-blue-600'}`}/>
      </button>
     ))}
   </div>
   <div
   className={`text-center w-full rounded-xl text-white ${dragOver ? 'dragover' : ''}`}

   onDrop={onDrop}
 >
   <label
     className='flex flex-col gap-4'
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
    
     <div className="flex gap-2 items-center">
         <div className="w-full h-[1px] bg-zinc-400" />
         <p>
           or
         </p>
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