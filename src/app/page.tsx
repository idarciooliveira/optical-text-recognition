'use client'

import ExtractText from '@/lib/tesseract';
import React, { useState } from 'react'
import Dropzone, { Accept, FileRejection } from 'react-dropzone'
import { toast } from 'sonner';
import { CopyIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link';

const supportedFiles: Accept = {
  'image/jpeg': ['.jpeg', '.png', '.jpg']
}
export default function Home() {

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

  const handleOnCopy = () => {
    const text = document.getElementById('text')?.textContent
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard!')
  }

  return (
    <main className="w-full flex min-h-screen bg-zinc-900 text-white items-center justify-center flex-col p-4 space-y-4">
      <h2 className="font-bold text-2xl text-center">
        Extract Text from Image
      </h2>
      <p className="text-center leading-7 text-md">
        An online image to text converter to extract text from images. <br />
        Upload your photo, to get text file instantly. <br />
        <i className='text-gray-500'> Supported files JPEG, PNG & JPG - max size 15 MB</i>
      </p>

      <Dropzone
        maxSize={15000000}
        maxFiles={1}
        autoFocus
        accept={supportedFiles}
        onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <div  {...getRootProps()} className="flex items-center justify-center bg-zinc-800 text-zinc-500 border-dashed cursor-pointer border w-2/4 h-16 rounded-md text-center">
            <input {...getInputProps()} />
            <p> Drop some file here, or click to select file </p>
          </div>
        )}
      </Dropzone>

      <div className='w-full flex flex-row space-x-2 items-center justify-center'>
        <CopyIcon onClick={handleOnCopy} width={25} height={25} cursor={'pointer'} />
        <span>Copiar</span>
      </div>
      <div className='mt-4 text-sm w-2/4 text-justify'>
        <p id='text'>
          {text}
        </p>
      </div>

      <div className='flex flex-row space-x-2 items-center'>
        <p className='text-xl'>
          Powered by <Link className='underline' target='blank' href={'https://bit.ly/idarcio-oliveira'}>Idárcio Oliveira</Link>
        </p>
        <Link target='_blank' href={'https://github.com/idarciooliveira/optical-text-recognition.git'}>
          <GitHubLogoIcon width={25} height={25} />
        </Link>
      </div>

    </main>

  );
}

