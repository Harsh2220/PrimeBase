
import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from '@/constant/contracts'
import { factoryABI } from '@/contracts/prime-base/factoryABI'
import React from 'react'
import { useReadContract } from 'wagmi'
import {parseUnits}from "viem"
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
export const parseArrayToCampaignData = (arr: (string | number | boolean)[]): CampaignData => {
  return {
    image: arr[0] as string,
    opp1: arr[1] as string,
    opp2: arr[2] as string,
    desc: arr[3] as string,
    //parse remain
    betAmount: arr[4] as string,
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

  return {
    data,
    error,
    isLoading
  }

}

export default useCampaign
