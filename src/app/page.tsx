"use client";

import LandingPage from "@/components/landingpage";
import MainPage from "@/components/mainpage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";

export default function MainComponent() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  return (
    <div>
      <Navbar
        setWalletConnected={setIsWalletConnected}
      />
      { isWalletConnected ? <MainPage /> : <LandingPage />}
      <Footer />
    </div>
  );
}
