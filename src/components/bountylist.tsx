'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, ChevronDown, ChevronUp } from "lucide-react"

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

export default function BountyList() {
  const bounties: Bounty[] = [
    { id: '1', title: 'Bounty 1', description: 'Description 1', payout: 100, location: { lat: 34.0522, long: -118.2437 } },
    { id: '2', title: 'Bounty 2', description: 'Description 2', payout: 200, location: { lat: 40.7128, long: -74.0060 } },
  ]

  const [expandedBountyId, setExpandedBountyId] = useState<string | null>(null)

  const toggleBountyDetails = (id: string) => {
    setExpandedBountyId(expandedBountyId === id ? null : id)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Available Bounties</h2>
      {bounties.map(bounty => (
        <Card key={bounty.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div
              onClick={() => toggleBountyDetails(bounty.id)}
              className="p-4 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold">{bounty.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${bounty.payout}
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
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {bounty.location.lat.toFixed(4)}, {bounty.location.long.toFixed(4)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}