'use client'

import React, { useEffect, useState } from 'react'
import Dropzone, { Accept } from 'react-dropzone'

const supportedFiles: Accept = {
  'image/jpeg': ['.jpeg', '.png']
}

export default function DragDropZone() {

  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [])

  // const handleOnDrop = (option: Accepted)=>{

  // }

  return (
    <Dropzone
      maxSize={1024}
      maxFiles={1}
      autoFocus
      accept={supportedFiles}
      onDrop={(file, rejct, event) => {
        console.log(rejct)
        console.log(file)
        setFiles(file.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }}>
      {({ getRootProps, getInputProps }) => (
        <div  {...getRootProps()} className="bg-zinc-50 text-zinc-500 border-dashed cursor-pointer border w-2/4 h-48 rounded-md text-center items-center justify-center flex">
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop some files here, or click to select files
          </p>
          <div className='flex flex-row gap-10'>
            {files.length > 0 && files.map(file => (
              <img
                className='w-32 h-10'
                src={file.preview}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
              />
            ))}
          </div>
        </div>
      )}
    </Dropzone>
  )
}
