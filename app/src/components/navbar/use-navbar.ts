import { useAppContext } from "@/context/app-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useNavbar = () => {
  const router = useRouter();

  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useAppContext();

  return {
    router,
    isActive,
    setIsActive,
    toggleDrawer,
    setToggleDrawer,
    connect,
    address,
  };
};
