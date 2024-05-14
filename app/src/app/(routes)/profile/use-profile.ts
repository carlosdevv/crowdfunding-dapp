import { useAppContext } from "@/context/app-context";
import React, { useCallback, useEffect, useState } from "react";

export const useProfile = () => {
  const [campaigns, setCampaigns] = useState([]);

  const {
    address,
    contract,
    isLoadingTransaction: isLoading,
    getUserCampaigns,
  } = useAppContext();

  const fetchCampaigns = useCallback(async () => {
    const data = await getUserCampaigns();
    setCampaigns(data);
  }, [getUserCampaigns]);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, fetchCampaigns, address]);
  return { isLoading, campaigns };
};
