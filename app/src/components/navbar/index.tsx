"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { navlinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import thirdweb from "@public/thirdweb.svg";
import Image from "next/image";
import Link from "next/link";
import { useNavbar } from "./use-navbar";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";

const Navbar = () => {
  const {
    address,
    router,
    connect,
    setToggleDrawer,
    toggleDrawer,
    isActive,
    setIsActive,
  } = useNavbar();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <Icons.search className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {address && (
          <Button
            type="button"
            className={`${address} ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'`}
            onClick={() => {
              router.push("create-campaign");
            }}
          >
            Create a campaign
          </Button>
        )}
        <ConnectButton client={client} />

        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Icons.logo className="w-[60%] h-[60%] object-contain text-[#1dc071]" />
        </div>

        <Icons.menu
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((value) => (
              <li
                key={value.name}
                className={cn(
                  isActive === value.name && "bg-[#3a3a43]",
                  "flex p-4"
                )}
                onClick={() => {
                  setIsActive(value.name);
                  setToggleDrawer(false);
                  router.push(value.link);
                }}
              >
                {value.icon}
                <p
                  className={cn(
                    isActive === value.name
                      ? "text-[#1dc071]"
                      : "text-[#808191]",
                    "ml-[20px] font-epilogue font-semibold text-[14px]"
                  )}
                >
                  {value.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <Button
              type="button"
              className={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              onClick={() => {
                if (address) router.push("create-campaign");
                else connect();
              }}
            >
              {address ? "Create a campaign" : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
