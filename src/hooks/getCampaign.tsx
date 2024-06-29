
import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from '@/constant/contracts'
import { factoryABI } from '@/contracts/prime-base/factoryABI'
import React from 'react'
import { useReadContract } from 'wagmi'
import { parseUnits, formatEther } from "viem"
import { log } from 'console'
interface CampaignData {
  image: string;
  opp1: string;
  opp2: string;
  desc: string;
  betAmount: string;
  endTime: number;
  winner: number;
  isClosed: boolean;
}
export const parseArrayToCampaignData = (arr: (string | number | boolean | bigint)[]): CampaignData | undefined => {
  if (!arr) return
  return {
    image: arr[0] as string,
    opp1: arr[1] as string,
    opp2: arr[2] as string,
    desc: arr[3] as string,
    betAmount: formatEther(arr[4] as bigint) as string,
    endTime: arr[5] as number,
    winner: arr[6] as number,
    isClosed: arr[7] as boolean,
  };
};

function useCampaign(contractAddress: string) {
  const { data, error, status, isLoading, } = useReadContract({
    abi: factoryABI,
    address: PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS,
    functionName: "getCampaignDetails",
    args: [contractAddress],
  })
  console.log("raw data",data)
  const typedData = parseArrayToCampaignData(data as any) as CampaignData;
  return {
    data: typedData ?? [],
    error,
    isLoading
  }

}

export default useCampaign
