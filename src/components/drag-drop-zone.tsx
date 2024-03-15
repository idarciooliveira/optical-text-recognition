'use client'

import React, { useState } from 'react'
import Dropzone, { Accept, FileRejection } from 'react-dropzone'
import { toast } from 'sonner';

const supportedFiles: Accept = {
  'image/jpeg': ['.jpeg', '.png']
}

export default function DragDropZone() {

  const [file, setFile] = useState<File>();

  const handleOnDrop = (file: File[], rejection: FileRejection[]) => {

    if (rejection) {
      rejection.forEach(rejectObj => {
        rejectObj.errors.forEach(error => {
          toast.error(error.message)
        })
      });
    }

    setFile(file[0]);
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
              file ? file.name : 'Drop some file here, or click to select file'
            }
          </p>
        </div>
      )}
    </Dropzone>
  )
}
