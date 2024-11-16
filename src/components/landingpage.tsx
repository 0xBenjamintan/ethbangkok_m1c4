'use client'
import { ArrowRight, CheckCircle, Code, Laptop, Zap } from 'lucide-react'
import Link from "next/link"
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { createWallet } from "thirdweb/wallets";
import { lightTheme } from "thirdweb/react";
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/navbar';

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Map Mak Mak
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A decentralized
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}