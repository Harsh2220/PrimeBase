import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAccount, useContractWrite, useReadContract, useWriteContract } from "wagmi";
import { BASE_SEPOLIA_EAS_REGISTRY_CONTRACT_ADDRESS, PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS } from "../constant/contracts";
import { useSimulateContract } from "wagmi";
import { factoryABI } from "../contracts/prime-base/factoryABI";
import { registerABI } from "@/contracts/onchain-verification/RegisterABI";

export default function Register() {
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  async function registerEAS() {
    try {
      const easRegistry = await writeContractAsync({
        abi: registerABI,
        address: BASE_SEPOLIA_EAS_REGISTRY_CONTRACT_ADDRESS,
        functionName: "register",
        args: [
          "PRIME-BASE",
          address,
          false
        ],
      });

      const response = await writeContractAsync({
        abi: factoryABI,
        address: PRIMEBASE_FACTORY_ZORA_CONTRACT_ADDRESS,
        functionName: 'registerAsAdmin',
        value: BigInt(100000000000000),
        args: [
        ],
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="relative mb-16 py-16 px-8 max-w-xl mx-auto bg-white rounded-b-3xl">
          <svg
            className="absolute top-0 -left-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="1440"
              height="992"
              transform="translate(-424)"
              fill="#F3F4F6"
            ></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 24C24 10.7452 13.2548 0 0 0H24H91H501H568H592C578.745 0 568 10.7452 568 24V162C568 175.255 557.255 186 544 186H48C34.7452 186 24 175.255 24 162V24Z"
              fill="white"
            ></path>
          </svg>
          <svg
            className="absolute top-0 -right-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="1440"
              height="992"
              transform="translate(-992)"
              fill="#F3F4F6"
            ></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-544 24C-544 10.7452 -554.745 0 -568 0H-544H-477H-67H0H24C10.7452 0 0 10.7452 0 24V162C0 175.255 -10.7452 186 -24 186H-520C-533.255 186 -544 175.255 -544 162V24Z"
              fill="white"
            ></path>
          </svg>
          <img
            className="mx-auto"
            src="https://shuffle.dev/zanrly-assets/logos/zanrly-logo-xl.svg"
            alt=""
          />
        </div>
        <div className="md:max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h2 className="font-heading mb-4 text-4xl md:text-5xl text-black font-black tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              tellus vestibulum, commodo pulvinar.
            </p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Enter Name
              </Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="mb-1">
                Enter Email
              </Label>
              <Input id="name" placeholder="Enter your email" />
            </div>
            <Button
              onClick={async (e) => {
                console.log(address)
                e.preventDefault();
                await registerEAS()
              }}
              size={"lg"}>Register</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
