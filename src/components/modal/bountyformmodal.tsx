"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { create } from "ipfs-http-client"
import { useState } from "react"
import {lineaSepolia} from "thirdweb/chains";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { X , CircleDollarSign, LucidePanelBottomDashed} from "lucide-react"
import BountyList from "./bountylist"
import Bounty from './bountylist'
import { prepareContractCall, getContract, createThirdwebClient } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { upload } from "thirdweb/storage";

const client = createThirdwebClient({ clientId: "4dfc4535b9ea8bc0b4ba0ee7ae30ce68" });  



const contract = getContract({
  client,
  address: "0x5E662A0CbCe4F40701C74735Af020ce04331e839",
  chain: lineaSepolia,
});


const formSchema = z.object({
  walletAddress: z.string().min(2, {
    message: "Wallet address must be at least 2 characters.",
  }),
  photo: z.any().optional(),
})

interface FormModalProps {
  onClose: () => void;
  selectedBounty: Bounty | null;
}

export function FormModal({ onClose, selectedBounty }: FormModalProps) {


  const { mutate: sendTransaction } = useSendTransaction();
  const submitBounty = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function submitBounty(uint256 _bountyId, string _submissionCID)",
      params: [selectedBounty.id, _submissionCID],
    });
    sendTransaction(transaction);
  };

  const [uploadedPhotoHash, setUploadedPhotoHash] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg relative p-6">
        <button onClick={onClose} className="absolute top-2 right-2 z-10"><X/></button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitBounty)} className="space-y-6">
            {selectedBounty && (
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{selectedBounty.title}</h3>
                <p>Location: {selectedBounty.location.lat}, {selectedBounty.location.long}</p>
                <p>{selectedBounty.description}</p>
                <p> Payout:  {selectedBounty.payout} USDC</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x9.......099D" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Photo Upload</FormLabel>
              <FormControl>
                <input
                  type="file"
                  {...form.register("photo")}
                  accept="image/*"
                  className="w-full"
                />
              </FormControl>
              {uploadedPhotoHash && (
                <p>Uploaded photo hash: <a href={`https://ipfs.io/ipfs/${uploadedPhotoHash}`} target="_blank" rel="noopener noreferrer">{uploadedPhotoHash}</a></p>
              )}
            </FormItem>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
