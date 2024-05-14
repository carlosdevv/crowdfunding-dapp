import { useAppContext } from "@/context/app-context";
import { ContractCampaign } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<ContractCampaign[]>([]);

  const { contract, getCampaigns, address } = useAppContext();

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }, [getCampaigns]);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, fetchCampaigns, address]);

  return { campaigns, isLoading };
};
