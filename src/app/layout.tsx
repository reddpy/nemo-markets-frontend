import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NemoTopNavbar from "@/components/navigation/nemotopnav";
import NemoSideMenu from "@/components/navigation/nemosidemenu";
// import { ClerkProvider } from "@clerk/nextjs";

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
    <html lang="en">
      <body className={inter.className}>
        <NemoTopNavbar />
        <div className="mb-2 flex min-h-[90vh] flex-row">
          <NemoSideMenu />
          <div
            className="
            h-fill
            ml-1
            mr-2
            w-full
            rounded-lg
            border
            p-1
            shadow-lg
            "
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
