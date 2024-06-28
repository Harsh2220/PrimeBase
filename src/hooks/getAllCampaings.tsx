import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from '@/constant/contracts'
import { factoryABI } from '@/contracts/prime-base/factoryABI'
import React from 'react'
import { useReadContract } from 'wagmi'

function useGetAllCampaigns() {
  const { data, error, status, isLoading } = useReadContract({
    abi: factoryABI,
    address: PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS,
    functionName: "getAllCampaigns",

  })
    console.log("e",error)

  return {
    data,
    error,
    isLoading
  }

}

export default useGetAllCampaigns
