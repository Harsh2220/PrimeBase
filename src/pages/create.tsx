import { DatePicker } from "@/components/DatePicker";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/ui/upload";
import { useToast } from "@/components/ui/use-toast";
import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from "@/constant/contracts";
import { factoryABI } from "@/contracts/prime-base/factoryABI";
import { useState } from "react";
import { parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [imagePreviewUrl, setimagePreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [timeStamp, settimeStamp] = useState(0);
  const [opponent1, setOpponent1] = useState("");
  const [opponent2, setOpponent2] = useState("");
  const [description, setDescription] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const chainID = useChainId();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();

  const uploadProductImage = async (file: any) => {
    setIsImageUploading(true);
    const image = URL.createObjectURL(file);
    setProductImage(image);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/files", {
        method: "POST",
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
  });

  async function createCampaign() {
    try {
      setIsLoading(true);
      if (chainID !== 999999999) {
        switchChain({ chainId: 999999999 });
      }

      if (data === true) {
        try {
          const currentTimestamp = Math.floor(Date.now() / 1000);
          const response = await writeContractAsync({
            abi: factoryABI,
            address: "0x046288B7dB9ac43443e692b62F75345670F7ba4c",
            functionName: "createCampaign",
            args: [
              imageUrl,
              opponent1,
              opponent2,
              description,
              parseUnits(betAmount.toString(), 18),
              currentTimestamp,
            ],
          });
          toast({
            title: "Campaign created successfully",
          });
        } catch (error) {
          toast({
            title: "Something went wrong!!",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Something went wrong!!",
          variant: "destructive",
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-md">
        <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-2">
          Create Campaign
        </h3>
        <p className="text text-gray-500 mb-10">
          Create campaign and earn money.
        </p>
        <form action="" className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-1">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Opponent 1
              </Label>
              <Input
                onChange={(e) => setOpponent1(e.target.value)}
                id="name"
                placeholder="Name of opponent 1"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Opponent 2
              </Label>
              <Input
                onChange={(e) => setOpponent2(e.target.value)}
                id="name"
                placeholder="Name of opponent 2"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount" className="mb-1">
              Enter Bet Amount
            </Label>
            <Input
              onChange={(e) => setBetAmount(Number(e.target.value))}
              id="amount"
              type="number"
              placeholder="Amount of your bet"
            />
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
          <DatePicker
            onClick={(date) => {
              settimeStamp(new Date(date).getTime() / 1000);
            }}
          />
          <Upload
            id="image"
            name="image"
            type="file"
            label="Upload Product"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setimagePreviewUrl(URL.createObjectURL(e.target.files[0]));
                uploadProductImage(e.target.files[0]);
              }
            }}
          />
          <Button
            disabled={!address || isLoading}
            onClick={(e) => {
              e.preventDefault();
              createCampaign();
            }}
            size={"lg"}
          >
            {isLoading ? <Spinner /> : "Create"}
          </Button>
        </form>
      </div>
    </section>
  );
}
