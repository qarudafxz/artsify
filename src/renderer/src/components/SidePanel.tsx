/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelectImage } from '@renderer/store/select'

import UploadContentImage from './UploadContentImage'
import UploadStyleImage from './UploadStyleImage'
import { toast, Toaster } from 'sonner'

const SidePanel:React.FC = () => {
  const { selectedImage, selectedStyleImage, setImageResult } = useSelectImage()

  console.log(selectedStyleImage)

  const artsify = async () => {
    if (!selectedImage || !selectedStyleImage) {
      toast.error('Please upload an image and select a style image');
      return;
    }
  
    try {
      toast.loading('Processing Image, Please wait...')
      const formData = new FormData();
      formData.append('input_image', selectedImage);
      formData.append('style_image', selectedStyleImage);
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
    
      toast.dismiss(); // Dismiss any existing toast
      toast.success('Image Processed Successfully');
      setImageResult(imageUrl);
    } catch (err) {
      console.error(err);
      toast.dismiss(); // Dismiss any existing toast
      toast.error('Error processing image');
    }
  };
  

  return (
    <div className='w-full h-full border-r pr-4 border-zinc-600 py-4'>
      <Toaster richColors position='top-center' />
     <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className='font-bold text-white text-md'>Upload your Image to <span className='text-blue-600'>transform</span></h1>
      <UploadContentImage />
      <div className="w-full h-[1px] bg-zinc-600"/>
      <h1 className='font-bold text-white text-md text-center'>Upload or Select the style you want to use to transform <span className='text-blue-600'>image</span></h1>
      <UploadStyleImage />
     </div>
     <div className="bg-zinc-800 rounded-lg p-4 flex flex-col justify-center items-center mt-4">
        <button onClick={artsify} className='font-bold text-md py-2 bg-blue-600 text-white text-center w-full rounded-full'>✨ Artsify</button>
     </div>
    </div>
  )
}

export default SidePanel