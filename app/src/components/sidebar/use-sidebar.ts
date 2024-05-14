import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");

  return { router, isActive, setIsActive };
};
