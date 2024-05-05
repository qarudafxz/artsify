/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { create } from "zustand";

interface SelectProps {
 selectedImage: File | null
 selectedStyleImage: File | null
 imageResult: string | null
 setSelectedImage: (selectedImage: File | null) => void;
 setSelectedStyleImage: (selectedStyleImage: File | null) => void;
 setImageResult: (imageResult: string | null) => void;
}

export const useSelectImage = create<SelectProps>((set) => ({
 selectedImage: null,
 selectedStyleImage: null,
 imageResult: null,
 setSelectedImage: (selectedImage: File | null) => set({ selectedImage }),
 setSelectedStyleImage: (selectedStyleImage: File | null) => set({ selectedStyleImage }),
 setImageResult: (imageResult: string | null) => set({ imageResult }),
}))