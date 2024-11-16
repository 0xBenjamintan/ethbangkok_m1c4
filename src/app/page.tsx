"use client";

import LandingPage from "@/components/landingpage";
import MainPage from "@/components/mainpage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";

export default function MainComponent() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div>
      <Navbar
        setWalletConnected={setIsWalletConnected}
        setIsVerified={setIsVerified}
        isVerified={isVerified}
      />
      { isWalletConnected ? <MainPage /> : <LandingPage />}
      <Footer />
    </div>
  );
}
