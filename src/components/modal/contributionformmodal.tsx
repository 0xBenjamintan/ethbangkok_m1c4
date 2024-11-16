"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { create } from "ipfs-http-client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X, CircleDollarSign } from "lucide-react";
import BountyList from "@/components/modal/bountylist";
import Bounty from "@/components/modal/bountylist";

const formSchema = z.object({
  walletAddress: z.string().min(2, {
    message: "Wallet address must be at least 2 characters.",
  }),
  photo: z.any().optional(),
});

interface FormModalProps {
  onClose: () => void;
}

export function ContributionFormModal({ onClose }: FormModalProps) {
  const [uploadedPhotoHash, setUploadedPhotoHash] = useState<string | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      setUserLocation("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    console.log("Success")
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg relative p-6">
        <button onClick={onClose} className="absolute top-2 right-2 z-10">
          <X />
        </button>
        {userLocation && <p className="text-center mb-4">{userLocation}</p>}
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
                <p>
                  Uploaded photo hash:{" "}
                  <a
                    href={`https://ipfs.io/ipfs/${uploadedPhotoHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {uploadedPhotoHash}
                  </a>
                </p>
              )}
            </FormItem>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
