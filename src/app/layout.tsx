import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "@/components/navbar";
import { AuthProvider } from "@/components/provider/AuthContext";
import BottomNavigation from "@/components/bottom-navigation/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Map Mak Mak",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="font-londrina bg-[#FDEFB4]">
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
        </head>
        <body className={inter.className}>
          <ThirdwebProvider>
            <Header />
            <div className="font-londrina bg-[#FDEFB4]">{children}</div>
            <BottomNavigation />
          </ThirdwebProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
