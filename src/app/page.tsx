import DragDropZone from "@/components/drag-drop-zone";

export default async function Home() {

  return (
    <main className="w-full flex min-h-screen bg-zinc-900 text-white items-center justify-center flex-col p-4 space-y-4">
      <h2 className="font-bold text-2xl text-center">
        Extract Text from Image
      </h2>
      <p className="text-center leading-7 text-md">
        An online image to text converter to extract text from images. <br />
        Upload your photo, to get text file instantly.
      </p>

      <DragDropZone />
    </main>

  );
}

