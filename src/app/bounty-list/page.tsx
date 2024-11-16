'use client'

import BountyList from "@/components/bountylist";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Bounty(){
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    return(
        <div>
        <Navbar
        setWalletConnected={setIsWalletConnected}
        setIsVerified={setIsVerified}
        isVerified={isVerified}
      />
        <BountyList/>
        </div>
    )
}