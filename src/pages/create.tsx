import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/ui/upload";
import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from "@/constant/contracts";
import { factoryABI } from "@/contracts/prime-base/factoryABI";
import React, { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits } from 'viem';
import Image from "next/image";

export default function Create() {
  const [productImage, setProductImage] = useState('');
  const [imagePreviewUrl, setimagePreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [timeStamp, settimeStamp] = useState(0)
  const [opponent1, setOpponent1] = useState('');
  const [opponent2, setOpponent2] = useState('');
  const [description, setDescription] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();


  const uploadProductImage = async (file: any) => {
    setIsImageUploading(true);
    const image = URL.createObjectURL(file);
    setProductImage(image);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const cid = await res.json();
      console.log(cid);
      setImageUrl(`https://gateway.pinata.cloud/ipfs/${cid.hash}`);
      setIsImageUploading(false);
    } catch (error) {
      console.log(error);
      setIsImageUploading(false);
    }
  };

  const { data } = useReadContract({
    abi: factoryABI,
    address: PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS,
    functionName: "registeredAdmins",
    args: [address],
  })

  async function createCampaign() {
    if (data === true) {
      try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const response = await writeContractAsync({
          abi: factoryABI,
          address: '0x046288B7dB9ac43443e692b62F75345670F7ba4c',
          functionName: 'createCampaign',
          args: [
            imageUrl,
            opponent1,
            opponent2,
            description,
            parseUnits(betAmount.toString(), 18),
            currentTimestamp,
          ],
        })
        console.log(response);
      } catch (error) {
        console.log("error", error)
      }
    } else {
      // show a toast message
    }
  }
  return (
    <section className="flex container mx-auto px-4 items-center h-screen">
      <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
        <div className="max-w-md mx-auto lg:mx-0">
          <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
            Create Campaign
          </h3>
          <p className="text-lg text-gray-500 mb-10">
            See our software in action with the demo version
          </p>
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Enter Opponent 1
              </Label>
              <Input
                onChange={(e) => setOpponent1(e.target.value)}
                id="name" placeholder="Name of your opponent 1" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Enter Opponent 2
              </Label>
              <Input
                onChange={(e) => setOpponent2(e.target.value)}
                id="name" placeholder="Name of your opponent 2" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Enter Bet Amount
              </Label>
              <Input
                onChange={(e) => setBetAmount(Number(e.target.value))}
                id="name" placeholder="Amount of your bet" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description" className="mb-1">
                Description
              </Label>
              <Textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of your campaign"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description" className="mb-1">
                Expiration Time
              </Label>
              <input type="datetime-local"
                onChange={(e) => {
                  const unix = Math.floor(new Date(e.target.value).getTime() / 1000);
                  settimeStamp(unix)
                }}
              />
            </div>
            <Upload
              id="image"
              name="image"
              type="file"
              label="Upload Product"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setimagePreviewUrl(URL.createObjectURL(e.target.files[0]))
                  uploadProductImage(e.target.files[0]);
                }
              }}
            />
            {/* <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="uploadFile1"
                className="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <Input type="file" id="uploadFile1" className="hidden" />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </Label>
            </div> */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                createCampaign();
              }}
              size={"lg"}>Submit</Button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-4">
        <div className="relative max-w-md lg:max-w-2xl mx-auto lg:mr-0">
          <Image
            loader={({ src }) => src}
            height={50}
            width={50}
            className="h-full w-full"
            src={imagePreviewUrl ? imagePreviewUrl : "https://shuffle.dev/saturn-assets/images/sign-up/image-funny.png"}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
