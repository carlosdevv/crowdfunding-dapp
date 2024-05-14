import { useAppContext } from "@/context/app-context";
import { daysLeft } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type UseCampaignDetails = {
  id: number;
};

type Donators = {
  donator: string;
  donation: string;
};

export const useCampaignDetails = ({ id }: UseCampaignDetails) => {
  const router = useRouter();
  const {
    donate,
    getDonations,
    contract,
    address,
    isLoadingTransaction: isLoading,
    campaignDetails,
  } = useAppContext();

  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<Donators[]>([]);

  const remainingDays = daysLeft(Number(campaignDetails?.deadline.toString()));

  const fetchDonators = useCallback(async () => {
    const data = await getDonations(id);

    setDonators(data);
  }, [getDonations, id]);

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address, fetchDonators]);

  const handleDonate = async () => {
    await donate(id, Number(amount));

    router.push("/");
  };

  return {
    handleDonate,
    campaignDetails,
    remainingDays,
    donators,
    amount,
    isLoading,
    setAmount,
  };
};
