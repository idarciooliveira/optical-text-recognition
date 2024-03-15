import DragDropZone from "@/components/drag-drop-zone";

import { Skeleton } from "@/components/ui/skeleton";


export default async function Home() {

  return (
    <div className="w-full flex min-h-screen flex-col">
      <main className="p-4 space-y-4">
        <h2 className="font-bold text-2xl text-center">
          Extract Text from Image
        </h2>
        <p className="text-center leading-7 text-md">
          An online image to text converter to extract text from images. <br />
          Upload your photo, to get text file instantly.
        </p>

        <div className="flex flex-col items-center justify-center gap-3">
          <DragDropZone />
        </div>
      </main>

    </div>
  );
}

