import { Icons } from "@/components/icons";

export const navlinks = [
  {
    name: "dashboard",
    icon: <Icons.dashboard className="h-4 w-4" />,
    link: "/",
  },
  {
    name: "campaign",
    icon: <Icons.createCampaign className="h-4 w-4" />,
    link: "/create-campaign",
  },
  {
    name: "payment",
    icon: <Icons.payment className="h-4 w-4" />,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    icon: <Icons.payment className="h-4 w-4" />,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    icon: <Icons.profile className="h-4 w-4" />,
    link: "/profile",
  },
  {
    name: "logout",
    icon: <Icons.logout className="h-4 w-4" />,
    link: "/",
    disabled: true,
  },
];
