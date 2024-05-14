"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { formSchema } from "@/app/(routes)/create-campaign/use-create-campaign";
import { client } from "@/app/client";
import { ContractCampaign } from "@/lib/types";
import {
  defineChain,
  getContract,
  prepareContractCall,
  readContract,
  resolveMethod,
  toEther,
} from "thirdweb";
import {
  useActiveAccount,
  useConnect,
  useSendTransaction,
} from "thirdweb/react";
import { z } from "zod";

type AppContextProps = {
  address?: string;
  contract: any;
  connect: any;
  createCampaign: (form: z.infer<typeof formSchema>) => void;
  getCampaigns: () => Promise<any>;
  getUserCampaigns: () => any;
  donate: (pId: number, amount: number) => Promise<any>;
  getDonations: (
    pId: number
  ) => Promise<{ donator: string; donation: string }[]>;
  isLoadingTransaction: boolean;
  isErrorTransaction: boolean;
  campaignDetails?: ContractCampaign;
  handleSetCampaignDetails: (campaign: ContractCampaign) => void;
};

const AppContext = createContext({} as AppContextProps);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0xEB05CD5f1C7b6840861dd3b82E5A2C24d3e3F691",
  });

  const address = useActiveAccount()?.address;
  const connect = useConnect();

  const [campaignDetails, setCampaignDetails] = useState<
    ContractCampaign | undefined
  >();

  const {
    mutateAsync: sendTransaction,
    isPending: isLoadingTransaction,
    isError: isErrorTransaction,
  } = useSendTransaction();

  const publishCampaign = async (form: z.infer<typeof formSchema>) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: resolveMethod("createCampaign"),
        params: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      await sendTransaction(transaction);

      console.log("contract call success", transaction);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = useCallback(async () => {
    const data = await readContract({
      contract,
      method: resolveMethod("getCampaigns"),
      params: [],
    });

    const parsedCampaigns = data.map((campaign: any, index: number) => {
      return {
        pId: index,
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: toEther(campaign.target),
        deadline: campaign.deadline,
        amountCollected: toEther(campaign.amountCollected),
        image: campaign.image,
      };
    });

    return parsedCampaigns;
  }, [contract]);

  const getUserCampaigns = useCallback(async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  }, [address, getCampaigns]);

  const donate = useCallback(
    async (pId: number, amount: number) => {
      const removeZeroOfEth = 1000000000000000000n;
      console.log(pId);
      const transaction = prepareContractCall({
        contract,
        method: resolveMethod("donateToCampaign"),
        params: [pId],
        value: BigInt(toEther(BigInt(amount) * removeZeroOfEth)),
      });

      sendTransaction(transaction);

      return transaction;
    },
    [contract, sendTransaction]
  );

  const getDonations = async (pId: number) => {
    const data = await readContract({
      contract,
      method: resolveMethod("getDonators"),
      params: [pId],
    });

    const donations = data as [string[], BigInt[]];
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: toEther(BigInt(donations[1][i].toString())),
      });
    }

    return parsedDonations;
  };

  const handleSetCampaignDetails = useCallback(
    (campaign: ContractCampaign) => setCampaignDetails(campaign),
    []
  );

  return (
    <AppContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        donate,
        isLoadingTransaction,
        isErrorTransaction,
        getUserCampaigns,
        campaignDetails,
        handleSetCampaignDetails,
        getDonations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
