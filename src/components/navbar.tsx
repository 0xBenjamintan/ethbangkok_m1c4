"use client";
import { ArrowRight, CheckCircle, Code, Laptop, Zap } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { createWallet } from "thirdweb/wallets";
import { lightTheme } from "thirdweb/react";
import { useAuth } from "@/components/provider/AuthContext";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import Image from "next/image";
import { useState } from "react";
import LandingPage from "./landingpage";

export default function Header() {
  const { isWalletConnected, setIsWalletConnected, isVerified, setIsVerified } =
    useAuth();
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleVerify = async (proof: ISuccessResult) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (response.ok) {
      console.log("Success");
      setIsVerified(true);
    } else {
      console.log("Verified fail");
      setIsVerified(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDisconnect = () => {
    setIsVerified(false);
    setIsWalletConnected(false);
    setDropdownOpen(false);
  };

  const handleWalletConnection = (connected: boolean) => {
    setIsWalletConnected(connected);
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center font-londrina bg-[#FDEFB4]">
      <Link className="flex items-center justify-center py-2" href="/">
        <Image src="/logo.png" alt="Map Mak Mak logo" width={70} height={70} />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="space-x-4 relative flex items-center">
            {isVerified && (
              <Link
                href="/dashboard"
                className="border-sm border-black rounded-sm bordedr max-lg:hidden"
              >
                <button>Dashboard</button>
              </Link>
            )}
            <IDKitWidget
              app_id="app_899ff65b12471d92edc6c4272a566ba1"
              action="verify"
              verification_level={VerificationLevel.Device}
              handleVerify={handleVerify}
              onSuccess={(result) => {
                setIsVerified(true);
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => {
                    if (isVerified) {
                      toggleDropdown();
                    } else {
                      open();
                    }
                  }}
                  className="flex align-middle justify-center"
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
              )}
            </IDKitWidget>
            {isVerified && dropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white border rounded shadow-lg">
                <button
                  onClick={handleDisconnect}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-100"
                >
                  Disconnect
                </button>
              </div>
            )}
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
                onConnect={() => handleWalletConnection(true)}
                onDisconnect={() => handleWalletConnection(false)}
              />
            )}
          </div>
        </nav>
      </nav>
    </header>
  );
}
