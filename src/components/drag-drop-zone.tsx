'use client'

import ExtractText from '@/lib/tesseract';
import React, { useState } from 'react'
import Dropzone, { Accept, FileRejection } from 'react-dropzone'
import { toast } from 'sonner';

const supportedFiles: Accept = {
  'image/jpeg': ['.jpeg', '.png']
}

export default function DragDropZone() {

  const [text, setText] = useState('')

  const handleOnDrop = async (file: File[], rejection: FileRejection[]) => {

    try {
      if (rejection) {
        rejection.forEach(rejectObj => {
          rejectObj.errors.forEach(error => {
            toast.error(error.message)
          })
        });
      }

      const result = ExtractText(file[0])

      toast.promise(new Promise((resolve) => resolve(result)), {
        loading: 'Extracting text...',
        success: (text: any) => {
          setText(text)
          return `Text extracted successfully`
        },
        error: 'Error extracting text',
      });


    } catch (error: any) {
      toast.error(error)
    }
  }



  return (
    <Dropzone
      maxSize={15000000}
      maxFiles={1}
      autoFocus
      accept={supportedFiles}
      onDrop={handleOnDrop}>
      {({ getRootProps, getInputProps }) => (
        <div  {...getRootProps()} className="bg-zinc-50 text-zinc-500 border-dashed cursor-pointer border w-2/4 h-32 rounded-md text-center items-center justify-center flex">
          <input {...getInputProps()} />
          <p>
            {
              text ? text : 'Drop some file here, or click to select file'
            }
          </p>
          <p className='text-2xl'>{text}</p>
        </div>
      )}
    </Dropzone>
  )
}
