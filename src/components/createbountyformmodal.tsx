"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { toast, ToastContainer, Bounce } from "react-toastify"
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
  payout: z.string().min(1,{
    message: "Bounty payout must be a positive number.",
  }),
  location: z.string().optional(),
  photo: z.any().optional(),
})

interface FormModalProps {
  onClose: () => void;
}

export function CreateBountyFormModal({ onClose }: FormModalProps) {
  const [uploadedPhotoHash, setUploadedPhotoHash] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);



  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
      console.log(data); // Handle form submission
      toast('✔️ Bounty created!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg relative p-6">
        <button onClick={onClose} className="absolute top-2 right-2 z-10"><X/></button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Textarea placeholder="Enter bounty description" {...field} />
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
                  <FormLabel>Bounty Payout (USDC)</FormLabel>
                  <FormControl>
                    <Input  placeholder="Enter bounty payout" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitud</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="longtitud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longtitud</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Bounty</Button>
          </form>
        </Form>
        <ToastContainer/>
      </div>
    </div>
  )
}
