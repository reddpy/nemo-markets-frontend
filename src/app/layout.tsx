import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NemoTopNavbar from "@/components/navigation/nemotopnav";
import NemoSideMenu from "@/components/navigation/nemosidemenu";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemo Markets",
  description: "The suite for intellectual property",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NemoTopNavbar />
          <div className="flex flex-row mb-2 min-h-[90vh]">
            <NemoSideMenu />
            <div
              className="
            border 
            rounded-lg 
            shadow-lg 
            w-full
            ml-1
            mr-2
            p-1
            h-fill
            "
            >
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
