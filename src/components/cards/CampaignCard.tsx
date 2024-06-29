import useCampaign from "@/hooks/getCampaign";
import { Button } from "../ui/button";
import usePlaceBet from "@/hooks/usePlaceBet";
import { log } from "console";
import { useWriteContract } from "wagmi";
import { primeBaseABI } from "@/contracts/prime-base/primebaseABI";
import { parseUnits } from "viem";

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

  const { writeContractAsync } = useWriteContract();

  const placeBet = async (betContract: string, value: number, opnion: number) => {
    const response = await writeContractAsync({
      abi: primeBaseABI,
      address: betContract as `0x${string}`,
      functionName: 'placeBet',
      args: [opnion],
      value: parseUnits(value.toString(), 18),
    })
    return response
  }
  const handlePlaceBet = async (op: number) => {
    try {
      const res = await placeBet(address, parseFloat(data?.betAmount), op)
        console.log(res,"res");
          
    } catch (e) {
      console.log(e, "e")
    }
  }

  if (isLoading || error) return;

  return (
    <div className="rounded-lg border border-border p-4 w-1/3">
      <div className="flex gap-4">
        <img src={data.image} alt="" className="h-20 rounded-lg" />
        <p className="font-medium">{data.desc}</p>
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <Button className="bg-blue-100 w-full text-blue-600"
          onClick={(e) => {
            e.preventDefault();
            handlePlaceBet(1)
          }}
        >
          {data?.opp1}{" "} {data.betAmount}
        </Button>
        <Button className="bg-red-100 text-red-600 w-full"

          onClick={(e) => {
            e.preventDefault();
            handlePlaceBet(2)
          }}
        >
          {data?.opp2} {" "} {data.betAmount}

        </Button>
      </div>
    </div>
  );
}
