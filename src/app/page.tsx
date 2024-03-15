'use client'
import DragDropZone from "@/components/drag-drop-zone";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function Home() {

  return (
    <div className="w-full flex min-h-screen flex-col">
      <nav className="w-full h-10 flex items-center p-4">
        <NavigationMenu>
          <NavigationMenuList >
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                  Optical Text Recognition
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

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
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-2/4 h-4" />
        </div>
      </main>

    </div>
  );
}

