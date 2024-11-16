"use client";
import React from "react";
import { MapPin, Search, Award, Users } from "lucide-react";
import LetterPullup from "./ui/letter-pullup";
import SparklesText from "./ui/sparkles-text";
import RetroGrid from "./ui/retro-grid";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-24 sm:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <SparklesText
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  text="Welcome To Map Mak Mak"
                />
                <LetterPullup
                  className=" max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                  words={"A decentralized location based bounty platform"}
                  delay={0.05}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 sm:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#254EFB]">
                  <MapPin className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold">Discover Locations</h3>
                <p className="text-gray-500">
                  Find exciting new places and contribute to the community map
                  database.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#254EFB]">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold">Earn Rewards</h3>
                <p className="text-gray-500">
                  Get rewarded for your valuable contributions to the platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#254EFB]">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold">Join Community</h3>
                <p className="text-gray-500">
                  Connect with like-minded explorers and contributors worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RetroGrid />
    </div>
  );
}
