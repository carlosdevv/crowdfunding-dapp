import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AppContextProvider } from "@/context/app-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crowdfunding dApp Blockchain",
  description: "Crowdfunding dApp Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThirdwebProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>

              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                {children}
              </div>
            </div>
          </body>
        </html>
      </AppContextProvider>
    </ThirdwebProvider>
  );
}
