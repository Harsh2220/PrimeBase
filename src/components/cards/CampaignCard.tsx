import useCampaign from "@/hooks/getCampaign";
import { Button } from "../ui/button";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { primeBaseABI } from "@/contracts/prime-base/primebaseABI";
import { parseUnits } from "viem";
import Image from 'next/image';

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

  const { data: betAdmin, error: adminError } = useReadContract({
    address: address as `0x${string}`,
    abi: primeBaseABI,
    functionName: 'admin'
  });

  const placeBet = async (betContract: string, value: number, opnion: number) => {
    const response = await writeContractAsync({
      abi: primeBaseABI,
      address: betContract as `0x${string}`,
      functionName: 'placeBet',
      args: [opnion],
      value: parseUnits(value.toString(), 18),
    });
    return response;
  };

  const handlePlaceBet = async (op: number) => {
    try {
      const res = await placeBet(address, parseFloat(data?.betAmount), op);
      console.log(res, "res");
    } catch (e) {
      console.log(e, "e");
    }
  };

  if (isLoading || error) return null;

  const declareWinner = async (winner: number) => {
    const response = await writeContractAsync({
      abi: primeBaseABI,
      address: address as `0x${string}`,
      functionName: 'declareWinner',
      args: [winner],
    });
    return response;
  }

  const handleDeclareWinner = async (winner: number) => {
    try {
      const res = await declareWinner(winner);
      console.log(res, "res");
    } catch (e) {
      console.log(e, "e");
    }
  }

  return (
    <div className="rounded-lg border border-border p-4 w-1/3">
      <div className="flex gap-4">
        <div className="h-20 w-20 relative">
          <Image
            loader={({ src }) => src}
            height={80}
            width={80}
            src={data.image} alt="" className="rounded-lg" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{data.desc}</p>
          {betAdmin === userAddress && (
            <div className="flex gap-2 mt-2">
              <Image
                src="/farcaster.png"
                alt="Declare Winner"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={() => {
                  window.open(`https://warpcast.com/~/compose?embeds[]=https://primebet-frames.vercel.app/frames?address=${address}`, '_blank')
                }}
              />
              <Image
                src="/trophy.png"
                alt="Close Bet"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={() => {
                  handleDeclareWinner(1)
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <Button
          className="bg-blue-100 w-full text-blue-600"
          onClick={(e) => {
            e.preventDefault();
            handlePlaceBet(1);
          }}
        >
          {data?.opp1} {data.betAmount}
        </Button>
        <Button
          className="bg-red-100 text-red-600 w-full"
          onClick={(e) => {
            e.preventDefault();
            handlePlaceBet(2);
          }}
        >
          {data?.opp2} {data.betAmount}
        </Button>
      </div>
    </div>
  );
}
