import { ArrowRight, CheckCircle, Code, Laptop, Zap } from 'lucide-react'
import Link from "next/link"
import { ConnectButton } from "thirdweb/react"
import { client } from "@/app/client"
import { createWallet } from "thirdweb/wallets"
import { lightTheme } from "thirdweb/react"
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import Image from 'next/image'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Navbar() {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ]

  const [isVerified, setIsVerified] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleVerify = async (proof: ISuccessResult) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    })
    if (response.ok) {
      console.log("Success")
    } else {
      console.log("Verified fail")
    }
  }

  const onSuccess = () => {
    setIsVerified(true)
  }

  const handleDisconnect = () => {
    setIsVerified(false)
    setIsPopoverOpen(false)
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center py-2" href="#">
        <Image
          className=""
          src="/logo.png"
          alt="Map Mak Mak logo"
          width={70}
          height={70}
        />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <div className="space-x-4 relative flex items-center">
          <IDKitWidget
            app_id="app_899ff65b12471d92edc6c4272a566ba1"
            action="verify"
            verification_level={VerificationLevel.Device}
            handleVerify={handleVerify}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <Popover open={isVerified && isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    onClick={() => {
                      if (isVerified) {
                        setIsPopoverOpen(isPopoverOpen)
                      } else {
                        open()
                      }
                    }}
                    className="flex items-center justify-center"
                  >
                    <Image
                      className="mr-4 my-auto"
                      src="/worldcoin.png"
                      alt="Worldcoin logo"
                      width={20}
                      height={20}
                    />
                    {isVerified ? "World ID Connected" : "Sign In with World ID"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <button
                    onClick={handleDisconnect}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Disconnect
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </IDKitWidget>
        </div>
        <div>
          {isVerified && (
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={lightTheme({
                colors: { primaryButtonBg: "hsl(0, 0%, 0%)" },
              })}
              connectModal={{ size: "compact" }}
              connectButton={{ label: "Connect Wallet" }}
            />
          )}
        </div>
      </nav>
    </header>
  )
}