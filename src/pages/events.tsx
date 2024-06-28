import CampaignCard from "@/components/cards/CampaignCard";
import useGetAllCampaigns from "@/hooks/getAllCampaings";
import { log } from "console";
import React from "react";

export default function Events() {

  const { data, isLoading, error } = useGetAllCampaigns();

  if (data && data.length > 0) {
    return (
      <section className="container mx-auto flex items-center justify-between gap-2 flex-wrap">
        {
          data.map((address: string) => {
            return <CampaignCard address={address} key={address} />
          })
        }
      </section>
    );
  }
}
