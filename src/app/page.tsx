'use client'
import ShimmerButton from "@/components/ui/shimmer-button";
import { ArrowRight, CheckCircle, Code, Laptop, Zap } from 'lucide-react'
import Link from "next/link"
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { createWallet } from "thirdweb/wallets";
import { lightTheme } from "thirdweb/react";
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

export default function LandingPage() {

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};

const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = "/success";
};
  

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
        <ConnectButton
      client={client}
      wallets={wallets}
      theme={lightTheme({
        colors: { primaryButtonBg: "hsl(0, 0%, 0%)" },
      })}
      connectModal={{ size: "compact" }}
      connectButton={{label: "Connect Wallet"}}
    />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Map Mak Mak
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Build faster, scale smarter, and innovate like never before with our cutting-edge platform.
                </p>
              </div>
              <div className="space-x-4">
                <ShimmerButton>  <ConnectButton
                client={client}
                wallets={wallets}
                theme={lightTheme({
                  colors: { primaryButtonBg: "hsl(0, 0%, 0%)" },
                })}
                connectModal={{ size: "compact" }}
                connectButton={{label: "Launch App"}}
              /></ShimmerButton>  
              <IDKitWidget
	app_id = 'app_staging_4bc5c0ed5028af87bab15fac0432420c' // obtained from the Developer Portal
	action="login" // obtained from the Developer Portal
	onSuccess={onSuccess} // callback when the modal is closed
	handleVerify={handleVerify} // callback when the proof is received
	verification_level={VerificationLevel.Orb}
>
	{({ open }) => 
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
    }
</IDKitWidget>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}