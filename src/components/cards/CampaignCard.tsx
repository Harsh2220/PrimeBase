import useCampaign, { parseArrayToCampaignData } from "@/hooks/getCampaign";
import { log } from "console";
import Image from "next/image";
import React from "react";
import JSXStyle from "styled-jsx/style";

type CampaignCardProp = {

  address: string;

}

type CampaignData = {
  image: string;
  opp1: string;
  opp2: string;
  desc: string;
  betAmount: string;
  endTime: number;
  winner: number;
  isClosed: boolean;
}
export default function CampaignCard({ address }: CampaignCardProp) {


  const { error, data, isLoading } = useCampaign(address);

  if (data) {
    return (
      <div className="flex flex-col bg-white border shadow-sm rounded-xl w-96">
        <img
          height={50}
          width={50}
          className="w-48 h-48 rounded-t-xl"
          src={data?.image}
          alt="Image Description"
        />
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {data?.desc}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-neutral-400">
            Bet for {data?.betAmount}
          </p>
          <div className="flex items-center gap-2">
            <a
              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              Yes
            </a>{" "}
            <a
              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              No
            </a>
          </div>
        </div>
      </div>
    );
  }
}
