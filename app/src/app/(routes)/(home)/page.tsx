"use client";
import DisplayCampaigns from "@/components/display-campaigns";
import { useHome } from "./use-home";

const Home = () => {
  const { isLoading, campaigns } = useHome();

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
