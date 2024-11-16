"use client";
import LandingPage from "@/components/landingpage";
import MainPage from "@/components/mainpage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { useAuth } from "@/components/provider/AuthContext";
import BottomNavigation from "@/components/bottom-navigation/bottom-navigation";

export default function MainComponent() {
  const { isVerified } = useAuth();

  return (
    <div>
      {isVerified ? <MainPage /> : <LandingPage />}
      <Footer />
      <BottomNavigation />
    </div>
  );
}
