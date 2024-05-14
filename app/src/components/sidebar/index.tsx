"use client";
import { Icons } from "@/components/icons";
import { navlinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "./use-sidebar";

const Sidebar = () => {
  const { setIsActive, router, isActive } = useSidebar();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/">
        <Icons.logo className="w-[36px] h-[36px] text-[#1dc071]" />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((value) => (
            <div
              key={value.name}
              onClick={() => {
                if (!value.disabled) {
                  setIsActive(value.name);
                  router.push(value.link);
                }
              }}
              className={cn(
                isActive === value.name
                  ? "bg-[#2c2f32] text-[#4acd8d]"
                  : "text-white",
                !value.disabled
                  ? "cursor-pointer"
                  : "text-slate-500 cursor-not-allowed",
                "w-12 h-12 rounded-lg flex justify-center items-center [&>svg]:w-1/2 [&>svg]:h-1/2"
              )}
            >
              {value.icon}
            </div>
          ))}
        </div>

        <Icons.sun className="bg-[#1c1c24] shadow-secondary" />
      </div>
    </div>
  );
};

export default Sidebar;
