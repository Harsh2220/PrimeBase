import CampaignCard from "@/components/cards/CampaignCard";
import useGetAllCampaigns from "@/hooks/getAllCampaings";

export default function Events() {
  const { data, isLoading, error } = useGetAllCampaigns();

  if (data && data.length > 0) {
    return (
      <section className="container mx-auto flex items-center gap-4">
        {data.map((address: string) => {
          return <CampaignCard address={address} key={address} />;
        })}
      </section>
    );
  }
}
