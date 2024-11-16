"use client";

import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Badge, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';


const fetchPfpData = async () => {
  try {
    const response = await fetch('https://api.cloudnouns.com/v1/pfp?text=badublanc.eth');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Fetch SVG as text since it's an SVG image  
    const svgData = await response.text();
    return svgData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
};

const Dashboard = () => {

  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadSvg = async () => {
      const svg = await fetchPfpData();
      if (svg) {
        setSvgContent(svg);
      }
    };
    loadSvg();
  }, []);


  const bounties: Bounty[] = [
    {
      id: "1",
      title: "Bounty 1",
      description: "I want to know the traffic condition on this location",
      payout: 100,
      location: { lat: 34.0522, long: -118.2437 },
    },
    {
      id: "2",
      title: "Bounty 2",
      description: "Description 2",
      payout: 200,
      location: { lat: 40.7128, long: -74.006 },
    },
  ];

  const winbounties: Bounty[] = [
    {
      id: "1",
      title: "WinBounty 1",
      description: "I want to know the traffic condition on this location",
      payout: 100,
      location: { lat: 34.0522, long: -118.2437 },
    },
    {
      id: "2",
      title: "WinBounty 2",
      description: "I want to know the description 2",
      payout: 200,
      location: { lat: 40.7128, long: -74.006 },
    },
  ];

  const [expandedBountyId, setExpandedBountyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);

  const toggleBountyDetails = (id: string) => {
    setExpandedBountyId(expandedBountyId === id ? null : id);
  };

  const handleApplyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty);
    setIsModalOpen(true);
  };

  return (
    <div className="text-black px-[7%] py-[5%]">
      <div>Submitted bounties</div>
      <div>Win&apos;s bounties</div>

      <div>
        {/* Render the SVG content safely */}
        {svgContent && (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        )}
      </div>
      {winbounties.map((bounty) => (
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
                    {bounty.location.lat.toFixed(4)},{" "}
                    {bounty.location.long.toFixed(4)}
                  </span>
                </div>
                <Button onClick={() => handleApplyClick(bounty)}>Apply</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
