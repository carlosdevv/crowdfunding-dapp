import { useAppContext } from "@/context/app-context";
import { ContractCampaign } from "@/lib/types";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import FundCard from "../fund-card";
import { Icons } from "../icons";

type DisplayCampaignsProps = {
  title: string;
  isLoading: boolean;
  campaigns: ContractCampaign[];
};

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps) => {
  const router = useRouter();
  const { handleSetCampaignDetails } = useAppContext();

  const handleNavigate = (campaign: ContractCampaign, id: number) => {
    router.push(`/campaign-details/${id}`);
    handleSetCampaignDetails(campaign);
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Icons.loader className="w-[48px] h-[48px] text-white object-contain animate-spin" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, i) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign, i)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
