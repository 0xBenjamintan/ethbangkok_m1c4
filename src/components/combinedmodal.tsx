"use clients";

import React, { useState } from "react";
import { Scroll, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import BountyList from "./bountylist";
import { ContributionFormModal } from "./contributionformmodal";
import { CreateBountyFormModal } from "./createbountyformmodal";
import Image from "next/image";

interface CombinedModalProps {
  onClose: () => void;
}

export default function CombinedModal({ onClose }: CombinedModalProps) {
  const [isBountyVisible, setBountyVisible] = useState(false);
  const [isContributionVisible, setContributionVisible] = useState(false);
  const [isCreateBountyVisible, setCreateBountyVisible] = useState(false);

  const handleContributionClick = () => {
    setContributionVisible(true);
  };

  const handleBountyClick = () => {
    setBountyVisible(true);
  };

  const handleCreateBountyClick = () => {
    setCreateBountyVisible(true);
  };

  const handleClose = () => {
    setBountyVisible(false);
    setContributionVisible(false);
    setCreateBountyVisible(false);
  };

  return (
    <div className="fixed inset-0 flex flex-col sm:flex-row items-center gap-4 justify-center z-[1000] bg-black bg-opacity-50 backdrop-blur-md">
      <div className="w-64 h-64 flex flex-row justify-center items-center space-x-4 bg-white p-6 rounded-md shadow-lg">
        {/* Bounty Application Section */}
        <div className="mb-4 flex flex-col justify-center items-center">
          <Image
            className="mr-4 my-auto"
            src="/road.png"
            alt="Apply Bounty"
            width={70}
            height={70}
          />
          <h2 className="text-lg font-semibold">Apply for Bounty !</h2>
          <Button onClick={handleBountyClick}>Apply for Bounty !</Button>
        </div>
      </div>
      <div className="w-64 h-64 flex flex-row justify-center items-center space-x-4 bg-white p-6 rounded-md shadow-lg">
        {/* Anonymous Photo Contribution Section */}
        <div className="mb-4 flex flex-col justify-center items-center text-center">
          <Image
            className="mr-4 my-auto"
            src="/camera.png"
            alt="Contribution"
            width={70}
            height={70}
          />
          <h2 className="text-lg font-semibold">
            Contribute a Photo of Your Place !
          </h2>
          <Button onClick={handleContributionClick}>
            Contribute a Photo !
          </Button>
        </div>
      </div>
      <div className="w-64 h-64 flex flex-row justify-center items-center space-x-4 bg-white p-6 rounded-md shadow-lg">
        {/* Create Bounty Section */}
        <div className="mb-4 flex flex-col justify-center items-center text-center">
          <Image
            className="mr-4 my-auto"
            src="/earth.png"
            alt="Create Bounty"
            width={70}
            height={70}
          />
          <h2 className="text-lg font-semibold">Create a Bounty !</h2>
          <Button onClick={handleCreateBountyClick}>Create Bounty !</Button>
        </div>
      </div>
      {isBountyVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-black bg-opacity-50">
          <BountyList onClose={handleClose} />
        </div>
      )}
      {isContributionVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-black bg-opacity-50">
          <ContributionFormModal onClose={handleClose} />
        </div>
      )}
      {isCreateBountyVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-black bg-opacity-50">
          <CreateBountyFormModal onClose={handleClose} />
        </div>
      )}

      <button onClick={onClose} className="absolute top-2 right-2">
        <X size={44} />
      </button>
    </div>
  );
}
