"use client";
import LandingPage from "@/components/landingpage";
import MainPage from "@/components/mainpage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { useAuth } from "@/components/provider/AuthContext";


export default function MainComponent() {
  const { isWalletConnected, isVerified } = useAuth();

  return (
    <div>
      <Navbar
      />
      {isWalletConnected ? <MainPage /> : <LandingPage />}
      <Footer />
    </div>
  );
}
