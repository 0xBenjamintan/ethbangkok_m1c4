'use clients'

import React from 'react';
import { Scroll, Upload, X } from "lucide-react";
import { Button } from "./ui/button";

interface CombinedModalProps {
    onClose: () => void;
}

export default function CombinedModal({ onClose }: CombinedModalProps) {
    return (
        <div className="fixed inset-0 flex flex-col sm:flex-row items-center gap-4 justify-center z-[1000] bg-black bg-opacity-50">
            <div className="w-64 h-64 flex flex-row justify-center items-center space-x-4 bg-white p-6 rounded-md shadow-lg">
                {/* Bounty Application Section */}
                <div className="mb-4 flex flex-col justify-center items-center">
                    <Scroll size={'44px'} />
                    <h2 className="text-lg font-semibold">Apply for Bounty!</h2>
                    <Button>Apply for Bounty!</Button>
                </div>
            </div>
            <div className="w-64 h-64 flex flex-row justify-center items-center space-x-4 bg-white p-6 rounded-md shadow-lg">
                {/* Anonymous Photo Contribution Section */}
                <div className="mb-4 flex flex-col justify-center items-center text-center">
                    <Upload size={'44px'} />
                    <h2 className="text-lg font-semibold">Contribute a Photo of Your Place!</h2>
                    <Button>Contribute a Photo!</Button>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-2 right-2">
                <X size={44} />
            </button>
        </div>
    );
}