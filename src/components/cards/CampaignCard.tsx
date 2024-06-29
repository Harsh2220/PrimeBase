import useCampaign from "@/hooks/getCampaign";
import { Button } from "../ui/button";

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

  console.log("data", data)
  if (isLoading || error) return;

  return (
    <div className="rounded-lg border border-border p-4 w-1/3">
      <div className="flex gap-4">
        <img src={data.image} alt="" className="h-20 rounded-lg" />
        <p className="font-medium">{data.desc}</p>
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <Button className="bg-blue-100 w-full text-blue-600">
          {data?.opp1}{" "} {data.betAmount}
        </Button>
        <Button className="bg-red-100 text-red-600 w-full">
          {data?.opp2} {" "} {data.betAmount}

        </Button>
      </div>
    </div>
  );
}
