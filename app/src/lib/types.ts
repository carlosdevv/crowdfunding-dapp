export type ContractCampaign = {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: BigInt;
  amountCollected: number;
  image: string;
  donators: string[];
  donations: number[];
};

export type CreateCampaignProps = {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}