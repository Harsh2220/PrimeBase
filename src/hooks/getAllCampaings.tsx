import { PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from '@/constant/contracts'
import { factoryABI } from '@/contracts/prime-base/factoryABI'
import React from 'react'
import { useReadContract } from 'wagmi'
import { ReadContractErrorType } from 'wagmi/actions'
function useGetAllCampaigns() {

  const { data, error, status, isLoading } = useReadContract({
    abi: factoryABI,
    address: PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS,
    functionName: "getAllCampaigns",

  })
  const typedData = data as string[] | undefined;
  return {
    data: typedData,
    error,
    isLoading
  }

}

export default useGetAllCampaigns
