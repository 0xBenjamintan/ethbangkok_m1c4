'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from './ui/button'
import { FormModal } from './bountyformmodal'
import { prepareContractCall, getContract, createThirdwebClient } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { lineaSepolia } from 'thirdweb/chains'

const client = createThirdwebClient({ clientId: "4dfc4535b9ea8bc0b4ba0ee7ae30ce68" });
const contract = getContract({
  client,
  address: "0x5E662A0CbCe4F40701C74735Af020ce04331e839",
  chain: lineaSepolia,
});

interface Bounty {
  id: string    
  title: string
  description: string
  payout: number
  location: {
    lat: number
    long: number
  }
}

interface BountyListProps {
  onClose: () => void;
}



export default function BountyList({ onClose }: BountyListProps) {
    // Move the hook call here, inside the component body
    const { mutate: sendTransaction } = useSendTransaction();
  
    const applyBounty = (bounty: Bounty) => {
      const transaction = prepareContractCall({
        contract,
        method: "function applyForBounty(uint256 _bountyId)",
        params: [bounty.id],
      });
      sendTransaction(transaction);
      setSelectedBounty(bounty);
      setIsModalOpen(true);
    };
  
    const bounties: Bounty[] = [
      { id: '1', title: 'Bounty 1', description: 'I want to know the traffic condition on this location', payout: 100, location: { lat: 34.0522, long: -118.2437 } },
      { id: '2', title: 'Bounty 2', description: 'Description 2', payout: 200, location: { lat: 40.7128, long: -74.0060 } },
    ];
  
    const [expandedBountyId, setExpandedBountyId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  
    const toggleBountyDetails = (id: string) => {
      setExpandedBountyId(expandedBountyId === id ? null : id);
    };
  
    return (
      <div className='bg-white w-[50%] border rounded-lg relative'>
        <button onClick={onClose} className="absolute top-2 right-2 z-10">
          <X size={24} />
        </button>
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Available Bounties</h2>
          {bounties.map(bounty => (
            <Card key={bounty.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div onClick={() => toggleBountyDetails(bounty.id)} className="p-4 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold">{bounty.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {bounty.payout} USDC
                      </Badge>
                    </div>
                  </div>
                  {expandedBountyId === bounty.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                {expandedBountyId === bounty.id && (
                  <div className="px-4 pb-4 pt-2 border-t">
                    <p className="text-gray-600 mb-4">{bounty.description}</p>
                    <div className="flex items-center mb-4 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {bounty.location.lat.toFixed(4)}, {bounty.location.long.toFixed(4)}
                      </span>
                    </div>
                    <Button onClick={() => applyBounty(bounty)}>Apply</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {isModalOpen && <FormModal onClose={() => setIsModalOpen(false)} selectedBounty={selectedBounty} />}
        </div>
      </div>
    );
  }
  