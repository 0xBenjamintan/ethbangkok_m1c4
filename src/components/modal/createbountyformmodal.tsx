"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import LocationSearchInput from "@/components/searchinput/page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { X , CircleDollarSign} from "lucide-react"
import BountyList from "./bountylist"
import Bounty from './bountylist'
import { Textarea } from "@/components/ui/textarea"
import { prepareContractCall, getContract, createThirdwebClient } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { lineaSepolia } from "thirdweb/chains"
import { create } from "domain";

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
  title: z.string().min(1, {
    message: "Bounty title is required.",
  }),
  description: z.string().min(1, {
    message: "Bounty description is required.",
  }),
  payout: z.number().positive({
    message: "Bounty payout must be a positive number.",
  }),
  location: z.string().optional(),
  photo: z.any().optional(),
});

interface FormModalProps {
  onClose: () => void;
}

export function CreateBountyFormModal({ onClose }: FormModalProps) {
  const [uploadedPhotoHash, setUploadedPhotoHash] = useState<string | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const { mutate: sendTransaction } = useSendTransaction();

  const createBounty = (description: string, longitude: string, latitude: string, payoutAmount: number) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createBounty(string _description, string _longitude, string _latitude, uint256 _payoutAmount)",
      params: [
        description,
        longitude,
        latitude,
        BigInt(payoutAmount),
      ],
    });
    sendTransaction(transaction);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data); // Handle form submission
  };

  const { control, handleSubmit, setValue } = useForm();

  const onLocationSelect = (lat, lng, address) => {
    // Optionally set these values in your form state
    console.log(lat, lng, address);
    setValue("location", `${lat}, ${lng}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg relative p-6">
        <button onClick={onClose} className="absolute top-2 right-2 z-10">
          <X />
        </button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createBounty)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bounty Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bounty title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bounty Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter bounty description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bounty Payout</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter bounty payout"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" onClick={() => createBounty(form.getValues("description"), form.getValues("longitude"), form.getValues("latitude"), form.getValues("payout"))}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
