'use client'

import ExtractText from '@/lib/tesseract';
import React, { useState } from 'react'
import Dropzone, { Accept, FileRejection } from 'react-dropzone'
import { toast } from 'sonner';
import { CopyIcon, DownloadIcon } from '@radix-ui/react-icons'
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
    < >
      <Dropzone
        maxSize={15000000}
        maxFiles={1}
        autoFocus
        accept={supportedFiles}
        onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <div  {...getRootProps()} className="bg-zinc-800 text-zinc-500 border-dashed cursor-pointer border w-2/4 h-24 rounded-md text-center">
            <input {...getInputProps()} />
            <p>
              {
                text ? text : 'Drop some file here, or click to select file'
              }
            </p>
          </div>
        )}
      </Dropzone>
      <div className='flex flex-row space-x-2 items-center justify-end'>
        <CopyIcon width={30} height={30} cursor={'pointer'} />
        <DownloadIcon width={30} height={30} cursor={'pointer'} />
      </div>
      <div className='mt-4 text-sm w-2/4 text-justify'>
        <p >
          {text}
        </p>
      </div>


    </>
  )
}
