import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import { primeBaseABI } from "@/contracts/prime-base/primebaseABI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";

type DeclareWinnerProp = {
  address: string;
  Opponent1: string;
  Opponent2: string;
};

export default function DeclareWinner({
  address,
  Opponent1,
  Opponent2,
}: DeclareWinnerProp) {
  const { writeContractAsync } = useWriteContract();
  const [selectedWinner, setSelectedWinner] = useState<null | number>(null);
  const { toast } = useToast();

  const declareWinner = async (winner: number) => {
    const response = await writeContractAsync({
      abi: primeBaseABI,
      address: address as `0x${string}`,
      functionName: "declareWinner",
      args: [winner],
    });
    return response;
  };

  const handleDeclareWinner = async (winner: number) => {
    try {
      const res = await declareWinner(winner);
      toast({
        title: "Winner declared successfully",
      });
    } catch (e) {
      toast({
        title: "Something went wrong!!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-3 mt-2" onClick={(e) => {}}>
          Declare winner
          <Image
            src="/trophy.png"
            alt="Close Bet"
            width={24}
            height={24}
            className="rounded-full"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will declare winner and release
            funds of all participates who won.
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(value: string) => {
            setSelectedWinner(parseInt(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select winner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{Opponent1}</SelectItem>
            <SelectItem value="2">{Opponent2}</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={async () => {
                if (selectedWinner === null) return;
                await handleDeclareWinner(selectedWinner);
              }}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
