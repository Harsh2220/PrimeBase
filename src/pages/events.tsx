import CampaignCard from "@/components/cards/CampaignCard";
import React from "react";

export default function Events() {
  return (
    <section className="container mx-auto flex items-center justify-between gap-2 flex-wrap">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </section>
  );
}
