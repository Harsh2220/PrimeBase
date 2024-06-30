import useCampaign from "@/hooks/getCampaign";
import { Button } from "../ui/button";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { primeBaseABI } from "@/contracts/prime-base/primebaseABI";
import { parseUnits } from "viem";
import Image from "next/image";
import DeclareWinner from "../modals/DeclareWinner";
import { useToast } from "../ui/use-toast";

type CampaignCardProp = {
  address: string;
};
type CampaignData = {
  image: string;
  opp1: string;
  opp2: string;
  desc: string;
  betAmount: string;
  endTime: number;
  winner: number;
  isClosed: boolean;
};

export default function CampaignCard({ address }: CampaignCardProp) {
  const { error, data, isLoading } = useCampaign(address);
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();

  const { data: betAdmin, error: adminError } = useReadContract({
    address: address as `0x${string}`,
    abi: primeBaseABI,
    functionName: "admin",
  });

  const placeBet = async (
    betContract: string,
    value: number,
    opnion: number
  ) => {
    const response = await writeContractAsync({
      abi: primeBaseABI,
      address: betContract as `0x${string}`,
      functionName: "placeBet",
      args: [opnion],
      value: parseUnits(value.toString(), 18),
    });
    return response;
  };

  const handlePlaceBet = async (op: number) => {
    try {
      const res = await placeBet(address, parseFloat(data?.betAmount), op);
      toast({
        title: "Bet placed successfully",
      });
    } catch (e) {
      toast({
        title: "Something went wrong!!",
        variant: "destructive",
      });
    }
  };

  if (isLoading || error) return null;

  return (
    <div className="rounded-lg border border-border p-4 w-96">
      <div className="flex gap-4">
        <Image
          loader={({ src }) => src}
          height={80}
          width={80}
          src={data.image}
          alt=""
          className="rounded-lg"
          objectFit="cover"
        />
        <div className="flex-1">
          <p className="font-medium">{data.desc}</p>
        </div>
      </div>
      {betAdmin !== userAddress && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <Button
            className="bg-blue-100 w-1/2 text-blue-600"
            onClick={(e) => {
              e.preventDefault();
              handlePlaceBet(1);
            }}
          >
            {data?.opp1} {data.betAmount}
          </Button>
          <Button
            className="bg-red-100 text-red-600 w-1/2"
            onClick={(e) => {
              e.preventDefault();
              handlePlaceBet(2);
            }}
          >
            {data?.opp2} {data.betAmount}
          </Button>
        </div>
      )}
      <Button
        variant={"outline"}
        className="w-full gap-3 mt-3"
        onClick={() => {
          window.open(
            `https://warpcast.com/~/compose?embeds[]=https://primebet-frames.vercel.app/frames?address=${address}`,
            "_blank"
          );
        }}
      >
        Share
        <Image
          src="/farcaster.png"
          alt="Declare Winner"
          width={24}
          height={24}
          className="rounded-full"
        />
      </Button>
      {betAdmin === userAddress && (
        <DeclareWinner
          Opponent1={data.opp1}
          Opponent2={data.opp2}
          address={address}
        />
      )}
    </div>
  );
}
