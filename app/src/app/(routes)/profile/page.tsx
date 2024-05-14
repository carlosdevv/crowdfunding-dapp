"use client";
import React from "react";
import { useProfile } from "./use-profile";
import DisplayCampaigns from "@/components/display-campaigns";

const Profile = () => {
  const { isLoading, campaigns } = useProfile();
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
