import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: '--font-sans',
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Optical Text Recognition",
  description: "Extract text from image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={cn('font-sans antialiased', roboto.className)}>
        <Toaster richColors expand />
        {children}
      </body>
    </html>
  );
}
